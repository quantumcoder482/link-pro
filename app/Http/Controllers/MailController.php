<?php

namespace App\Http\Controllers;
use App\Mail\WelcomeMail;
use App\Models\Subscription;
use App\Models\User;
use App\Notifications\NotifyAboutCancelation;
use App\Notifications\NotifyAboutFreeTrial;
use App\Notifications\NotifyAboutResumeSub;
use App\Notifications\NotifyAboutSocialShare;
use App\Notifications\NotifyAboutUpgrade;
use App\Notifications\NotifyInactiveUser;
use Carbon\Carbon;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class MailController extends Controller
{
    public function sendEmail() {

        //Mail::to('mcirami@gmail.com')->send(new WelcomeMail());

        /*return (new MailMessage)
            ->subject('Welcome To Link Pro!')
            ->markdown('emails.share', ['data' => ['username' => 'mcirami', 'link' => 'mcirmai5', 'siteUrl' => 'http://0.0.0.0', 'plan' => 'Premier', 'billingDate' => null, 'userID' => 5] ]);
        *///return new WelcomeMail();

        $user = User::where('id', 8)->get();
        $sub = Subscription::where('user_id', $user[0]->id)->get();
        $date = date_create($sub[0]->ends_at)->format( 'F j, Y' );

        $userData = ([
            'end_date'    => $date,
            'userID'  => $user[0]->id,
        ]);

        $user[0]->notify( new NotifyAboutCancelation( $userData ) );
    }
}
