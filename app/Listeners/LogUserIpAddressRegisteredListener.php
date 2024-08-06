<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Stevebauman\Location\Facades\Location;

class LogUserIpAddressRegisteredListener implements ShouldQueue
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
     *
     * @param Registered $event
     *
     * @return void
     *
     */
    public function handle(Registered $event): void
    {
        $user = $event->user;
        if ($user) {
            if ($position = Location::get()) {
                $user->country_code = $position->countryCode;
                $user->save();
            }
        }
    }
}
