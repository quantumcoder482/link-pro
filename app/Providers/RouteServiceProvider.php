<?php

namespace App\Providers;

use App\Models\Course;
use App\Models\Page;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard/pages/';
    //public const HOME = '/dashboard';
    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });

        Route::bind('page', function($value) {
            return Page::where('name', $value)->orWhere(function ($query) use ($value) {
                if (is_numeric($value)) {
                    $query->where('id', $value);
                }
            })->firstOrFail();

        });

        Route::bind('course', function($value) {
            return Course::where('slug', $value)->orWhere(function ($query) use ($value) {
                if (is_numeric($value)) {
                    $query->where('id', $value);
                }
            })->first();
        });
    }
}
