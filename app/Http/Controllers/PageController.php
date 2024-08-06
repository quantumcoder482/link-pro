<?php

namespace App\Http\Controllers;

use App\Http\Requests\PageBioRequest;
use App\Http\Requests\PageNameRequest;
use App\Http\Requests\PageTitleRequest;
use App\Models\Page;
use App\Models\User;
use App\Services\PageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\UserTrait;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use App\Http\Traits\PageTrait;
use Inertia\Response;


class PageController extends Controller
{

    use UserTrait, PageTrait;

    /**
     * @param PageService $pageService
     * @param Page $page
     *
     * @return Response
     */
    public function show(PageService $pageService, Page $page): Response {

        if ($page->disabled) {
            return abort(404);
        }

        $expire = 6 * 30 * 86400;
        Cookie::queue('lp_page_referral', $page->user_id, $expire);

        $page->pageVisits()->create();

        $user = User::findOrFail($page->user_id);
        $subscribed = $this->checkUserSubscription($user);

        $links = $pageService->getUserLinks($page, $subscribed);

        return Inertia::render('LivePage/LivePage')->with([
            'links'         => $links,
            'page'          => $page,
            'subscribed'    => $subscribed
        ]);
    }

    /**
     * @return Response|\Symfony\Component\HttpFoundation\Response
     */
    public function showCreatePage(): \Inertia\Response|\Symfony\Component\HttpFoundation\Response {

        $user = Auth::user();
        $userPages = $this->getUserPages($user);

        if( count($userPages) > 0) {
            $url = '/dashboard/pages/' . $userPages[0]->id;
            return Inertia::location($url);
        }

        $pages = $this->getAllPages();

        return Inertia::render('Register/CreatePage', ['pageNames' => $pages]);
    }

    /**
     * @param PageNameRequest $request
     * @param PageService $pageService
     *
     * @return JsonResponse
     */
    public function store(PageNameRequest $request, PageService $pageService): JsonResponse {

        $page = $pageService->createNewPage($request);

        return response()->json(['message'=> 'New Link Added', 'page_id' => $page->id]);
    }

    /**
     * @param PageNameRequest $request
     * @param PageService $pageService
     * @param Page $page
     *
     * @return JsonResponse
     */
    public function updateName(PageNameRequest $request, PageService $pageService, Page $page): JsonResponse {

        if ($page->user_id != Auth::id()) {
            return abort(404);
        }

        $pageService->updatePageName($request, $page);

        return response()->json(['message' => 'Link Name Updated']);

    }

    /**
     * @param PageService $pageService
     * @param Page $page
     *
     * @return Response
     */
    public function edit(PageService $pageService, Page $page): Response {

        $user = Auth::user();

        if ($page->user_id != $user->id || $page->disabled) {
            return abort(404);
        }

        $data = $pageService->editPage($page);

        return Inertia::render('Dashboard/Dashboard')->with(["userData" => $data]);
    }

    /**
     * @param Request $request
     * @param Page $page
     * @param PageService $pageService
     *
     * @return JsonResponse
     */
    public function updateHeaderImage(Request $request, Page $page, PageService $pageService): JsonResponse {

        $userID = Auth::id();

        if ($page->user_id != $userID) {
            return abort(404);
        }

        $imgPath = $pageService->updateHeaderImage($request, $userID, $page);

        return response()->json(['message' => 'Header Image Updated', 'imgPath' => $imgPath]);

    }

    /**
     * @param Request $request
     * @param Page $page
     * @param PageService $pageService
     *
     * @return JsonResponse
     */
    public function updateProfileImage(Request $request, Page $page, PageService $pageService): JsonResponse {

        $userID = Auth::id();

        if ($page->user_id != $userID) {
            return abort(404);
        }

        $imgPath = $pageService->updateProfileImage($request, $userID, $page);

        return response()->json(['message' => 'Profile Image Updated', 'imgPath' => $imgPath]);

    }

    /**
     * @param PageTitleRequest $request
     * @param Page $page
     * @param PageService $pageService
     *
     * @return JsonResponse
     */
    public function updateTitle(PageTitleRequest $request, Page $page, PageService $pageService): JsonResponse {


        if ($page->user_id != Auth::id()) {
            return abort(404);
        }

        $pageService->updatePageTitle($request, $page);

        return response()->json(['message' => 'Link Title Updated']);

    }

    /**
     * @param PageBioRequest $request
     * @param Page $page
     * @param PageService $pageService
     *
     * @return JsonResponse
     */
    public function updateBio(PageBioRequest $request, Page $page, PageService $pageService): JsonResponse {

        if ($page->user_id != Auth::id()) {
            return abort(404);
        }

        $pageService->updatePageBio($request, $page);

        return response()->json(['message' => 'Link Bio Updated']);

    }

    /**
     * @param Request $request
     * @param Page $page
     * @param PageService $pageService
     *
     * @return JsonResponse
     */
    public function updateProfileLayout(Request $request, Page $page, PageService $pageService): JsonResponse {

        if ($page->user_id != Auth::id()) {
            return abort(404);
        }

        $pageService->updateLayout($request, $page);

        return response()->json(['message' => 'Layout Updated']);
    }

    /**
     * @param Request $request
     * @param Page $page
     * @param PageService $pageService
     *
     * @return RedirectResponse
     */
    public function pageAuth(Request $request, Page $page, PageService $pageService): \Illuminate\Http\RedirectResponse {

        $pageService->authorizePage($request, $page);

        return redirect()->back()->withErrors(['unauthorized' => 'Incorrect Pin']);
    }

    /**
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function redirect(Request $request): \Symfony\Component\HttpFoundation\Response {
        $redirected = $request->redirected;
        $storeID = $request->store;
        $error = $request->connection_error;
        $message = $request->message ?: null;

        $user = Auth::User();
        $page = $user->pages()->where('user_id', $user->id)->where('default', true)->first();

        if ($redirected) {
            $url = '/dashboard/pages/' . $page->id . "?redirected=" . $redirected . "&store=" . $storeID . "&connection_error=" . $error;
        } else {
            $url = '/dashboard/pages/' . $page->id;
        }

        if ($message) {
            $url = $url . '/?message=' . $message;
        }

        return Inertia::location($url);
    }

    /**
     * @return Response
     */
    public function showPreRegister(): Response {

        return Inertia::render('PreRegister/PreRegister');
    }
}
