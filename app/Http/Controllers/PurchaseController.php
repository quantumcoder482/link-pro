<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Offer;
use App\Models\User;
use App\Services\PurchaseService;
use Illuminate\Http\Request;
use App\Http\Traits\BillingTrait;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\Exception\ApiErrorException;


class PurchaseController extends Controller
{
    use BillingTrait;

    /**
     * @param Request $request
     * @param User $user
     * @param Course $course
     * @param PurchaseService $purchaseService
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws ApiErrorException
     */
    public function show(Request $request, User $user, Course $course, PurchaseService $purchaseService): \Symfony\Component\HttpFoundation\Response {

        $checkout_session = $purchaseService->showCheckoutPage($course, $request);

        return Inertia::location($checkout_session->url);
    }

    /**
     * @param Request $request
     * @param PurchaseService $purchaseService
     *
     * @return Response
     */
    public function success(Request $request, PurchaseService $purchaseService): Response {

        $offer = Offer::findOrFail($request->get('offer'));
        $data = $purchaseService->savePurchase($offer, $request);

        $url = "";
        if ($data["success"]) {
            $username = $offer->user()->pluck('username')->first();
            $url = config('app.url') . "/" . $username . "/course/" . $data["courseSlug"];
        }
        
        return Inertia::render('Checkout/Success')->with([
            'type'          => 'purchase',
            'name'          => $data["customerName"],
            'url'           => $url,
            'courseTitle'   => $data['courseTitle']
        ]);
    }

    public function cancelCheckout(): Response {
        return Inertia::render('Checkout/CancelCheckout')->with(['type' => 'purchase']);
    }
}
