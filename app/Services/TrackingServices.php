<?php

namespace App\Services;

use Illuminate\Support\Facades\Cookie;

class TrackingServices {

    /**
     * @param $offer
     * @param $request
     * @param $user
     *
     * @return array
     */
    public function storeOfferClick($offer, $request, $user): array {

        $affRef    = $request->get('a') ? $request->get('a') : $user->id;
        $ip        = $request->ip();
        $userClick = $offer->OfferClicks()->where( 'offer_id', $offer->id )->where( 'ip_address', $ip )->first();

        $unique = false;
        if ( empty( $userClick ) ) {
            $unique = true;
        }

        $offerClick = $offer->OfferClicks()->create([
            'ip_address' => $ip,
            'referral_id' => $affRef,
            'offer_id' => $offer->id,
            'is_unique' => $unique
        ]);

        $clickId = $offerClick->id;

        $expire = 6 * 30 * 86400;
        Cookie::queue("lpcid_".$affRef."_".$offer->id, $clickId, $expire);

        return [
          'affRef'  => $affRef,
          'clickId' =>$clickId
        ];
    }
}
