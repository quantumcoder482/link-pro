<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AdminStatsServices;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminStatsController extends Controller
{
    /**
     * @return View
     */
    public function show(): View {

        return view('stats.admin.affiliate-stats');
    }

    /**
     * @param Request $request
     * @param AdminStatsServices $adminStatsServices
     *
     * @return JsonResponse
     */
    public function getPublisherStats(Request $request, AdminStatsServices $adminStatsServices): JsonResponse {

        $data = $adminStatsServices->getAllPublisherStats($request);

        return response()->json(['data' => $data]);
    }

    /**
     * @param Request $request
     * @param AdminStatsServices $adminStatsServices
     *
     * @return JsonResponse
     */
    public function getOfferStats(Request $request, AdminStatsServices $adminStatsServices): JsonResponse {

        $data = $adminStatsServices->getAllOfferStats($request);

        return response()->json(['data' => $data]);
    }
}
