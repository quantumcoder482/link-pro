<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use App\Notifications\WelcomeCourseNotification;
use App\Services\CourseRegisterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Honeypot\Honeypot;

class CourseRegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    /**
     * @param Request $request
     * @param User $user
     * @param Course $course
     * @param Honeypot $honeypot
     *
     * @return Response
     */
    public function show(Request $request, User $user, Course $course, Honeypot $honeypot): Response {

        $clickInfo = $request->all();

        return Inertia::render( 'Register/CourseRegister' )->with( [
            'course'    => $course,
            'clickInfo' => $clickInfo,
            'creator'   => $user->username,
            'honeypot'  => $honeypot,
        ]);
    }


    /**
     * @param Request $request
     * @param CourseRegisterService $courseRegisterService
     *
     * @return JsonResponse
     */
    public function store(Request $request, CourseRegisterService $courseRegisterService): JsonResponse {

        $response = $courseRegisterService->verify($request);

        if ($response['success']) {
            $data = $request->all();
            $user = $courseRegisterService->create( $data );

            $user->assignRole( 'course.user' );
            Auth::login( $user );

            $course = Course::where( 'id', $data['course_id'] )->select( 'title', 'slug', 'logo', 'header_color',
                'header_text_color' )->first();

            $userData = [
                'username' => $user->username,
                'creator'  => $data['course_creator'],
                'course'   => $course
            ];

            $user->notify( new WelcomeCourseNotification( $userData ) );
            $checkoutUrl = config( 'app.url' ) . '/' . $user->username . '/course-page/' . $course->slug . '?a=' . $request->get( 'a' ) . '&cid=' . $request->get( 'cid' ) . '&section=checkout';

            return response()->json( [
                'success'   => $response['success'],
                'url'       => $checkoutUrl
            ] );
        }

        return response()->json( [
            'success' => $response['success'],
            'errors'  => $response['errors']
        ] );
    }

}
