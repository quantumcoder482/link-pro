<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class CustomLoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    //protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Write code on Method
     *
     *
     */
    public function customLogin(Course $course = null)
    {
        return view("auth.login", ['url' => 'course'])->with(['course' => $course]);
    }

    public function customLoginPost(Request $request) {

        $credentials = $request->except(['_token']);
        $login = request()->input('identity');
        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        request()->merge([$field => $login]);
        unset($credentials["identity"]);
        $credentials[$field] = $login;

        if (auth()->attempt($credentials)) {
            return response()->json(['success' => true]);
        }

        return response()->json(['error' => "These credentials do not match our records."]);
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        $login = request()->input('identity');

        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        request()->merge([$field => $login]);

        return $field;
    }

    /**
     * Validate the user login request.
     *
     * @param Request $request
     * @return void
     *
     */
    protected function validateLogin(Request $request): void {
        $messages = [
            'identity.required' => 'Email or username cannot be empty',
            'email.exists' => 'Email or username already registered',
            'username.exists' => 'Username is already registered',
            'password.required' => 'Password cannot be empty',
        ];

        $request->validate([
            'identity' => 'required|string',
            'password' => 'required|string',
            'email' => 'string|exists:users',
            'username' => 'string|exists:users',
        ], $messages);
    }

    public function customRedirect() {
        $user = Auth::user();
        $page = $user->pages()->first()->pluck('id');
        return $page;
    }

    protected function authenticated(Request $request, $user): Application|int|Redirector|\Illuminate\Contracts\Foundation\Application|RedirectResponse {

        $loginURL = url()->previous();
        $roles = $user->getRoleNames();
        $permissions = $user->getPermissionsViaRoles()->pluck('name');
        $courseID = isset($_GET['course']) ? $_GET['course'] : null;
        $course = null;
        if ($courseID) {
            $course = Course::findOrFail($courseID);
            $creator = User::where('id', '=', $course->user_id)->get()->pluck('username');
        }

        Session::put('permissions', $permissions);

        if ($roles->contains('admin')) {

            $previousURL = Session::get( 'url.intended' );

            if ( $previousURL ) {
                return Redirect::intended();
            } else {
                if ($course) {
                    return redirect('/' . $creator[0] . '/course/' . $course->slug);
                } else if (str_contains($loginURL, "admin")) {
                    return redirect( '/admin' );
                } else {
                    return redirect( '/dashboard' );
                }
            }

        } else if ($roles->contains("course.user") && $roles->contains('lp.user')) {

            $previousURL = Session::get( 'url.intended' );
            if ( $previousURL ) {
                return Redirect::intended();
            } else {
                return redirect( '/dashboard' );
            }

        } else if ($roles->contains('lp.user')) {

            $userPages = $user->pages()->get();

            if ( $userPages->isEmpty() ) {
                return redirect()->route( 'create.page' );
            } else {
                $previousURL = Session::get( 'url.intended' );
                if ( $previousURL ) {
                    return Redirect::intended();
                } else {
                    return redirect( '/dashboard' );
                }
            }

        } else if ($roles->contains("course.user")) {

            $previousURL = Session::get('url.intended');
            if ($previousURL) {
                return Redirect($previousURL);
            } else if ($course) {
                return redirect('/' . $creator[0] . '/course/' . $course->slug);
            } else {
                return redirect('/courses');
            }
        } else {
            $userPages = $user->pages()->get();

            if ( $userPages->isEmpty() ) {
                return redirect()->route( 'create.page' );
            }
        }

        return 0;
    }
}
