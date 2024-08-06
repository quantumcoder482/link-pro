<?php


namespace App\Http\Traits;

use App\Models\Link;
use App\Models\ShopifyStore;

trait LinkTrait {

    public function getFolderLinks($page) {

        $folderArray = [];
        $folders     = $page->folders()->orderBy( 'position', 'asc' )->get();

        if (!empty($folders)) {
            foreach ( $folders as $folder ) {
                $mylinks = [];
                if($folder->link_ids && !empty($folder->link_ids)) {
                    $mylinks = json_decode( $folder->link_ids );
                }

                $linksArray = [];

                if ( ! empty( $mylinks ) ) {

                    $linksArray = Link::whereIn( 'id', $mylinks )->orderBy( 'position', 'asc' )->get()->toArray();
                }

                $linkObject = [
                    'id'            => $folder["uuid"],
                    'name'          => $folder["folder_name"],
                    'type'          => 'folder',
                    'position'      => $folder["position"],
                    'links'         => $linksArray,
                    'active_status' => $folder["active_status"]
                ];

                array_push( $folderArray, $linkObject );
            }
        }

        return $folderArray;
    }

    public function getAllLinks($page) {

        $allLinks = $page->links()->where('page_id', $page["id"])->where('folder_id', null)
             ->orderBy('position', 'asc')
             ->get()->toArray();

        $newLinksArray = [];
        foreach($allLinks as $link) {
            if($link["shopify_products"]) {
                $productArray = [];
                $store_id = $link["shopify_products"][0]["shopify_id"];
                $allProducts = ShopifyStore::where('id', $store_id)->pluck("products");

                foreach($link["shopify_products"] as $product) {

                    foreach($allProducts[0] as $storeProduct) {

                        if($storeProduct["id"] == $product["id"]) {
                            $newArray = array_merge($storeProduct, array('position' => $product["position"]) );
                            array_push($productArray, $newArray);
                        }
                    }
                }

                $link["shopify_products"] = $productArray;
            }

            array_push($newLinksArray, $link);
        }

        return $newLinksArray;

    }
}
