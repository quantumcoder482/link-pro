<?php

namespace App\Listeners;

use App\Events\UserLoggedIn;
use App\Models\UserIpAddress;
use Illuminate\Auth\Events\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Auth\Events\Authenticated;
use App\Http\Traits\UserTrait;

class LogUserIpAddressLoginListener implements ShouldQueue
{
    use UserTrait;
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    public function handle(UserLoggedIn $event): void
    {
        $user = $event->user;
        $position = $event->userLocation;

        if ($position) {

            $data = [
                'ip'          => $position->ip,
                'countryName' => $position->countryName ?? NULL,
                'countryCode' => $position->countryCode ?? NULL,
                'regionName'  => $position->regionName ?? NULL,
                'regionCode'  => $position->regionCode ?? NULL,
                'cityName'    => $position->cityName ?? NULL,
                'zipCode'     => $position->zipCode ?? NULL,
                'postalCode'  => $position->postalCode ?? NULL,
                'latitude'    => $position->latitude ?? NULL,
                'longitude'   => $position->longitude ?? NULL,
                'isoCode'     => $position->isoCode ?? NULL,
                'timezone'    => $position->timezone ?? NULL,
                'metroCode'   => $position->metroCode ?? NULL,
                'areaCode'    => $position->areaCode ?? NULL,
                'user_id'     => $user->id
            ];
        } else {
            $data = [
                'ip'          => "0.0.0.0",
                'user_id'     => $user->id
            ];
        }

        UserIpAddress::create($data);

        $activeUserSub = $this->getUserSubscriptions($user);
        if ($activeUserSub) {
            $this->checkIfUserSubExpired($activeUserSub, $user);
        }
    }
}
