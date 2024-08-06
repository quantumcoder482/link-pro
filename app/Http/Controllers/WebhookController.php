<?php

namespace App\Http\Controllers;

use App\Services\WebhookService;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use App\Http\Traits\BillingTrait;
use Illuminate\Http\Request;
use Stripe\Webhook;

class WebhookController extends Controller
{

    use BillingTrait;

    /**
     * @param WebhookService $webhook_service
     *
     * @return void
     */
    public function receiveWebhookResponse(WebhookService $webhook_service): void {

        $event = $this->getStripeWebhookInstance('customer');
        switch($event->type) {
            case 'customer.subscription.updated':
                $subId      = $event->data->object->id;
                $productId  = $event->data->object->plan->product;
                $endDate    = $event->data->object->cancel_at;

                if($endDate) {
                    $webhook_service->cancelSubscription($subId, $endDate);
                } else {
                    $webhook_service->updateSubscription($subId, $productId);
                }

                $response = "customer.subscription.updated: " . $event->data->object;
                break;
            case 'customer.subscription.deleted':
                $subId      = $event->data->object->id;
                $productId  = $event->data->object->plan->product;
                $webhook_service->handleSubscriptionEnded($subId, $productId, null);

                $response = "customer.subscription.deleted: " . $event->data->object;
                break;
            case 'customer.updated':
                $customer           =  $event->data->object->id;
                $defaultPaymentId   =  $event->data->object->invoice_settings->default_payment_method;
                if ($defaultPaymentId) {
                    $webhook_service->updateDefaultPaymentMethod($defaultPaymentId, $customer);
                }
                $response = "customer.updated: " . $event->data->object;
                break;
            case 'payment_method.attached':
                $customer =  $event->data->object->customer;
                $webhook_service->checkDefaultPaymentMethod($customer);
                $response = "payment_method.attached: " . $event->data->object;
                break;
            default:
                $response = 'Received unknown event type ' . $event->type . '---object---' . $event->data->object;
                break;
        }
        http_response_code(200);
        Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                            Carbon::now() .
                                            "-- kind --"
                                            . $event->type .
                                            "-- switch response -- " .
                                            $response );
        /*if ($response) {
            Log::channel( 'webhooks' )->info( " --- object --- " . $response );
            Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                                Carbon::now() .
                                                "-- kind --"
                                                . "receiveProductWebhookResponse" .
                                                "-- Error Message -- " .
                                                $response );
        }*/
    }

    /**
     * @param WebhookService $webhook_service
     *
     * @return void
     */
    public function receiveProductWebhookResponse(WebhookService $webhook_service): void {

        $event = $this->getStripeWebhookInstance('product');
        $response = null;
        switch($event->type) {
            case 'product.created':
                $webhook_service->addPlan($event->data->object);
                $response = "product.created: " . $event->data->object;
                break;
            case 'product.deleted':
                $webhook_service->deletePlan($event->data->object);
                $response = "product.deleted: " . $event->data->object;
                break;
            case 'product.updated':
                $webhook_service->updatePlan($event->data->object);
                $response = "product.updated: " . $event->data->object;
                break;
            default:
                $response = 'Received unknown event type ' . $event->type . '---object---' . $event->data->object;
                break;
        }
        http_response_code(200);
        Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                            Carbon::now() .
                                            "-- kind --"
                                            . "receiveProductWebhookResponse" .
                                            $event->type .
                                            $response );
        /*if ($response) {
            Log::channel( 'webhooks' )->info( " --- object --- " . $response );
            Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                                Carbon::now() .
                                                "-- kind --"
                                                . "receiveProductWebhookResponse" .
                                                "-- Error Message -- " .
                                                $response );
        }*/
    }

    public function receivePaypalWebhookResponse(Request $request, WebhookService $webhook_service): void {
        $webhookData = $request->all();
        $event_type = $webhookData["event_type"];
        $subscription_id = $webhookData['resource']['id'];
        $endDate = $webhookData['resource']['start_time'];
        $plan_id = $webhookData['resource']['plan_id'];

        if (App::environment() === "production") {
            $planName = $plan_id == "P-6MH1893903516972EMX5QADY" ? "pro" : "premier";
        } else {
            $planName = $plan_id == "P-5XM03253A6686724NMYGYLEQ" ? "pro" : "premier";
        }

        Log::channel( 'webhooks' )->info( " --- PayPal event type --- " . print_r($webhookData, true ) );

        //TODO: event of payment failure
        switch($event_type) {
            case "BILLING.SUBSCRIPTION.CANCELLED":
                $webhook_service->cancelSubscription($subscription_id, $endDate);
                break;
            case "BILLING.SUBSCRIPTION.EXPIRED":
                $webhook_service->handleSubscriptionEnded($subscription_id, null, $planName);
                break;
        }
    }

    private function getStripeWebhookInstance($type) {

        //$stripe = $this->createGateway();
        if ($type == "customer") {
            $endpointSecret = App::environment() == 'production' ?
                config('services.stripe.webhook_secret') :
                config('services.stripe.test_webhook_secret');

        } else {
            $endpointSecret = App::environment() == 'production' ?
                config('services.stripe.product_webhook_secret') :
                config('services.stripe.test_product_webhook_secret');
        }

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];

        $response = null;
        try {
            return Webhook::constructEvent(
                $payload, $sig_header, $endpointSecret
            );
        } catch(\UnexpectedValueException $e) {
            // Invalid payload
            Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                                Carbon::now() .
                                                "-- kind --"
                                                . "UnexpectedValueException in Webhook" .
                                                "-- Error Message -- " .
                                                $e );
            http_response_code(400);
            exit();
        } catch(\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                                Carbon::now() .
                                                "-- kind --"
                                                . "SignatureVerificationException in Webhook" .
                                                "-- Error Message -- " .
                                                $e);
            http_response_code(400);
            exit();
        }
    }
}
