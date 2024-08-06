<?php

namespace App\Services;

use App\Models\Folder;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;
use App\Http\Traits\BillingTrait;
use Illuminate\Support\Facades\DB;
use Stripe\Exception\ApiErrorException;

class WebhookService
{

    use BillingTrait;

    /**
     * @param $subId
     * @param $productId
     *
     * @return void
     */
    public function updateSubscription($subId, $productId): void
    {
        $productName = $this->getProductName($productId);
        $subscription = Subscription::where('sub_id', $subId)->first();

        if ($subscription) {
            $user                = User::findOrFail($subscription->user_id);
            $subscriptionService = new SubscriptionService($user);
            $subscriptionService->updateSubscription($productName);
        }
    }

    /**
     * @param $subId
     * @param $endDate
     *
     * @return void
     */
    public function cancelSubscription($subId, $endDate): void
    {
        $subscription = Subscription::where('sub_id', $subId)->first();
        $billingEndDate = Carbon::parse($endDate);
        $endDateDB = $billingEndDate->endOfDay();

        if ($subscription != null) {
            $subscription->update([
                'status'    => 'canceled',
                'ends_at'   => $endDateDB
            ]);
        }
    }

    /**
     * @param $customer
     *
     * @return void
     *
     */
    public function checkDefaultPaymentMethod($customer): void
    {

        $stripe = $this->createStripeGateway();
        $defaultPmId = null;
        try {
            $stripeCustomer = $stripe->customers->retrieve(
                $customer,
                ['expand' => ['customer', 'payment_intent.payment_method']]
            );
            $defaultPmId = $stripeCustomer->invoice_settings->default_payment_method;
        } catch (ApiErrorException $e) {
            http_response_code(500);
            $this->saveErrors($e);
        }
        if ($defaultPmId) {
            $this->updateDefaultPaymentMethod($defaultPmId, $customer);
        }
    }

    /**
     * @param $defaultPmId
     * @param $customer
     *
     * @return void
     *
     *
     */
    public function updateDefaultPaymentMethod($defaultPmId, $customer): void
    {

        $stripe = $this->createStripeGateway();
        $user = User::where('billing_id', '=', $customer)->first();
        if ($user) {
            $customerPm = null;
            try {
                $customerPm = $stripe->customers->retrievePaymentMethod(
                    $customer,
                    $defaultPmId
                );
            } catch (ApiErrorException $e) {
                http_response_code(500);
                $this->saveErrors($e);
            }
            if ($customerPm) {
                $pmType = $customerPm->type;
                $last4  = $pmType == "card" ? $customerPm->card->last4 : null;

                if (($user->pm_id && $user->pm_id != $defaultPmId) || !$user->pm_id) {
                    $user->update([
                        'pm_id'        => $defaultPmId,
                        'pm_last_four' => $last4,
                        'pm_type'      => $pmType
                    ]);
                }
            }
        }
    }

    /**
     * @param $subId
     * @param $productId
     * @param $productName
     *
     * @return void
     */
    public function handleSubscriptionEnded($subId, $productId, $productName): void
    {
        if ($productId) {
            $productName = $this->getProductName($productId);
        }

        $subscription = Subscription::where('sub_id', '=', $subId)->first();

        if ($productName == "premier") {
            $user      = User::findOrFail($subscription->user_id);
            $userPages = $user->pages()->get();

            foreach ($userPages as $userPage) {

                if ($userPage->default) {

                    $folders = Folder::where('page_id', $userPage->id)->get();
                    if ($folders->isNotEmpty()) {
                        foreach ($folders as $folder) {
                            if ($folder->active_status) {
                                $folder->active_status = false;
                                $folder->save();
                            }
                        }
                    }
                } else {
                    $userPage->disabled = true;
                }

                $userPage->save();
            }
        }

        $subscription->update([
            'name'          => "free",
            'sub_id'        => null,
            'downgraded'    => true
        ]);
    }

    /**
     * @param $object
     *
     * @return void
     */
    public function addPlan($object): void
    {

        $name = strtolower(explode(" ", $object->name)[0]);

        DB::table('plans')->insert([
            'name'          => $name,
            'product_id'    => $object->id,
            'price'         => null,
            'price_id'      => $object->default_price,
            'description'   => $object->description,
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'    => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        $this->updatePlan($object);
    }


    /**
     * @param $object
     *
     * @return void
     *
     */
    public function updatePlan($object): void
    {

        $stripe = $this->createStripeGateway();
        try {
            $product            = $stripe->products->retrieve($object->id);
            $unconvertedPrice   = $stripe->prices->retrieve($product->default_price);
            $price              = ($unconvertedPrice->unit_amount / 10) / 10;
            $name               = strtolower(explode(" ", $product->name)[0]);

            DB::table('plans')->where('product_id', '=', $object->id)->update([
                'name'          => $name,
                'price'         => $price,
                'price_id'      => $product->default_price,
                'description'   => $object->description,
                'updated_at'    => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        } catch (ApiErrorException $e) {
            http_response_code(500);
            $this->saveErrors($e);
        }
    }

    /**
     * @param $object
     *
     * @return void
     */
    public function deletePlan($object): void
    {
        DB::table('plans')->where('product_id', '=', $object->id)->delete();
    }

    /**
     * @param $productId
     *
     * @return string|null
     */
    private function getProductName($productId): ?string
    {

        return DB::table('plans')->where('product_id', '=', $productId)->pluck('name')->first();
    }
}
