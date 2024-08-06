<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use App\Http\Traits\PermissionTrait;

class CourseUser
{

    use PermissionTrait;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            $name = $request->route()->getName();

            session()->put('url.intended', $request->url());
            if ($name == 'live.course.lander' || $name == 'course.checkout') {

                return $next($request);
            }

            $reqUrl = $request->url();
            if (str_contains($reqUrl, "course/")) {
                $data = explode("course/", $reqUrl);
                $path = "/" . $data[1] . '/login';
            } else {
                $path = '/login';
            }

            return redirect($path);
        }

        return $next($request);
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {

            $previousURL = Session::get('url.intended');
            if ($previousURL) {
                return Redirect::intended();
            } else {
                return route('login');
            }
        }
    }
}
