<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        $user = Auth::user();
        if($user) {
            $roles = $user->getRoleNames();
            if ( $roles->contains( 'course.user' ) && ! $roles->contains( 'lp.user' ) ) {
                return to_route( 'all.courses' );
            }
        }

        foreach ( $guards as $guard ) {
            if ( Auth::guard( $guard )->check() ) {
                return to_route( 'dashboard' );
            }
        }

        return $next($request);
    }
}
