<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use App\Models\Page;
use App\Services\LinkService;
use Illuminate\Http\Request;
use App\Services\FolderService;
use Illuminate\Support\Facades\Auth;

class FolderController extends Controller
{
    public function store(Request $request, FolderService $folder) {

        $data = $folder->addNewFolder($request);

        return response()->json( ['message'=> 'Folder Added', 'id' => $data["id"], 'position' => $data["position"] ]);

    }

    public function getFolderLinks(Folder $folder, FolderService $folderService, ) {

        $links = $folderService->getLinks($folder);

        return response()->json( ['links' => $links]);
    }

    public function updateName(Request $request, Folder $folder, FolderService $folder_service) {

        $folder_service->updateFolderName($folder, $request);

        return response()->json(['message' => "Folder Name Updated"]);
    }

    public function updateFolderStatus(Request $request, Folder $folder, FolderService $folderService) {
        if ($folder->user_id != Auth::id()) {
            return abort(403);
        }

        $message = $folderService->updateStatus($request, $folder);

        return response()->json(['message' => $message]);
    }

    public function destroy(Request $request, Folder $folder, FolderService $folderService, LinkService $linkService) {
        if ($folder->user_id != Auth::id()) {
            return abort(403);
        }

        $allRequest = $request->all();

        $folderService->deleteFolder($folder);
        $linkService->updateLinksPositions($allRequest);

        $page = Page::where('id', $folder->page_id)->first();
        $allLinks = $linkService->getAllLinks($page);

        return response()->json(['message' => "Folder Deleted", 'links' => $allLinks]);
    }
}
