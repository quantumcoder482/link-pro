<?php

namespace App\Http\Controllers;

use App\Models\ShopifyStore;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Socialite\Facades\Socialite;
use Signifly\Shopify\Shopify;
use SocialiteProviders\Manager\Config;
use App\Http\Traits\ShopifyTrait;

class ShopifyController extends Controller
{

    use ShopifyTrait;

    public function auth(Request $request) {

        $domain = $request->query('domain');
        $clientId = config('services.shopify.client_id');
        $clientSecret = config('services.shopify.client_secret');
        $scopes = config('services.shopify.scopes');
        $additionalProviderConfig = ['subdomain' => $domain];
        $config = new Config($clientId, $clientSecret, "/auth/shopify/callback", $additionalProviderConfig);

        return Socialite::driver('shopify')->setConfig($config)->setScopes([$scopes])->redirect();
    }


    /**
     * @return RedirectResponse
     *
     * @var ShopifyStore $shopifyStore
     */
    public function callback() {

        try {
            $shopifyUser = Socialite::driver('shopify')->user();
            $accessToken = $shopifyUser->accessTokenResponseBody["access_token"];
            $domain = $shopifyUser->getNickname();

            $shopify = new Shopify(
                $accessToken,
                $domain,
                config('services.shopify.api_version')
            );

            $products = $shopify->getProducts()->toArray();

            $productsArray = [];
            foreach($products as $product) {
                $productObject = [
                    "id"            => $product["id"],
                    "product_url"   => 'https://' . $domain . '/products/' . $product["handle"],
                    "title"         => $product["title"],
                    "price"         => $product["variants"][0]["price"],
                    "image_url"     => $product["image"] ? $product["image"]["src"] : null
                ];

                array_push($productsArray, $productObject);
            }

            $dataObject = [
                'access_token' => $accessToken,
                'domain' => $domain,
                'products' => $productsArray
            ];
            $shopifyStore = $this->createShopifyStore($dataObject);

            $pageId = "";
            if(isset($_COOKIE['lp_page_id'])) {
                $pageId = $_COOKIE['lp_page_id'];
            }

            return redirect()->route('pages.edit', ['page' => $pageId, 'redirected' => "shopify", 'store' => $shopifyStore->id]);

        } catch (\Throwable $th) {

            Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                                Carbon::now() .
                                                "-- kind --"
                                                . "Shopify Connection" .
                                                "-- Error Message -- " .
                                                $th->getMessage()
            );
            $pageId = "";
            if(isset($_COOKIE['lp_page_id'])) {
                $pageId = $_COOKIE['lp_page_id'];
            }

            return redirect()->route('pages.edit', ['page' => $pageId, 'redirected' => "shopify", "connection_error" => 'Something went wrong connecting to Shopify! Please try again.']);
        }
    }

    public function getAllProducts($id) {

        $store = ShopifyStore::findOrFail($id);
        return response()->json([
            'products' => $store->products
        ]);
    }

    public function getStores() {
        $user = Auth::user();
        $stores = $user->ShopifyStores()->get();
        return response()->json([
            'stores' => $stores
        ]);
    }
}
