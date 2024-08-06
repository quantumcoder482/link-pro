<?php


namespace App\Services;

use App\Notifications\NotifyAboutCancelation;
use App\Notifications\NotifyAboutResumeSub;
use App\Notifications\NotifyAboutUpgrade;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\BillingTrait;
use App\Http\Traits\UserTrait;
use Throwable;

class SubscriptionService {

    use BillingTrait, UserTrait;

    private mixed $user;

    /**
     * @param $user
     */
    public function __construct($user = null) {
        $this->user = $user ?: Auth::user();
        return $this->user;
    }

    /**
     *
     * Update user subscription level
     *
     * @param $plan
     * @param null $defaultPage
     *
     * @return array
     */
    public function updateSubscription($plan, $defaultPage = null): array {

        $activeSubs = $this->getUserSubscriptions($this->user);

        $activeSubs->update( [
            'name'          => $plan,
            'downgraded'    => $plan == "pro"
        ] );

        $this->updateUserPages($this->user, $defaultPage, $plan);

        $data = [];
        if($plan == "premier") {
            if ( $this->user->email_subscription ) {

                $userData = ( [
                    'plan'   => ucfirst( $plan ),
                    'userID' => $this->user->id,
                ] );

                $this->user->notify( new NotifyAboutUpgrade( $userData ) );
            }

            $data = [
                "success" => true,
                "message" => "Your plan has been upgraded to the Premier level"
            ];
        }

        if ($plan == "pro") {
            $data = [
                "success" => true,
                "message" => "Your plan has been downgraded to the Pro level"
            ];
        }

        return $data;
    }

    /**
     * @param $request
     *
     * @return array
     * @throws Throwable
     */
    public function cancelAtGateway($request): array {

        $subId = $request->subId;
        $data = [];

        if($request->pmType == "paypal") {

            $payPalService = new PayPalService();
            $apiHost = App::environment() == 'production' ? config('paypal.live.api_host') : config('paypal.sandbox.api_host');
            $getEndpoint = $apiHost . "/v1/billing/subscriptions/" . $subId;
            $data = $payPalService->payPalGetCall($getEndpoint, "cancel");
            $payPalService->cancelPayPalSubscription($subId);

        } else {

            $stripeService = new StripeService();
            $data = $stripeService->cancelStripeSubscription($subId);

        }

        return $data;
    }

    /**
     *
     * Cancel subscription and update user access to content
     *
     * @param $gatewayData
     * @param $request
     *
     * @return array
     */
    public function cancelSubscriptionDB($gatewayData, $request): array {

        if($request->get('pmType') == "paypal") {
            $endDateDB = $gatewayData["endDate"];
            $endDateMail = Carbon::parse($gatewayData["endDate"])->format( 'F j, Y' );
        } else {
            $billingEndDate = Carbon::createFromTimestamp($gatewayData["endDate"]);
            $endDateDB = $billingEndDate->endOfDay();
            $endDateMail = $billingEndDate->format( 'F j, Y' );
        }

        $subscription = $this->getUserSubscriptions($this->user);
        $subscription->status = strtolower($gatewayData['status']);
        $subscription->ends_at = $endDateDB;
        $subscription->save();

        if ($request->get('defaultPage')) {
            $this->updateUserDefaultPage($this->user, $request->get('defaultPage'));
        }

        if ($this->user->email_subscription) {

            $userData = ( [
                'end_date' => $endDateMail,
                'userID'   => $this->user->id,
            ] );

            $this->user->notify( new NotifyAboutCancelation( $userData ) );
        }

        return [
            "success"   => true,
            "message"   => "Your Subscription Has Been Cancelled",
            "ends_at"  => $endDateMail
        ];
    }

