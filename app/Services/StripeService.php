<?php

namespace App\Services;

use App\Notifications\NotifyAboutUpgrade;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use App\Http\Traits\BillingTrait;
use Throwable;

class StripeService {

    use BillingTrait;

    private mixed $user;

    /**
     * @param $user
     */
    public function __construct($user = null) {
        $this->user = $user ?: Auth::user();
        return $this->user;
    }

    /**
     * @param $request
     *
     * @return Session
     * @throws ApiErrorException|Throwable
     */
    public function getStripePurchasePage($request): \Stripe\Checkout\Session {

        $stripe     = $this->createStripeGateway();
        $domain     = config('app.url');
        $planName   = $request->get('plan') ?? null;
        $lineItems  = $this->getPlanDetails($planName);
        $email      = $this->user->email;
        $customerId = $this->user->billing_id;
        $type       = $request->get('type');
        $additionalVars = "";

        if ($type == "change_payment_method") {
            $paypalGetCall = new PayPalService();
            $subId = $this->user->subscriptions()->pluck('sub_id')->first();
            $apiHost = App::environment() == 'production' ? config('paypal.live.api_host') : config('paypal.sandbox.api_host');
            $endpoint = $apiHost . "/v1/billing/subscriptions/" . $subId;
            $nextBillingDate = $paypalGetCall->payPalGetCall($endpoint, "next_billing_date");
            $billingDateTimestamp = Carbon::parse($nextBillingDate)->timestamp;

            $dynamicData['subscription_data'] = [
                'proration_behavior'    => 'none',
                'billing_cycle_anchor'  => $billingDateTimestamp,
            ];
            $dynamicData['custom_text'] = [
                'submit' => [
                    'message' => 'NOTE: PAYMENT PROCESSOR WILL BE CHANGED FROM PAYPAL TO STRIPE. YOU WILL NOT BE CHARGED UNTIL THE END OF YOUR CURRENT SUBSCRIPTION PERIOD.'
                ]
            ];
            $additionalVars = '&type=change_payment_method';
        }

        // check if user already has a billing id and be sure it's from stripe ie. starts with 'cus'
        if ($customerId && str_contains($customerId, 'cus')) {
            $dynamicData['customer'] = $customerId;
        } else {
            $dynamicData['customer_email'] = $email;
        }

        $session = "";

        try {
            $session = $stripe->checkout->sessions->create( [
                'success_url'           => $domain . '/subscribe/stripe-success?session_id={CHECKOUT_SESSION_ID}&plan=' . $planName . $additionalVars,
                'cancel_url'            => $domain . '/subscribe/cancel-checkout',
                'line_items'            => [
                    [
                        'price'    => $lineItems['ApiId'],
                        'quantity' => 1
                    ]
                ],
                'mode'                  => 'subscription',
                'allow_promotion_codes' => ! ( $type == "change_payment_method" ),
                'payment_method_types'  => [],
                $dynamicData
            ] );
        } catch ( ApiErrorException $e ) {
            $this->saveErrors($e);
            http_response_code(500);
        }

        return $session;
    }

    /**
     * @param $request
     *
     * @return array
     */
    public function getStripeSuccessPage($request): array {

        $plan           = $request->get('plan') ?? null;
        $billing        = $this->getCustomerBillingInfo($request);

        return [
            'planId'        => $plan,
            'subId'         => $billing['subId'],
            'status'        => $billing['status'],
            'customerId'    => $billing['id'] ?: null,
            'customerName'  => $billing['name'] ?: null,
            'paymentType'   => $billing['pmType'],
            'last4'         => $billing['last4'],
            'pmId'          => $billing['pmId'],
        ];
    }

    /**
     * create new user subscription and update user billing info
     *
     * @param $data
     *
     */
    public function newStripeSubscription($data): void {

        $this->user->subscriptions()->create( [
            'name'      => $data['planId'],
            'sub_id'    => $data['subId'],
            'status'    => $data['status']
        ] );

        $this->user->update([
            'billing_id'    => $data['customerId'],
            'pm_last_four'  => $data['last4'],
            'pm_type'       => $data['paymentType'],
            'pm_id'         => $data['pmId']
        ]);

        if ($this->user->email_subscription) {

            $userData = ( [
                'plan'    => ucfirst($data['planId']),
                'userID'  => $this->user->id,
            ] );

            $this->user->notify( new NotifyAboutUpgrade( $userData ) );
        }
    }

    /**
     * @param $request
     *
     * @return void
     */
    public function updateStripeInfo($request): void {

        $price = $this->getPlanDetails($request->get('plan'));
        $stripe = $this->createStripeGateway();
        try {

            $subscriptions = $stripe->subscriptions->all(['customer' => $this->user->billing_id]);

            $stripe->subscriptions->update(
                $request->get('subId'),
                ['items'    => [[
                    'id'    => $subscriptions->data[0]->items->data[0]->id,
                    'price' => $price['ApiId'],
                ]]],
            );

        } catch ( ApiErrorException $e ) {
            http_response_code(500);
            $this->saveErrors($e);
        }
    }

    /**
     * @param $subId
     *
     * @return array
     *
     */
    public function cancelStripeSubscription($subId = null): array {
        if (!$subId) {
            $subId = $this->user->subscriptions()->pluck('sub_id')->first();
        }
        $stripe = $this->createStripeGateway();
        try {

            $sub = $stripe->subscriptions->cancel( $subId );

            return [
                'success'   => true,
                'status'    => $sub->status,
                'endDate'   => $sub->current_period_end
            ];

        } catch ( ApiErrorException $e ) {
            $this->saveErrors( $e );
            http_response_code( 500 );
        }
    }

    /**
     * @param $activeSubs
     * @param $request
     *
     * @return array
     */
    public function resumeStripeSubscription($activeSubs, $request): array {
        $stripe = $this->createStripeGateway();
        $customerNumber = $this->user->billing_id;
        $startDate = Carbon::parse($activeSubs->ends_at);
        $lineItems = $this->getPlanDetails($request->get('plan'));

        $response = "";
        try {
            $response = $stripe->subscriptions->create([
                'customer'                      => $customerNumber,
                'items'                         => [['price' => $lineItems['ApiId'] ]],
                'billing_cycle_anchor_config'   => ['day_of_month' => $startDate->day],
                'default_payment_method'        => $this->user->pm_id
            ]);


        } catch ( ApiErrorException $e ) {
            http_response_code(500);
            $this->saveErrors($e);
        }

        return [
            'status'    => $response->status,
            'sub'       => $activeSubs,
            'sub_id'    => $response->id
        ];
    }
}
