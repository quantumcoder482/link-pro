<?php

namespace App\Services;
use App\Http\Traits\BillingTrait;
use App\Http\Traits\UserTrait;
use App\Notifications\NotifyAboutUpgrade;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Throwable;

class PayPalService {

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
     * @throws Throwable
     */
    public function cancelPayPalSubscription($subId = null): void {
        if(!$subId) {
            $userSub = $this->getUserSubscriptions($this->user);
            $subId = $userSub->sub_id;
        }

        $apiHost = App::environment() == 'production' ? config('paypal.live.api_host') : config('paypal.sandbox.api_host');
        $postEndpoint = $apiHost . "/v1/billing/subscriptions/" . $subId . "/cancel";
        $sendData = [
            "reason" => "Customer-requested Cancel"
        ];
        $this->payPalPostCall($postEndpoint, $sendData);
    }

    /**
     * create new user subscription and update user billing info from PayPal Data
     *
     * @param $data
     *
     */
    public function newPayPalSubscription($data): void {

        $this->user->subscriptions()->create( [
            'name'      => $data['planId'],
            'sub_id'    => $data['subId'],
            'status'    => "active"
        ] );

        $this->user->update([
            'pm_type'       => $data['pmType'],
            'billing_id'    => $data['userEmail']
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
     * @param $endpoint
     * @param array|string $sendData
     * @param bool $returnResponse
     *
     * @return null|void|integer|string
     * @throws Throwable
     */
    public function payPalPostCall($endpoint, array|string $sendData = [], bool $returnResponse = false) {

        $provider = new PayPalClient;
        $accessToken = $provider->getAccessToken();

        if (empty($sendData)) {
            $data = array(
                CURLOPT_URL => $endpoint,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_TIMEOUT => 30000,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_HTTPHEADER => array(
                    // Set Here Your Requested Headers
                    'Content-Type: application/json',
                    'Accept: application/json',
                    'Authorization: Bearer ' . $accessToken['access_token']
                )
            );
        } else {
            $data = array(
                CURLOPT_URL => $endpoint,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_TIMEOUT => 30000,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => json_encode($sendData),
                CURLOPT_HTTPHEADER => array(
                    // Set Here Your Requested Headers
                    'Content-Type: application/json',
                    'Accept: application/json',
                    'Authorization: Bearer ' . $accessToken['access_token']
                )
            );
        }

        $curl = curl_init();
        curl_setopt_array($curl, $data);
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            $decodedResponse = "cURL Error getting sub #:" . $err;
            $this->saveErrors( $decodedResponse );
            return $decodedResponse;
        }

        if($returnResponse) {
            $decodedResponse = json_decode($response, true);
            return $decodedResponse['id'];
        }
    }

    /**
     * @param $endpoint
     * @param $type
     *
     * @return Carbon | array | string
     * @throws Throwable
     */
    public function payPalGetCall($endpoint, $type): array|Carbon|string {
        $provider = new PayPalClient;
        $accessToken = $provider->getAccessToken();
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $endpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                // Set Here Your Requested Headers
                'Content-Type: application/json',
                'Accept: application/json',
                'Authorization: Bearer ' . $accessToken['access_token']
            )
        ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            $decodedResponse = "cURL Error getting sub #:" . $err;

            $this->saveErrors( $decodedResponse );
            return [
                'success'   => false,
                'error'     => $decodedResponse
            ];
        } else {
            $decodedResponse = json_decode($response, true);

            switch ($type) {
                case 'cancel':
                    $nextBillingDate = Carbon::parse($decodedResponse["billing_info"]["next_billing_time"]);
                    $endDate = $nextBillingDate->startOfDay()->format('Y-m-d H:i:s');
                    return [
                        'success'   => true,
                        'status'    => "canceled",
                        'endDate'   => $endDate
                    ];
                case 'next_billing_date':
                    return Carbon::parse($decodedResponse["billing_info"]["next_billing_time"]);
                case 'sub_status':
                    return $decodedResponse["status"];
            }
        }

        return $decodedResponse;
    }

    /**
     * @param $planName
     *
     * @return string
     */
    public function getPaypalPlanId($planName): string {

        if (App::environment() === "production") {
            return $planName === "pro" ? "P-6MH1893903516972EMX5QADY" : "P-5CL62356R3238071JMX5QANA";
        } else {
            return $planName === "pro" ? "P-5XM03253A6686724NMYGYLEQ" : "P-17R924989P608662RMYGYLWQ";
        }
    }
}