    /**
     * @param $request
     *
     * @return array
     * @throws Throwable
     */
    public function resumeAtGateway($request): array {

        $activeSubs = $this->getUserSubscriptions($this->user);

        /*if($request->get('pmType') == "paypal") {
            $subId = $request->subId;
            $apiHost = App::environment() == 'production' ? config('paypal.live.api_host') : config('paypal.sandbox.api_host');
            $payPalService = new PayPalService();
            $endpoint = $apiHost . "/v1/billing/subscriptions/" . $subId . "/activate";
            $payPalService->payPalPostCall($endpoint);

            $returnData = [
                'status'    => "active",
                'sub'       => $activeSubs,
                'sub_id'    => $subId
            ];
        } else {*/

            $stripeService = new StripeService();
            return $stripeService->resumeStripeSubscription($activeSubs, $request);

        /*}*/
    }

    /**
     *
     * Resume subscription by creating new subscription and setting start date to previous subscription end date
     * If previous subscription has expired then create new subscription without end date
     *
     * @param $data array
     *
     * @return array
     */
    public function resumeSubscriptionDB( array $data): array {
        $sub = $data['sub'];
        $timestamp = strtotime($sub->ends_at);
        $timestamp += 60*60*24;
        $sub->update([
            'status'    => $data['status'],
            'ends_at'   => NULL,
            'sub_id'    => $data['sub_id']
        ]);

        if (key_exists('billing_id', $data)) {
            $this->user->update([
                'billing_id' => $data['billing_id'],
            ]);
        }

        if ($this->user->email_subscription) {

            $userData = ( [
                'userID'        => $this->user->id,
                'username'      => $this->user->username,
                'link'          => $this->getDefaultUserPage($this->user)[0],
                'billingDate'   => $timestamp ? date('F j, Y', $timestamp) : null,
            ] );

            $this->user->notify( new NotifyAboutResumeSub( $userData ) );
        }

        return [
            "success" => true,
            "message" => "Your subscription has been resumed"
        ];
    }

    /**
     * @param $data
     *
     * @return void
     */
    public function updateUserPaymentMethod($data): void {

        $this->user->update([
            'pm_type'       => $data['paymentType'],
            'billing_id'    => $data['customerId'],
            'pm_last_four'  => $data['last4'],
            'pm_id'         => $data['pmId']
        ]);
    }

    /**
     * @param $data
     *
     * @return void
     */
    public function updateUserSubDetails($data): void {
        $userSub = $this->getUserSubscriptions($this->user);

        $userSub->update( [
            'sub_id'    => $data['subId'],
            'status'    => $data['status'],
        ] );
    }

    /*public function createManualSubscription($code) {

        if (strtolower( $code ) == "freepremier") {
            $subName = "premier";
        } else {
            $subName = "pro";
        }

        $this->user->subscriptions()->create( [
            'name'              => $subName,
            'sub_id'        => "bypass",
            'status'            => "active",
        ] );

        $this->user->update(["billing_id" => "bypass"]);

        if ($this->user->email_subscription) {

            $userData = ( [
                'plan'    => $subName,
                'userID'  => $this->user->id,
            ] );

            $this->user->notify( new NotifyAboutUpgrade( $userData ) );
        }

        return [
            "success" => true,
            "message" => "Your account has been upgraded!"
        ];

    }

    public function updateSubscriptionManually($code) {

        if (strtolower( $code ) == "freepremier") {
            $subName = "premier";
        } else {
            $subName = "pro";
        }

        $activeSubs = $this->getUserSubscriptions($this->user);
        $activeSubs->update( [
            'name'          => $subName,
            'sub_id'        => "bypass",
            'status'        => "active",
            'ends_at'       => null
        ] );

        $this->user->update(["billing_id" => "bypass"]);

        if ($this->user->email_subscription) {

            $userData = ( [
                'plan'    => $subName,
                'userID'  => $this->user->id,
            ] );

            $this->user->notify( new NotifyAboutUpgrade( $userData ) );
        }

        return [
            "success" => true,
            "message" => "Your account has been upgraded!"
        ];

    }*/
}
