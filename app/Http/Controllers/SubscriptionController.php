<?php

namespace App\Http\Controllers;

use App\Services\PayPalService;
use App\Services\StripeService;
use App\Services\SubscriptionService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\BillingTrait;
use Inertia\Inertia;
use Inertia\Response;
use Stripe\Exception\ApiErrorException;
use Throwable;

class SubscriptionController extends Controller
{
    use BillingTrait;

    /**
     * @param Request $request
     * @param StripeService $stripeService
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws ApiErrorException
     * @throws Throwable
     */
    public function showPurchasePage(Request $request, StripeService $stripeService): \Symfony\Component\HttpFoundation\Response {

        $checkout_session = $stripeService->getStripePurchasePage($request);

        return Inertia::location($checkout_session->url);
    }

    /**
     * @param Request $request
     * @param SubscriptionService $subscriptionService
     * @param StripeService $stripeService
     * @param PayPalService $payPalService
     *
     * @return Response
     * @throws Throwable
     */
    public function stripeSubscribeSuccess(
        Request $request,
        SubscriptionService $subscriptionService,
        StripeService $stripeService,
        PayPalService $payPalService
    ): Response {

        $type = $request->get('type');

        $data = $stripeService->getStripeSuccessPage($request);

        if ($type == "change_payment_method") {
            $subscriptionService->updateUserPaymentMethod($data);
            $payPalService->cancelPayPalSubscription();
            $subscriptionService->updateUserSubDetails($data);
            return Inertia::render('User/User')->with(['message' => 'Payment Method Changed']);
        } else {
            $stripeService->newStripeSubscription($data);
            return Inertia::render('Checkout/Success')->with(['type' => 'subscription', 'name' => $data['customerName'] ]);
            //$this->showSuccessPage(null, 'subscription', $data['customerName']);
        }
    }

    public function cancelCheckout(): Response {
        return Inertia::render('Checkout/CancelCheckout')->with(['type' => 'subscription']);
    }

    /**
     * @param Request $request
     * @param SubscriptionService $subscriptionService
     * @param StripeService $stripeService
     *
     * @return JsonResponse
     */
    public function changePlan(
        Request $request,
        SubscriptionService $subscriptionService,
        StripeService $stripeService,
    ): JsonResponse {

        $plan = $request->get('plan');
        $pmType = $request->get('pmType') ?: null;
        $user = Auth::user();
        $defaultPage = $request->get('defaultPage') ?: null;
        $url = '/dashboard';

        if ($pmType && $pmType!= 'paypal') {
            $stripeService->updateStripeInfo( $request );
        }

        $data = $subscriptionService->updateSubscription( $plan, $defaultPage );

        // check to see if coming from plans page or user settings page
        $path = $request->session()->get( '_previous' );
        if ( ( str_contains( $path["url"], '/subscribe' ) || str_contains( $path["url"], '/plans' ) ) ) {
            $page = $user->pages()->where( 'user_id', $user["id"] )->where( 'default', true )->first();
            $url  = '/dashboard/pages/' . $page->id;
        }

        return response()->json(['success' => $data["success"], 'message' => $data["message"], 'url' => $url]);

    }

    /**
     * @param Request $request
     *
     * @return Response
     */
    public function showPlans(Request $request): Response {

        $type = $request->get('type');

        return Inertia::render('Plans/Plans')->with([ 'type' => $type ]);
    }

    /**
     * @param Request $request
     * @param SubscriptionService $subscriptionService
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function cancel(Request $request, SubscriptionService $subscriptionService): JsonResponse {

        $gatewayData = $subscriptionService->cancelAtGateway($request);

        if($gatewayData["success"]) {
            $data = $subscriptionService->cancelSubscriptionDB($gatewayData, $request);
            $returnResponse = [
                'success' => $data["success"],
                'message' => $data["message"],
                'ends_at' => array_key_exists('ends_at', $data) ? $data["ends_at"] : null,
            ];
        } else {
            $returnResponse = [
                'success' => false,
            ];
        }

        return response()->json($returnResponse);
    }

    /**
     * @param Request $request
     * @param SubscriptionService $subscriptionService
     *
     * @return JsonResponse
     * @throws Throwable
     */
    public function resume(Request $request, SubscriptionService $subscriptionService): JsonResponse {

        $gatewayData = $subscriptionService->resumeAtGateway($request);

        $data = $subscriptionService->resumeSubscriptionDB($gatewayData);

        return response()->json([
            'success' => $data["success"],
            'message' => $data["message"],
            'sub_id'  => $gatewayData['sub_id']
        ]);
    }

    /**
     * @param Request|null $request
     * @param $type
     * @param $name
     *
     * @return Response
     */
    public function showSuccessPage(Request $request = null, $type = null, $name = null): Response {

        if(isset($request->type)) {
            $type = $request->type;
        }

        return Inertia::render('Checkout/Success')->with(['type' => $type, 'name' => $name ]);
    }

    /**
     * @return JsonResponse
     */
    public function getPayPalClient(): JsonResponse {
        $payPalClient = App::environment() == "production" ? config('paypal.live.client_id') : env('PAYPAL_SANDBOX_CLIENT_ID');
        return response()->json([
            'success'       => true,
            'payPalClient'  => $payPalClient,
        ]);
    }

    /**
     * @param Request $request
     * @param PayPalService $payPalService
     * @param SubscriptionService $subscriptionService
     *
     * @return JsonResponse
     */
    public function payPalSubscribeSuccess(Request $request, PayPalService $payPalService, SubscriptionService $subscriptionService): JsonResponse {

        $user = Auth::user();
        $subscription = $user->subscriptions()->first();

        if($subscription) {
            $data = [
                'sub'           => $subscription,
                'status'        => 'active',
                'sub_id'        => $request->get('subId'),
                'billing_id'    => $request->get('userEmail')
            ];
            $response = $subscriptionService->resumeSubscriptionDB($data);
        } else {
            $payPalService->newPayPalSubscription( $request );
            $response = [
                'success' => true,
            ];
        }

        return response()->json($response);

    }

    /**
     * @param Request $request
     * @param SubscriptionService $subscriptionService
     * @param StripeService $stripeService
     *
     * @return JsonResponse
     */
    public function changePaymentMethodToPaypal(
        Request $request,
        SubscriptionService $subscriptionService,
        StripeService $stripeService
    ): JsonResponse {
        $pmData = [
            'paymentType'   => $request->get('pmType'),
            'customerId'    => $request->get('userEmail'),
            'last4'         => null,
            'pmId'          => null
        ];

        $subscriptionService->updateUserPaymentMethod($pmData);
        $stripeService->cancelStripeSubscription();
        $subData = [
            'subId'     => $request->get('subId'),
            'status'    => "active"
        ];
        $subscriptionService->updateUserSubDetails($subData);

        return response()->json([
            'success'   => true,
            'message'   => "Payment Method Updated"
        ]);
    }

    public function getStripeBillingDate(Request $request): JsonResponse {

        $stripe = $this->createStripeGateway();
        $date = "";
        try {
            $sub = $stripe->subscriptions->retrieve( $request->get( 'subId' ) );
            $carbonDate = Carbon::createFromTimestamp($sub->current_period_end)->startOfDay()->format('Y-m-d\TH:i:s');
            $date = $carbonDate . "Z";
        } catch ( ApiErrorException $e ) {
            $this->saveErrors($e);
            http_response_code(500);
        }

        return response()->json([
            'success'   => true,
            'startDate' => $date
        ]);
    }
}
