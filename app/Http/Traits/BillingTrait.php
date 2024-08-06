<?php

namespace App\Http\Traits;
use App\Models\Referral;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

trait BillingTrait {


    /**
     * @return StripeClient
     */
    public function createStripeGateway(): StripeClient {

        if (App::environment() == 'production') {
            return new StripeClient(config('services.stripe.secret'));
        } else {
            return new StripeClient(config('services.stripe.sandbox_secret'));
        }

    }

    /**
     * @param $planName
     *
     * @return array|string[]
     */
    public function getPlanDetails($planName): array {

        $priceId = DB::table('plans')->where('name', '=', $planName)->pluck('price_id')->first();

        return [
            'ApiId'  => $priceId
        ];
    }

    /**
     * @param $request
     *
     * @return array
     */
    public function getCustomerBillingInfo($request): array {

        try {
            $stripe     = $this->createStripeGateway();
            $session    = $stripe->checkout->sessions->retrieve(
                $request->session_id,
                ['expand' => ['customer']]
            );
            $customer      = $session->customer;
            $paymentMethod = $stripe->customers->allPaymentMethods( $customer->id, [ 'limit' => 1 ] );

            $last4  = null;
            $pmType = "card/na";
            $pmId = null;
            if ( !empty($paymentMethod->data) ) {
                $type = $paymentMethod->data[0]["type"];
                if( $type == "card" ) {
                    $last4 = $paymentMethod->data[0]["card"]["last4"];
                }

                $pmType = $type;
                $pmId = $paymentMethod->data[0]["id"];
            }

            $data = [
                'id'        => $customer->id,
                'name'      => $customer->name,
                'last4'     => $last4,
                'pmType'    => $pmType,
                'pmId'      => $pmId,
                'invoice'   => $session->invoice ?: 'n/a',
                'status'    => $session->status == "complete" ? "active" : $session->status,
                'subId'     => $session->subscription
            ];

        } catch ( ApiErrorException $e ) {
            $this->saveErrors($e);
            http_response_code(500);
            $data = [
                "success" => false,
                "message" => 'An error occurred with the message: ' . $e
            ];
            //echo json_encode(['error' => $e->getMessage()]);
        }

        return $data;

    }

    public function getAccessToken() {
        $provider = new PayPalClient;
        $tokenArray = $provider->getAccessToken();

        return $tokenArray['access_token'];
    }

    /**
     * @param $error
     *
     * @return void
     *
     * TODO: check handling errors with stripe
     */
    public function saveErrors($error): void {
        DB::table('transaction_errors')->insert([
            'code'          => $error->getCode(),
            'message'       => $error->getMessage(),
            'attribute'     => $error->getStripeCode(),
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}
