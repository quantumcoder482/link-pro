<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OfferService {

    public function updateOfferIcon($request, $userID, $offer) {

        $imgName = time() . '.' .  $request->ext;
        $pathToFolder = 'offer-images/' . $userID . '/' . $offer->id . '/icon/';
        $path = $pathToFolder . $imgName;

        $files = Storage::disk('s3')->allFiles($pathToFolder);
        Storage::disk('s3')->delete($files);

        Storage::disk('s3')->copy(
            $request->icon,
            str_replace($request->icon, $path, $request->icon)
        );

        $amazonPath = Storage::disk('s3')->url($path);

        $offer->update(['icon' => $amazonPath]);

        return $amazonPath;
    }

    public function updateOfferData($offer, $request) {

        $keys = collect($request->all())->keys();

        $value = $request[$keys[0]];

        $offer->update([
            $keys[0] => $request[$keys[0]]
        ]);

        if ($keys[0] == "public") {
            if ($value == 1) {
                $message = "Offer is now public";
            } else {
                $message = "Offer is now private";
            }
        } elseif ($keys[0] === "active") {
            if ($value == 1) {
                $message = "Offer is now active";
            } else {
                $message = "Offer has been deactivated";
            }
        } else {
            $message = $keys[0] .  " Updated";
        }

        return $message;
    }

    public function publishOffer($offer) {

        if ($offer->icon !== null && $offer->price !== null) {
            $offer->update([
                "published" => true,
            ]);
            return true;
        } else {
            return false;
        }
    }

    public function getOffers($user) {

        return DB::table('courses')->join('offers', function ($join) use($user){
            $join->on('course_id', '=', 'courses.id')->where('offers.user_id', '=', $user->id);
        })->select(
            'courses.slug',
            'courses.title',
            'offers.id',
            'offers.course_id',
            'offers.price',
            'offers.public as public_offer',
            'offers.active',
            'offers.published'
        )->get()->toArray();
    }
}
