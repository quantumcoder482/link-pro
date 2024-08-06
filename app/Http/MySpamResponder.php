<?php
namespace App\Http;
use Inertia\Inertia;
use Spatie\Honeypot\SpamResponder\SpamResponder;
use Closure;
use Illuminate\Http\Request;

class MySpamResponder implements SpamResponder {

    public function respond(Request $request, Closure $next){

        if (str_contains($request->getPathInfo(), 'course')) {
            return response()->json( [
                'success'       => false,
                'spamDetected'  => true
            ] );
        }
        if (str_contains($request->getPathInfo(), 'contact')) {
            return Inertia::render('Contact/Contact', [
                'spamDetected' => true
            ]);
        }
        if (str_contains($request->getPathInfo(), 'register')) {
            return Inertia::render('Auth/Register', [
                'spamDetected' => true
            ]);
        }
        //return $next($request);
    }
}
