<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use MailchimpMarketing\ApiClient;

class MailchimpController extends Controller
{

    public function auth() {
        return Socialite::driver('mailchimp')->redirect();
    }

    public function callback() {

        try {

            $mailchimpUser = Socialite::driver('mailchimp')->user();
            $token = $mailchimpUser->accessTokenResponseBody["access_token"];
            $dc = $mailchimpUser->user["dc"];

            $mailchimp = new ApiClient();
            $mailchimp->setConfig([
                'accessToken' => $token,
                'server' => $dc
            ]);

            $response = $mailchimp->lists->getAllLists();
            $lists = $response->lists;

            $listArray = [];

            foreach($lists as $list) {

                $listObject = [
                    'list_id' => $list->id,
                    'list_name' => $list->name
                ];

                array_push($listArray, $listObject);
            }

            $user = Auth::user();

            $user->update([
                'mailchimp_token' => $token,
                'mailchimp_server' => $dc,
                'mailchimp_lists' => json_encode($listArray)
            ]);

            $pageId = "";
            if(isset($_COOKIE['lp_page_id'])) {
                $pageId = $_COOKIE['lp_page_id'];
            }

            return redirect()->route('pages.edit', ['page' => $pageId, 'redirected' => "mailchimp"]);

        } catch (\Throwable $th) {

            Log::channel( 'cloudwatch' )->info( "--timestamp--" .
                                                Carbon::now() .
                                                "-- kind --"
                                                . "MailChimp Connection" .
                                                "-- Error Message -- " .
                                                $th->getMessage()
            );

            $pageId = "";
            if(isset($_COOKIE['lp_page_id'])) {
                $pageId = $_COOKIE['lp_page_id'];
            }

            return redirect()->route('pages.edit', ['page' => $pageId, 'redirected' => "mailchimp", "connection_error" => 'Something went wrong connecting to Mailchimp! Please try again.']);
        }
    }

    public function getLists() {

        $user = Auth::user();

        return response()->json( ['lists' => json_decode($user->mailchimp_lists)]);
    }

    public function subscribeToList(Request $request) {

        request()->validate(['email' => 'required|email']);

        $email = $request->email;
        $listId = $request->listId;
        $user = User::findOrFail($request->user);

        $mailchimp = new ApiClient();

        $mailchimp->setConfig([
            'accessToken' => $user->mailchimp_token,
            'server' => $user->mailchimp_server
        ]);

        $response = $mailchimp->lists->addListMember($listId, [
            'email_address' => $email,
            'status' => 'pending'
        ]);

        return response()->json(['success' => true, 'mcResponse' => $response]);
    }

    public function removeConnection() {
        $user = Auth::user();

        $user->update([
            'mailchimp_server'  => null,
            'mailchimp_token'   => null,
            'mailchimp_lists'   => null
        ]);

        $links = $user->links()->where('mailchimp_list_id', '!=', null)->get();
        foreach ($links as $link) {
            $link->update([
                'mailchimp_list_id' => null,
                'active_status' => 0
            ]);
        }
    }
}
