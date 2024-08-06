<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = null;
        if($request->user()) {
            $user = $request->user()->makeHidden(['mailchimp_token', 'mailchimp_lists', 'mailchimp_server', 'braintree_id', 'permissions', 'roles', 'settings' ]);
        }
        $subscription = null;
        $defaultPage = null;
        $course = $request->route('course');
        $subData = null;

        if($user) {
            $subscription = $user->subscriptions()->first();
            $defaultPage = $request->user()->pages()->where('default', '=', 1)->pluck('id')->first();

            if($subscription) {
                $subData = [
                    'name'          => $subscription->name,
                    'created_at'    => Carbon::parse($subscription->created_at),
                    'ends_at'       => $subscription->ends_at,
                    'status'        => $subscription->status,
                    'sub_id'        => $subscription->sub_id,
                ];
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => [
                    'userInfo'      => $user,
                    'permissions'   => $user ? $user->getAllPermissions()->pluck('name') : null,
                    'roles'         => $user ? $user->getRoleNames() : null,
                    'subscription'  => $subData,
                    'courseData'    => $course,
                    'defaultPage'   => $defaultPage
                ],
                'env' => App::environment()
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
