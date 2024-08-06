<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Session;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];


    /**
     * @param $request
     * @param Throwable $e
     *
     * @return Response|JsonResponse|\Symfony\Component\HttpFoundation\Response|RedirectResponse
     * @throws Throwable
     */
    public function render($request, Throwable $e): Response|JsonResponse|\Symfony\Component\HttpFoundation\Response|RedirectResponse {
        $response = parent::render($request, $e);

        //! app()->environment(['local', 'testing']) &&
        if (in_array($response->status(), [500, 503, 404, 403])) {
            return Inertia::render('Error/Index', ['status' => $response->status()])
                          ->toResponse($request)
                          ->setStatusCode($response->status());
        } elseif ($response->status() === 419) {
            return back()->with([
                'message' => 'The page expired, please try again.',
            ]);
        }

        return $response;
    }

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    /*public function register()
    {

        $this->renderable(function (\Exception $e) {
            if ($e->getPrevious() instanceof \Illuminate\Session\TokenMismatchException) {
                if(isset($_GET['creator']) || !empty(Session::get('creator'))) {
                    $creator = isset($_GET['creator']) ? $_GET['creator'] : Session::get('creator');
                    return redirect( '/' . $creator . '/course/login' );
                } else {
                    return redirect()->route('login');
                }
            };
        });

        $this->reportable(function (Throwable $e) {
            //
        });
    }*/
}
