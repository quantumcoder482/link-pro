<?php

namespace App\Http\Controllers;

use App\Services\StatsServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laracasts\Utilities\JavaScript\JavaScriptFacade as Javascript;

class StatsController extends Controller
{

    /**
     * @return Response
     */
    public function show(Request $request): \Inertia\Response {

        return Inertia::render('Stats/Stats');
    }

    /**
     * @param Request $request
     * @param StatsServices $statsServices
     *
     * @return JsonResponse
     */
    public function getPageStats(Request $request, StatsServices $statsServices): JsonResponse {

        $data = $statsServices->getAllPageStats($request);

        return response()->json(['data' => $data]);
    }

    /**
     * @param Request $request
     * @param StatsServices $statsServices
     *
     * @return JsonResponse
     */
    public function getLinkStats(Request $request, StatsServices $statsServices): JsonResponse {

        $data = $statsServices->getAllLinkStats($request);

        return response()->json(['data' => $data]);
    }

    /**
     * Get deleted link stats for today
     *
     * @param Request $request
     * @param StatsServices $statsServices
     *
     * @return JsonResponse
     */
    /*public function getDeletedStats(StatsServices $statsServices) {

        $data = $statsServices->getTodaysDeletedStats();

        return response()->json([
            'deletedStats' => $data,
        ]);
    }*/

    /**
     * @param Request $request
     * @param StatsServices $statsServices
     *
     * @return JsonResponse
     */
    public function getFolderStats(Request $request, StatsServices $statsServices): JsonResponse {

        $data = $statsServices->getAllFolderStats($request);

        return response()->json(['data' => $data]);
    }

    /**
     * @param Request $request
     * @param StatsServices $statsServices
     *
     * @return JsonResponse
     */
    public function getOfferStats(Request $request, StatsServices $statsServices): JsonResponse {

        $data = $statsServices->getAllOfferStats($request);

        return response()->json(['data' => $data]);
    }

    /**
     * @param Request $request
     * @param StatsServices $statsServices
     *
     * @return JsonResponse
     */
    public function getPublisherStats(Request $request, StatsServices $statsServices): JsonResponse {

        $data = $statsServices->getAllPublisherStats($request);

        return response()->json(['data' => $data]);
    }
}
