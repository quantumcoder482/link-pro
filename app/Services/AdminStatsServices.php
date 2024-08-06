<?php

namespace App\Services;

use App\Models\Offer;
use App\Models\OfferClick;
use Carbon\Carbon;
use App\Http\Traits\DateTrait;
use App\Http\Traits\StatsTrait;
use Illuminate\Support\Facades\DB;

class AdminStatsServices {

    use DateTrait, StatsTrait;

    public function getAllPublisherStats($request) {

        $dates = $this->getDateValues($request);

        $publisherData = $this->getPubStatsByDate($dates["startDate"], $dates["endDate"]);

        return [
            'affiliateData' => $publisherData['publisherStats'],
            'totals'        => $publisherData['totals'],
            'clicks'        => $publisherData['clicks']
        ];

    }

    public function getAllOfferStats($request) {

        $dates = $this->getDateValues($request);

        $offerData = $this->getOfferStatsByDate($dates["startDate"], $dates["endDate"]);

        return [
            'affiliateData' => $offerData['offerStats'],
            'totals'        => $offerData['totals'],
        ];
    }

    private function getPubStatsByDate($startDate, $endDate) {
        $totalsArray = array();
        $publisherStats = array();

        if ($startDate && $endDate) {
            $clicks = OfferClick::whereBetween( 'offer_clicks.created_at', [ $startDate, $endDate ] )
                                ->leftJoin( 'users', 'users.id', '=', 'offer_clicks.referral_id' )
                                ->leftJoin( 'offers', 'offers.id', '=', 'offer_clicks.offer_id' )
                                ->leftJoin( 'purchases', 'purchases.offer_click_id', '=', 'offer_clicks.id' )
                                ->select( 'users.username', 'offer_clicks.is_unique', 'offers.user_id',
                                    'offer_clicks.referral_id', 'purchases.purchase_amount' )
                                ->get();
        } else {
            $clicks = OfferClick::leftJoin( 'users', 'users.id', '=', 'offer_clicks.referral_id' )
                                ->leftJoin( 'offers', 'offers.id', '=', 'offer_clicks.offer_id' )
                                ->leftJoin( 'purchases', 'purchases.offer_click_id', '=', 'offer_clicks.id' )
                                ->select( 'users.username', 'offer_clicks.is_unique', 'offers.user_id',
                                    'offer_clicks.referral_id', 'purchases.purchase_amount' )
                                ->get();
        }


        if (count($clicks) > 0) {
            $publisherStats = $this->groupStatsByUser( $clicks );
            $totalsArray    = $this->sumTotals( $totalsArray, null, $publisherStats );
        }

        return [
            'publisherStats'    => $publisherStats,
            'totals'            => $totalsArray,
            'clicks'            => $clicks
        ];
    }

    private function getOfferStatsByDate($startDate, $endDate) {

        $offerArray = array();
        $totalsArray = array();
        $offers = Offer::where('published', true)->get();

        foreach ($offers as $offer) {

            $payout = 0.00;
            $conversionCount = 0;

            $offerClicks = $offer
                ->OfferClicks()
                ->whereBetween('offer_clicks.created_at', [ $startDate, $endDate ])
                ->leftJoin('purchases', 'purchases.offer_click_id', '=', 'offer_clicks.id')
                ->leftJoin('courses', 'courses.id', '=', DB::raw($offer->course_id))
                ->select('offer_clicks.is_unique', 'offer_clicks.referral_id', 'purchases.purchase_amount', 'courses.title')
                ->get();

            if (count($offerClicks) > 0) {
                $payout = $this->calculatePayout($offerClicks, $offer->price, $offer->user_id);
                $conversionCount = $this->countConversions($offerClicks->toArray());

                $count = $offerClicks->countBy(function ($click) {
                    return $click['is_unique'];
                })->toArray();

                $object = [
                    'name'              => $offerClicks[0]->title,
                    'rawCount'          => array_key_exists(0, $count) ? $count[0] : 0,
                    'uniqueCount'       => array_key_exists(1, $count) ? $count[1] : 0,
                    'conversionCount'   => $conversionCount,
                    'payout'            => $payout,
                    'offerclicks'       => $offerClicks
                ];

                $totalsArray = $this->sumTotals($totalsArray, $object, null);
                array_push( $offerArray, $object );
            }
        }

        return [
            'offerStats'    => $offerArray,
            'totals'        => $totalsArray,
        ];
    }
}
