<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\CoursePasswordReset;
use App\Notifications\CoursePasswordResetSuccess;
use App\Notifications\WelcomeCourseNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CoursePasswordController extends Controller
{

    public function showResetPassword(User $user) {
        $landingPageData = $user->LandingPages()->first();

        return view('auth.passwords.email-course')->with(['landingPageData' => $landingPageData, 'username' => $user->username]);
    }

    public function sendResetCoursePassword(Request $request) {

        $email = $request->email;
        $user = User::where('email', '=', $email)->first();
        $creator = $request->creator;
        $token = $request->_token;

        if (!$user) {
            return redirect()->back()->withErrors(['email' => trans('User does not exist')]);
        }

        //Create Password Reset Token
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        //Get the token just created above
        /*$tokenData = DB::table('password_resets')
                       ->where('email', $request->email)->first();*/

        if ($this->sendResetEmail($email, $token, $creator, $user)) {
            return redirect()->back()->with('status', trans('A reset link has been sent to your email address.'));
        } else {
            return redirect()->back()->withErrors(['error' => trans('A Network Error occurred. Please try again.')]);
        }

    }

    private function sendResetEmail($email, $token, $creator, $user) {
        //Retrieve the user from the database
        $userEmail = User::where('email', $email)->pluck('email')->first();
        $landingPageData = User::where('username', $creator)->first()->LandingPages()->first();

        //Generate, the password reset link. The token generated is embedded in the link
        $link = config('app.url') . '/' . $creator . '/password/reset/?t=' . $token . '&email=' . urlencode($userEmail);
        $userData = [
            'creator' => $creator,
            'landingPageData' => $landingPageData,
            'link' => $link
        ];

        try {
            $user->notify(new CoursePasswordReset($userData));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function showPasswordUpdate(User $user, Request $request) {
        $landingPageData = $user->LandingPages()->first();
        $email = $request->email;
        $token = $request->t;
        $creator = $user->username;

        return view('auth.passwords.reset-course')->with(compact('landingPageData', 'email', 'token', 'creator'));
    }

    public function resetCoursePassword(Request $request) {
        //Validate input
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|confirmed',
            'token' => 'required' ]);

        //check if payload is valid before moving on
        if ($validator->fails()) {
            return redirect()->back()->withErrors(['email' => 'Please complete the form']);
        }

        $password = $request->password;
        $creator = $request->creator;

        // Validate the token
        $tokenData = DB::table('password_resets')
                       ->where('token', $request->token)->first();

        // Redirect the user back to the password reset request form if the token is invalid
        if (!$tokenData) return view('auth.passwords.email-course');

        $user = User::where('email', $tokenData->email)->first();

        //Redirect the user back if the email is invalid
        if (!$user) return redirect()->back()->withErrors(['email' => 'Email not found']);

        //Hash and update the new password
        $user->password = Hash::make($password);
        $user->update(); //or $user->save();

        //Delete the token
        DB::table('password_resets')->where('email', $user->email)->delete();

        //Send Email Reset Success Email
        if ($this->sendSuccessEmail($user, $creator)) {
            //login the user immediately they change password successfully
            Auth::login($user);
            return redirect('/' . $creator . '/courses');
        } else {
            return redirect()->back()->withErrors(['email' => trans('A Network Error occurred. Please try again.')]);
        }

    }

    private function sendSuccessEmail($user, $creatorUsername) {

        $creator = User::where('username', $creatorUsername)->first();
        $landingPageData = $creator->LandingPages()->first();

        $userData = [
            'creator' => $creatorUsername,
            'landingPageData' => $landingPageData,
        ];

        try {
            $user->notify(new CoursePasswordResetSuccess($userData));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
