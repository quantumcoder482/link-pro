<?php

namespace App\Http\Traits;

use App\Models\Folder;
use App\Models\Page;
use Carbon\Carbon;

trait UserTrait
{

    public function getUserSubscriptions($user)
    {

        return $user->subscriptions()->first();
    }

    public function getUserPages($user)
    {

        return $user->pages()->get();
    }

    public function getDefaultUserPage($user)
    {

        return $user->pages()->where('default', true)->pluck('name');
    }

    /**
     * @param $user
     *
     * @return void
     */
    public function enableUsersPages($user): void
    {
        $pages = $user->pages()->get();

        foreach ($pages as $page) {
            if (!$page->default) {
                $page->disabled = false;
                $page->save();
            }
        }
    }

    /**
     * @param $user
     *
     * @return bool
     */
    public function checkUserSubscription($user): bool
    {

        $userSub = $this->getUserSubscriptions($user);

        if (empty($userSub) || ($userSub->ends_at && $userSub->ends_at < Carbon::now())) {
            return false;
        }

        return true;
    }

    /**
     * @param mixed $subscription
     * @param mixed $user
     * 
     * @return void
     */
    public function checkIfUserSubExpired($subscription, $user): void
    {
        if ($subscription->ends_at && $subscription->ends_at < Carbon::now() && !$subscription->downgraded) {
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

            $subscription->update([
                'name'          => 'free',
                'downgraded'    => true,
                'sub_id'        => NULL
            ]);
        }
    }

    /**
     * @param $user
     * @param $defaultPage
     * @param $plan
     *
     * @return void
     */
    public function updateUserPages($user, $defaultPage, $plan): void
    {

        $userPages = $this->getUserPages($user);
        if (count($userPages) > 1) {
            foreach ($userPages as $userPage) {

                if ($plan == "premier") {
                    if ($userPage->disabled) {
                        $userPage->disabled = false;
                        $userPage->save();
                    }
                }

                if ($plan == "pro") {

                    if ($defaultPage && $defaultPage == $userPage->id) {
                        $userPage->default  = true;
                        $userPage->disabled = false;
                        $user->update(['username' => $userPage->name]);
                    } else if (!$defaultPage && !$userPage->default) {
                        $userPage->disabled = true;
                    } else if ($defaultPage) {
                        $userPage->default  = false;
                        $userPage->disabled = true;
                    }

                    $userPage->save();
                }
            }
        }
    }

    /**
     * @param $user
     * @param $defaultPage
     *
     * @return void
     */
    public function updateUserDefaultPage($user, $defaultPage): void
    {
        $userPages = $this->getUserPages($user);

        foreach ($userPages as $userPage) {
            if ($defaultPage == $userPage->id && !$userPage->default) {
                $userPage->default  = true;
            }

            if ($defaultPage != $userPage->id && $userPage->default) {
                $userPage->default  = false;
            }

            $userPage->save();
        }
    }
}
