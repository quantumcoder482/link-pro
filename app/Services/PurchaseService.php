<?php

namespace App\Services;

use App\Events\PurchasedItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use App\Http\Traits\BillingTrait;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;

class PurchaseService {

    use BillingTrait;

    private StripeClient $gateway;

    public function __construct() {
        $this->gateway = $this->createStripeGateway();

        return $this->gateway;
    }

    /**
     * @throws ApiErrorException
     */
    public function showCheckoutPage($course, $request): \Stripe\Checkout\Session {

        $authUser = Auth::user();
        $offer = $course->Offer()->first();
        $domain = config('app.url');
        $customerId = $authUser->billing_id;

        if ($customerId && str_contains($customerId, 'cus')) {
            $customerData = ['customer' => $customerId];
        } else {
            $customerData = [
                'customer_creation' => 'always',
                'customer_email'=> $authUser->email
            ];
        }

        $logo = $course->logo ?: 'https://lp-production-images.s3.us-east-2.amazonaws.com/logo.png';
        $affRef = $request->get('a') ? $request->get('a') : "none";
        $clickId = $request->get('cid') ? $request->get('cid') : "internal";
        $price = bcmul($offer->price, 100);

        return $this->gateway->checkout->sessions->create([
            'success_url'   => $domain . '/purchase/success?session_id={CHECKOUT_SESSION_ID}&offer=' . $offer->id . '&price=' . $price . '&affRef=' . $affRef . '&cid=' . $clickId,
            'cancel_url'    => $domain . '/purchase/cancel-checkout',
            'line_items'    =>
                [[
                    'price_data' => [
                        'currency'      => 'usd',
                        'unit_amount'   => $price,
                        'product_data'  => [
                            'name'          => $course->title,
                            'description'   => 'One time payment of $' . $offer->price . ' will get you access to all videos in this course.',
                            'images'        => [$logo]
                        ]
                    ],
                    'quantity'      => 1,
                ]],
            'mode'                      => 'payment',
            'payment_method_types'      => [],
            'invoice_creation'          => ['enabled' => true],
            'allow_promotion_codes'     => true,
            $customerData
        ]);
    }

    /**
     * @param $offer
     * @param $request
     *
     * @return array
     */
    public function savePurchase($offer, $request): array {

        $user = Auth::user();
        $roles = $user->getRoleNames();
        if (!$roles->contains("course.user")) {
            $user->assignRole('course.user');
        }

        $pmType = $request->pmType;

        if ( $request->cid && $request->cid != "" ) {
            $clickId = $request->cid;
        } else {
            $clickId = Cookie::get( 'lpcid_' . $request->affRef . '_' . $offer->id );
        }

        if($pmType == "paypal") {
            $purchaseData = [
                'user_id'         => $user->id,
                'offer_click_id'  => $clickId,
                'customer_id'     => $request->customerId,
                'transaction_id'  => $request->orderId,
                'purchase_amount' => $request->price,
                'pm_type'         => $pmType,
                'status'          => $request->status,
            ];
        } else {
            $billing = $this->getCustomerBillingInfo($request);
            $price  = (float) number_format( ( $request->price / 100 ), 2, '.', ' ' );
            $purchaseData = [
                'user_id'         => $user->id,
                'offer_click_id'  => $clickId,
                'customer_id'     => $billing['id'],
                'transaction_id'  => $billing['invoice'],
                'purchase_amount' => $price,
                'pm_last_four'    => $billing['last4'],
                'pm_type'         => $billing['pmType'],
                'status'          => $billing['status'],
            ];
        }

        $course = $offer->Course()->first();
        $purchase = $course->Purchases()->create($purchaseData);

        $data = [
            "success"      => true,
            "message"      => "Congrats! You Have Purchased The " . str_replace( '-', " ", $course->slug ) . " Course",
            "courseSlug"   => $course->slug,
            'courseTitle'  => $course->title,
            "customerName" => $pmType == "paypal" ? $request->customerName : $billing['name']
        ];

        PurchasedItem::dispatch( $purchase );

        return $data;
    }
}
