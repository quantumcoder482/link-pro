<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\ShopifyResource;
use App\Models\ShopifyStore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Inertia\Response as InertiaResponse;
use Laravel\Socialite\Facades\Socialite;
use Signifly\Shopify\Shopify;
use SocialiteProviders\Manager\Config;
use App\Http\Traits\ShopifyTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class ShopifyController extends BaseController
{
    use ShopifyTrait;

     /**
    * Display a listing of the resource.
    *
    * @return Response
    */
    public function index(): Response
    {
        $products = ShopifyStore::all();
        return $this->sendResponse($products, 'Stores retrieved successfully.');
    }

/**
    * Store a newly created resource in storage.
    *
    * @param  Request  $request
    * @return Response
    */
    
    public function store(Request $request): JsonResponse | InertiaResponse
    {
 
        $storeDomain = str_replace('.myshopify.com', '', $request->get('storeDomain'));
        /* if(!Auth::user()) {
            return Inertia::render('Auth/Login', [
                'canResetPassword' => Route::has('password.request'),
                'status' => session('status'),
            ])->with(['course' => null, 'storeDomain' => $storeDomain]);
        } */

        $clientId = config('services.shopify.client_id');
        $clientSecret = config('services.shopify.client_secret');
        $scopes = config('services.shopify.scopes');
        $additionalProviderConfig = ['subdomain' => $storeDomain];
        $config = new Config($clientId, $clientSecret, "/api/auth/shopify/callback", $additionalProviderConfig);

        return Socialite::driver('shopify')->setConfig($config)->setScopes([$scopes])->redirect();

       /*  $validator = Validator::make($input, [

        ]);
        //https://auth.linktr.ee/login?state=hKFo2SBwLVRRZ3FDT1l4Mi1WWnNPd3lGWFlpeHRFV1dRdGlYVaFupWxvZ2luo3RpZNkgYVhDY3A3ODAtMmZBUFVNNUNPTzNrV3Fvbi1tMnZzcTmjY2lk2SBYYTl5SUJRSWh0ZTA2SVp4c1VQbFo1OE5xUGNETnk0Zg&client=Xa9yIBQIhte06IZxsUPlZ58NqPcDNy4f&protocol=oauth2&auth0Client=eyJuYW1lIjoiSFdJT0F1dGhCdW5kbGUiLCJ2ZXJzaW9uIjoidW5rbm93biIsImVudmlyb25tZW50Ijp7Im5hbWUiOiJQSFAiLCJ2ZXJzaW9uIjoiOC4xLjI2In19&response_type=code&scope=openid%20profile%20email%20username%20offline_access%20read%3Aauthenticators%20&redirect_uri=https%3A%2F%2Flinktr.ee%2Fconnect%2Fservice%2Fauth0&audience=https%3A%2F%2Flinktr.ee%2Fapi
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        } */

        /* $store = ShopifyStore::create([
            'user_id'       => $user->id,
            'access_token'  => '',
            'domain'        => $storeDomain
        ]); */

        /* return $this->sendResponse($storeDomain, 'Store added successfully.'); */
    }

    public function apiCallback() {

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

            //return redirect()->route('pages.edit', ['page' => $pageId, 'redirected' => "shopify", 'store' => $shopifyStore->id]);

        } catch (\Throwable $th) {

            Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                                Carbon::now() .
                                                "-- kind --"
                                                . "Shopify Connection" .
                                                "-- Error Message -- " .
                                                $th->getMessage()
            );

        }

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
            $user = Auth::user();

            $returnData = [
                'storeDomain'   => $domain,
                'lpUserName'    => $user->username,
                'lpEmail'       => $user->email,
                'connected'     => true
            ];

            try {

                $response = Http::post('https://linkpro.gadget.app/api/routes/connect', $returnData);
                Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                Carbon::now(). 
                "Shopify Response to webhook post" .
                print_r($response));

            } catch(\Throwable $th){
                Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                Carbon::now() .
                "-- kind --"
                . "Shopify Connection" .
                "-- Error Message -- " .
                $th->getMessage());
            }
    }
}
