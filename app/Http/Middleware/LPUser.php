<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\PermissionTrait;

class LPUser
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
            session()->put('url.intended', $request->url());
            return to_route('login');
        }

        $user = Auth::user();

        if ($user->hasAnyRole(['admin', 'lp.user'])) {
            return $next($request);
        }

        if ($user->hasRole('course.user')) {
            return redirect('/courses');
        }

        return $next($request);
    }
}
