<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddLinkRequest;
use App\Http\Requests\UpdateLinkRequest;
use App\Services\LinkService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Link;
use App\Models\Page;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class LinkController extends Controller
{

    /**
     * @param Page $page
     * @param LinkService $linkService
     *
     * @return JsonResponse
     */
    public function getPageLinks(Page $page, LinkService $linkService): JsonResponse {

        $links = $linkService->getAllLinks($page);

        return response()->json(['userLinks'=> $links]);
    }

    /**
     * @param AddLinkRequest $request
     * @param LinkService $linkService
     *
     * @return JsonResponse
     */
    public function store(AddLinkRequest $request, LinkService $linkService): JsonResponse {

        $data = $linkService->addLink($request);

        return response()->json([
            'message'=> 'Icon Added',
            'link_id' => $data["link"]->id,
            'position' => $data["link"]->position,
            'iconPath' => $data["path"]
        ]);
    }

    /**
     * @param UpdateLinkRequest $request
     * @param Link $link
     * @param LinkService $linkService
     *
     * @return JsonResponse
     */
    public function update(UpdateLinkRequest $request, Link $link, LinkService $linkService): JsonResponse {

        if ($link->user_id != Auth::id()) {
            return abort(403);
        }

        $path = $linkService->updateLink($request, $link);

        /*if (!$path) {
            $path = null;
        }*/

        return response()->json(['message' => 'Icon Updated', 'path' => $path]);

    }

    /**
     * @param Request $request
     * @param Link $link
     * @param LinkService $linkService
     *
     * @return JsonResponse
     */
    public function updateStatus(Request $request, Link $link, LinkService $linkService): JsonResponse {
        if ($link->user_id != Auth::id()) {
            return abort(403);
        }

        $message = $linkService->updateLinkStatus($request, $link);

        return response()->json(['message' => $message]);

    }

    /**
     * @param Request $request
     * @param LinkService $linkService
     *
     * @return JsonResponse
     */
    public function updatePositions(Request $request, LinkService $linkService): JsonResponse {

        $allRequest = $request->all();

        $linkService->updateLinksPositions($allRequest);

        return response()->json(['message' => "Links Position Updated"]);
    }

    /**
     * @param Request $request
     * @param Link $link
     * @param LinkService $linkService
     *
     * @return JsonResponse
     */
    public function destroy(Request $request, Link $link, LinkService $linkService): JsonResponse {
        if ($link->user_id != Auth::id()) {
            return abort(403);
        }

        $allRequest = $request->all();

        $linkService->deleteLink($link);
        $linkService->updateLinksPositions($allRequest);

        $page = Page::where('id', $link->page_id)->first();
        $allLinks = $linkService->getAllLinks($page);

        return response()->json(['message' => 'Icon Has Been Deleted', 'links' => $allLinks]);
    }
}
