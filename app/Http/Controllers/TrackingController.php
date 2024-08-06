<?php /** @noinspection MissingReturnTypeInspection */

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Folder;
use Illuminate\Http\JsonResponse;

class TrackingController extends Controller
{

    /**
     * @param Link $link
     *
     * @return JsonResponse
     */
    public function storeLinkVisit(Link $link): JsonResponse {

        $link->linkVisits()->create([
            'page_id' => $link->page_id
        ]);

        return response()->json(['success' => true]);
    }

    /**
     * @param Folder $folder
     *
     * @return JsonResponse
     */
    public function storeFolderClick(Folder $folder): JsonResponse {

        $folder->folderClicks()->create([
            'page_id' => $folder->page_id
        ]);

        return response()->json(['message' => "Success!"]);
    }

}
