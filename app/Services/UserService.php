<?php /** @noinspection PhpVoidFunctionResultUsedInspection */

/** @noinspection MissingParameterTypeDeclarationInspection */


namespace App\Services;

use App\Notifications\NotifyAboutUnsubscribe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Traits\BillingTrait;
use App\Http\Traits\UserTrait;
use Mchev\Banhammer\IP;

class UserService {

    use BillingTrait, UserTrait;

    private $user;

    /**
     *
     */
    public function __construct() {
        $this->user = Auth::user();

        return $this->user;
    }

    /*
     * Update user password and/or email
     *
     * @return void
     *
     */

    /**
     * @param $request
     *
     * @return void
     */
    public function updateUserInfo($request): void {

        if ($request->password) {
            $this->user->password = Hash::make($request->password);
        }

        if ($request->email) {
            $this->user->email = $request->email;
        }

        $this->user->save();
    }

    /**
     * @param $user
     *
     * @return array
     */
    public function handleEmailSubscription($user): array {

        $action = $_GET["action"];

       if ($action == "unsubscribe") {
           $user->email_subscription = false;
           $user->save();

           $data = [
               "subscribed" => false,
               "message" => "You have been unsubscribed from our email notifications..."
           ];

           $userData = ([
               'subject' => 'You have been UnSubscribed',
               'userID'  => $user->id,
           ]);

           $user->notify(new NotifyAboutUnsubscribe($userData));

       } else {
           $user->email_subscription = true;
           $user->save();

           $data = [
               "subscribed" => true,
               "message" => "Thank you for subscribing!"
           ];
       }

       return $data;
    }

    public function banUser($user, $request): void {
        $user->ban([
            'metas' => ['user_agent' => $request->header('user-agent')],
        ]);
    }
    public function banIP($userLoginInfo, $request): void {
        IP::ban(
            $userLoginInfo->ip,
            ['user_agent' => $request->header('user-agent')]
        );
    }

    public function disableUserPages($user): void {
        $userPages = $this->getUserPages($user);
        if($userPages) {
            foreach($userPages as $page) {
                $page->disabled = true;
                $page->save();
            }
        }
    }

    public function activateUserPages($user): void {
        $userPages = $this->getUserPages($user);
        if ($userPages) {
            foreach ( $userPages as $page ) {
                $page->disabled = false;
                $page->save();
            }
        }
    }

    /**
     * @param $user
     *
     * @return void
     */
    public function disableUserOffers($user): void {
        $userOffers = $user->Offers()->get();
        if ($userOffers) {
            foreach ( $userOffers as $offer) {
                $offer->active = false;
                $offer->save();
            }
        }
    }

    /**
     * @param $user
     *
     * @return void
     */
    public function enableUserOffers($user): void {
        $userOffers = $user->Offers()->get();
        if ($userOffers) {
            foreach ( $userOffers as $offer) {
                $offer->active = true;
                $offer->save();
            }
        }
    }
}
