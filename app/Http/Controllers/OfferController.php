<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\User;
use App\Services\OfferService;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{

    /**
     * @param Offer $offer
     * @param Request $request
     * @param OfferService $offerService
     *
     * @return JsonResponse
     */
    public function updateOfferIcon(Offer $offer, Request $request, OfferService $offerService): \Illuminate\Http\JsonResponse {
        $userID = Auth::id();

        if ($offer->user_id != $userID) {
            return abort(404);
        }

        $imagePath = $offerService->updateOfferIcon($request, $userID, $offer);

        return response()->json(['message' => 'Course Icon Updated', 'imagePath' => $imagePath]);

    }

    /**
     * @param Offer $offer
     * @param Request $request
     * @param OfferService $offerService
     *
     * @return JsonResponse
     */
    public function updateOfferData(Offer $offer, Request $request, OfferService $offerService): JsonResponse {

        $userID = Auth::id();

        if ($offer->user_id != $userID) {
            return abort(404);
        }

        $message = $offerService->updateOfferData($offer, $request);

        return response()->json(['message' => $message]);

    }

    /**
     * @param Offer $offer
     * @param OfferService $offerService
     *
     * @return JsonResponse
     */
    public function publishOffer(Offer $offer,  OfferService $offerService): JsonResponse {
        $userID = Auth::id();

        if ($offer->user_id != $userID) {
            return abort(404);
        }

        $success = $offerService->publishOffer($offer);

        if ($success) {
            $returnData = array(
                'success' => true,
                'message' => 'Offer Published'
            );

            return response()->json($returnData);
        } else {
            $returnData = array(
                'success' => false,
                'message' => 'Course must have an Icon and price set before being published',
                'code' => 400
            );
            return response()->json($returnData, 400);
        }
    }

    /**
     * @param Offer $offer
     * @param User $user
     *
     * @return Application|Redirector|\Illuminate\Contracts\Foundation\Application|RedirectResponse
     */
    public function redirectToLandingPage(Offer $offer, User $user): Application|Redirector|\Illuminate\Contracts\Foundation\Application|RedirectResponse {
        $creator = $offer->user()->pluck('username')->first();
        $slug = $offer->Course()->pluck('slug')->first();
        $url = config('app.url') . "/" . $creator . "/course-page/" . $slug . "?a=" . $user->id;

        return redirect($url);
    }
}
