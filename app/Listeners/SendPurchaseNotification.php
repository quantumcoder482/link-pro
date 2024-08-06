<?php

namespace App\Listeners;

use App\Events\PurchasedItem;
use App\Models\Purchase;
use App\Notifications\CoursePurchasedNotification;
use App\Notifications\WelcomeCourseNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SendPurchaseNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     * @param PurchasedItem $event
     *
     * @return void
     */
    public function handle(PurchasedItem $event): void
    {
        $user = Auth::user();
        $offerClickId = $event->purchase->offer_click_id;

        $purchasedItem = Purchase::where('offer_click_id', $offerClickId)
                                 ->leftJoin('courses', 'courses.id', '=', 'purchases.course_id')
                                 ->leftJoin('users', 'users.id', '=', 'courses.user_id')
                                 ->select('courses.title', 'courses.slug', 'courses.logo', 'courses.header_color', 'courses.header_text_color', 'users.username')->first();

        /*Log::channel( 'cloudwatch' )->info( "-- event --" .
                                            print_r($event) .
                                            "-- offerClickId--" .
                                            $offerClickId
        );*/
        $userData = [
            'username'  => $user->username,
            'creator'   => $purchasedItem["username"],
            'course'    => $purchasedItem
        ];

        $user->notify(new CoursePurchasedNotification($userData));

        //return $purchasedItem;
    }
}
