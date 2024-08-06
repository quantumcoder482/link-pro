<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\StatsTrait;
use App\Http\Traits\DateTrait;

class Referral extends Model
{
    use HasFactory, StatsTrait, DateTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'referral_id',
        'subscription_id',
        'plan_id'
    ];

    public $additional_attributes = [
        'referral_count',
        'free_count',
        'pro_count',
        'premier_count'
    ];

    public function users() {
        return $this->belongsTo(User::class);
    }

    public function getUserIDAttribute() {

        $currentURL = url()->full();

        $ref      = Referral::where( 'id', $this->id )->get()->toArray();
        $userID   = $ref[0]["user_id"];
        $user     = User::where( 'id', $userID )->get()->toArray();
        $username = $user["0"]["username"];

        if (str_contains($currentURL, "admin")) {

            return "{$username}";
        }

        return $userID;
    }

    /*public function getReferralIDAttribute() {

        $currentURL = url()->full();

        $ref      = Referral::where( 'id', $this->id )->get()->toArray();
        $userID   = $ref[0]["referral_id"];
        $user     = User::where( 'id', $userID )->get()->toArray();
        $username = $user["0"]["username"];

        if (str_contains($currentURL, "admin")) {

            return "{$username}";
        }

        return $userID;
    }*/

    public function getReferralCountAttribute() {

        $ref      = Referral::where( 'id', $this->id )->get()->toArray();
        $userID   = $ref[0]["user_id"];
        $user     = User::where( 'id', $userID )->get()->toArray();
        $referralCount = count(collect(\App\Models\Referral::where('user_id', $user)->get())->unique('referral_id'));
        return "{$referralCount}";
    }

    public function getProCountAttribute() {

        $dates = $this->getMyDates();

        $ref      = \App\Models\Referral::where( 'id', $this->id )->get()->toArray();
        $userID   = $ref[0]["user_id"];

        if ($dates['startDate'] != null && $dates['endDate'] != null) {
            $count = count(\App\Models\Referral::where('user_id', $userID)->where('plan_id', 'pro')->whereBetween('updated_at', [ $dates['startDate'], $dates['endDate'] ])->get());
        } else {
            $count = count(\App\Models\Referral::where('user_id', $userID)->where('plan_id', 'pro')->get());
        }

        return "{$count}";
    }

    public function getPremierCountAttribute() {

        $dates = $this->getMyDates();

        $ref    = \App\Models\Referral::where( 'id', $this->id )->get()->toArray();
        $userID = $ref[0]["user_id"];

        if ($dates['startDate'] != null && $dates['endDate'] != null) {
            $count  = count( \App\Models\Referral::where( 'user_id', $userID )->where( 'plan_id', 'premier' )->whereBetween('updated_at', [ $dates['startDate'], $dates['endDate'] ])->get());
        } else {
            $count  = count( \App\Models\Referral::where( 'user_id', $userID )->where( 'plan_id', 'premier' )->get() );
        }


        return "{$count}";
    }

    public function getFreeCountAttribute() {

        $dates = $this->getMyDates();

        $ref    = \App\Models\Referral::where( 'id', $this->id )->get()->toArray();
        $userID = $ref[0]["user_id"];

        if ($dates['startDate'] != null && $dates['endDate'] != null) {
            $count  = count( \App\Models\Referral::where( 'user_id', $userID )->where( 'plan_id', null )->whereBetween('updated_at', [ $dates['startDate'], $dates['endDate'] ])->get() );
        } else {
            $count  = count( \App\Models\Referral::where( 'user_id', $userID )->where( 'plan_id', null )->get() );
        }

        return "{$count}";

    }

}
