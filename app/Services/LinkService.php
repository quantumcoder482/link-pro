<?php


namespace App\Services;

use App\Models\Folder;
use App\Models\Link;
use App\Models\Page;
use App\Http\Traits\LinkTrait;
use App\Http\Traits\IconTrait;
use Illuminate\Support\Facades\Auth;

class LinkService {

    use LinkTrait, IconTrait;

    /**
     * @param $page
     *
     * @return array|mixed
     */
    public function getAllLinks($page): mixed {


        $allLinks = $page->links()->where('folder_id', null)
                     ->orderBy('position', 'asc')
                     ->get()->toArray();

        $folderLinks = $this->getFolderLinks($page);

        if (!empty($folderLinks)) {
            $allLinks = array_merge( $allLinks, $folderLinks );
            usort($allLinks, array($this, "sortArray" ));
        }

        return $allLinks;
    }

    /**
     * @param $request
     *
     * @return array
     */
    public function addLink($request): array {

        $page = Page::findOrFail($request->page_id);

        $iconPath = $request->icon;
        if (str_contains($iconPath, 'tmp/') ) {
            $iconPath = $this->saveCustomIcon( $request );
        }

        if ($request->folder_id) {

            $folderID = $request->folder_id;
            $folder = Folder::findOrFail($folderID);
            $folderLinkIDs = $folder->link_ids;

            if($folderLinkIDs && !empty($folderLinkIDs)) {
                $linksArray = [];
                $linkIDs = json_decode($folderLinkIDs);

                foreach($linkIDs as $linkID) {
                    $linkPosition = Link::where('id', $linkID)->get()->pluck('position')->toArray();

                    array_push($linksArray, $linkPosition);
                }

                $max = max($linksArray);
                $position = $max[0] + 1;

            } else {
                $linkIDs = [];
                $position = 0;
            }

            $link = Auth::user()->links()->create([
                'name'              => $request->name,
                'url'               => $request->url ? : null,
                'email'             => $request->email ? : null,
                'phone'             => $request->phone ? : null,
                'mailchimp_list_id' => null,
                'shopify_products'  => null,
                'shopify_id'        => null,
                'course_id'         => $request->course_id ? : null,
                'icon'              => $iconPath,
                'page_id'           => $request->page_id,
                'position'          => $position,
                'folder_id'         => $request->folder_id,
                'description'       => $request->description ? json_encode($request->description) : null,
                'type'              => $request->type
            ]);

            array_push($linkIDs, $link->id);

            $folder->update(['link_ids' => json_encode($linkIDs)]);

        } else {
            $highestPagePos = $page->links()->where('folder_id', null)->max('position');
            $highestFolderPos = $page->folders->max("position");

            if ($highestPagePos === null && $highestFolderPos === null) {
                $position = 0;
            } else {
                $position = max($highestPagePos, $highestFolderPos) + 1;
            }


            if ($request->shopify_products) {
                $productIDs = [];
                foreach($request->shopify_products as $product) {
                    $productObject = [
                        'id' => $product["id"],
                        'position' => $product["position"],
                        'shopify_id' => $request->shopify_id
                    ];
                    array_push($productIDs, $productObject);
                }
            }

            $link = Auth::user()->links()->create([
                'name'              => $request->name,
                'url'               => $request->url ? : null,
                'email'             => $request->email ? : null,
                'phone'             => $request->phone ? : null,
                'mailchimp_list_id' => $request->mailchimp_list_id ? : null,
                'shopify_products'  => $request->shopify_products ? $productIDs : null,
                'shopify_id'        => $request->shopify_id ? : null,
                'course_id'         => $request->course_id ? : null,
                'icon'              => $iconPath,
                'page_id'           => $request->page_id,
                'position'          => $position,
                'description'       => $request->description ? json_encode($request->description) : null,
                'type'              => $request->type
            ]);
        }

        return [
            "link" => $link,
            "path" => $iconPath
        ];

    }

    /**
     * @param $request
     * @param $link
     *
     * @return string|null
     */
    public function updateLink($request, $link): ?string {

        if (str_contains($request->icon, 'tmp/') ) {
            $iconPath = $this->saveCustomIcon($request);
        } else {
            $iconPath = $request->icon;
        }

        if ($request->shopify_products) {
            $productIDs = [];
            foreach($request->shopify_products as $product) {
                $productObject = [
                    'id' => $product["id"],
                    'position' => $product["position"],
                    'shopify_id' =>  $request->shopify_id
                ];
                array_push($productIDs, $productObject);
            }
        }

        $link->update([
            'name'              => $request->name,
            'url'               => $request->url ? : null,
            'email'             => $request->email ? : null,
            'phone'             => $request->phone ? : null,
            'mailchimp_list_id' => $request->mailchimp_list_id ? : null,
            'shopify_products'  => $request->shopify_products ? $productIDs : null,
            'shopify_id'        => $request->shopify_id ? : null,
            'course_id'         => $request->course_id ? : null,
            'description'       => $request->description ? : null,
            'icon'              => $iconPath,
            'type'              => $request->type,
        ]);

        return $iconPath;
    }

    /**
     * @param $request
     * @param $link
     *
     * @return string
     */
    public function updateLinkStatus($request, $link): string {

        $link->update($request->only(['active_status']));
        if ($request->active_status == true ) {
            $message = "Icon Enabled";
        } else {
            $message = "Icon Disabled";
        }

        return $message;
    }

    /**
     * @param $request
     */
    public function updateLinksPositions($request): void {

        if (array_key_exists("userLinks", $request) && !empty($request['userLinks']) ) {
            foreach ( $request["userLinks"] as $index => $link ) {
                if ( array_key_exists( "type", $link ) && $link["type"] == "folder" ) {
                    $currentFolder = Folder::findOrFail( $link["id"] );
                    if ( $currentFolder["position"] != $index ) {
                        $currentFolder["position"] = $index;
                        $currentFolder->save();
                    }
                } else {
                    $currentLink = Link::findOrFail( $link["id"] );
                    if ( $currentLink["position"] != $index ) {
                        $currentLink["position"] = $index;
                        $currentLink->save();
                    }
                }
            }
        }

        if (array_key_exists( "folderLinks", $request ) && !empty($request['folderLinks'])) {
            foreach ($request['folderLinks'] as $index => $folderLink) {
                $link = Link::findOrFail( $folderLink["id"] );
                if ($link["position"] != $index) {
                    $link["position"] = $index;
                    $link->save();
                }
            }
        }

    }

    /**
     * @param $link
     */
    public function deleteLink($link): void {

        if ($link->icon && $link->url) {
            $newLink = $link->replicate([
                'mailchimp_list_id',
                'shopify_products',
                'shopify_id',
                'type',
                'course_id',
                'description'
            ]);
            $newLink->setTable( 'deleted_links' );
            $newLink->link_id = $link->id;
            $newLink->save();
        }

        if ($link->folder_id) {
            $folder = Folder::findOrFail($link->folder_id);
            $linkIDs = json_decode($folder->link_ids);

            $newArray = array_values(array_filter($linkIDs, fn ($m) => $m != $link->id));

            if(count($newArray) > 0) {
                $folder->update(['link_ids' => json_encode($newArray)]);
            } else {
                $folder->update(['link_ids' => null]);
            }
        }

        $link->delete();
    }

    /**
     * @param $a
     * @param $b
     *
     * @return int
     */
    public function sortArray($a, $b): int {

        return ($a["position"] > $b["position"] ? +1 : -1);
    }
}
