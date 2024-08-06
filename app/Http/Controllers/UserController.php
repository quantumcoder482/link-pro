<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\Purchase;
use App\Services\StatsServices;
use App\Services\UserService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use App\Http\Traits\UserTrait;
use Inertia\Response;
use App\Http\Traits\BillingTrait;
use Stripe\Exception\ApiErrorException;
use Mchev\Banhammer\IP;

class UserController extends Controller
{
    use UserTrait, BillingTrait;

    /**
     * @param User $user
     *
     * @return Application|Factory|View
     */
    public function show(User $user): View|Factory|Application {
        $user->load('links');

        return view('users.show', [
            'user' => $user
        ]);
    }

    /**
     *
     * @return Response
     */
    public function edit(): Response {

        $user = Auth::user();
        $hasOffers = $user->offers()->first();
        $isAffiliate = $user->Affiliates()->first();
        $payoutInfoSubmitted = $user->payout_info_submitted;

        $statsService = new StatsServices();
        $data = $statsService->getAllOfferStats(['clear' => true]);
        $total = 0;
        if (!empty($data['totals'])) {
            $total = $data['totals']['totalPayout'];
        }

        return Inertia::render('User/User')->with(compact('hasOffers', 'isAffiliate', 'payoutInfoSubmitted', 'total'));
    }

    /**
     * @param UpdateUserRequest $request
     * @param UserService $userService
     */
    public function updateAccountInfo(UpdateUserRequest $request, UserService $userService): void {

        $userService->updateUserInfo($request);
    }

    /**
     * @param User $user
     * @param UserService $userService
     *
     * @return Application|Factory|View
     */
    public function emailSubscription(User $user, UserService $userService): View|Factory|Application {

        $data = $userService->handleEmailSubscription($user);

        return view(
            'users.emailSubscription', [
                'siteURL'       => URL::to('/') . "/",
                'message'       => $data["message"],
                'userID'        => $user['id'],
                'subscribed'    => $data['subscribed']
                ]
        );
    }

    /**
     * @return JsonResponse
     */
    public function getAllUserPages(): JsonResponse {
        $user = Auth::user();

        $pages = $this->getUserPages($user);

        return response()->json(['success' => true, 'pages' => $pages]);
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function paymentOnboarding(): \Symfony\Component\HttpFoundation\Response {
        $stripe     = $this->createStripeGateway();
        $domain     = config('app.url');
        $user = Auth::user();
        $response = "";
        try {

            $account = $stripe->accounts->create([
                'email' => $user->email,
                'controller' => [
                    'stripe_dashboard' => [
                        'type' => 'express',
                    ],
                    'fees' => [
                        'payer' => 'application'
                    ],
                    'losses' => [
                        'payments' => 'application'
                    ],
                ],
            ]);
            $response = $stripe->accountLinks->create([
                'account' => $account->id,
                'refresh_url' => $domain . '/edit-account',
                'return_url' => $domain . '/onboarding-success',
                'type' => 'account_onboarding',
            ]);

        } catch ( ApiErrorException $e ) {
            $this->saveErrors($e);
            http_response_code(500);
            $data = [
                "success" => false,
                "message" => 'An error occurred with the message: ' . $e
            ];
            //echo json_encode(['error' => $e->getMessage()]);
        }

        return response()->json(['success' => true, 'url' => $response->url]);
    }

    /**
     * @return Response
     */
    public function onboardingSuccess(): Response {
        $user = Auth::user();
        $user->update([
            'payout_info_submitted' => true
        ]);

        return Inertia::render('Onboarding/Success');
    }

    public function banUserByType(Request $request, User $user, UserService $userService): JsonResponse {
        $userLoginInfo = $user->UserIpAddress()->latest()->first();

        if($userLoginInfo) {
            $banType = $request->get("banType");

            if ($banType == "user") {
                $userService->banUser($user, $request);
            }

            if ($banType == "ip") {
                $userService->banIP($userLoginInfo, $request);
            }

        } else {
            $user->ban();
        }

        $userService->disableUserPages($user);
        $userService->disableUserOffers($user);

        return response()->json([
            'success' => true,
        ]);
    }

    public function unBanUser(Request $request, User $user, UserService $userService): JsonResponse {
        $userLoginInfo = $user->UserIpAddress()->latest()->first();

        if ($user->isBanned()){
            $user->unban();
        } else {
            IP::unban($userLoginInfo->ip);
        }

        $userService->activateUserPages($user);
        $userService->enableUserOffers($user);

        return response()->json([
            'success' => true,
        ]);
    }
}
