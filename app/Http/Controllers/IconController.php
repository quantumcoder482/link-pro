<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Offer;
use App\Services\IconService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class IconController extends Controller
{

    /**
     * @return JsonResponse
     */
    public function getAffIcons(): \Illuminate\Http\JsonResponse {

        $iconData = DB::table('offers')
                      ->where('offers.public', '=', true)
                      ->where('offers.active', '=', true)
                      ->where('offers.published', '=', true)
                      ->leftJoin('courses', 'offers.course_id', '=', 'courses.id')
                     /* ->leftJoin('category_course', 'category_course.course_id', '=', 'courses.id')
                      ->leftJoin('categories', 'categories.id', '=', 'category_course.category_id')*/
                      ->leftJoin('landing_pages', 'offers.user_id', '=', 'landing_pages.user_id')
                      ->leftJoin('users', 'offers.user_id', '=', 'users.id')
                      ->select(
                          'offers.icon as path',
                          'offers.id as offer_id',
                          'courses.id as course_id',
                          'courses.title as name',
                          'courses.slug',
                          'users.username as creator',
                      )->orderBy('offer_id')
                      ->get()->toArray();

                      foreach($iconData as $data) {
                          $course = Course::where('id', '=', $data->course_id)->with('categories')->first();
                          $catArray = array();
                          foreach($course["categories"] as $category) {
                               array_push($catArray,strtolower($category->name));
                          }
                          $data->categories =  $catArray;
                      }

        return response()->json([
            'iconData'  => $iconData,
        ]);
    }

    /**
     * @return JsonResponse
     */
    public function getStandardIcons(): JsonResponse {

        $standardIcons = [];
        $iconNames = Storage::disk('s3')->allFiles("icons/");
        foreach($iconNames as $icon) {
            $path = Storage::disk('s3')->url($icon);
            array_push($standardIcons, $path);
        }

        return response()->json([
            'iconData' => $standardIcons,
        ]);
    }

    /**
     * @return JsonResponse
     */
    public function getCustomIcons(): JsonResponse {

        $userID = Auth::id();

        $userIcons = [];
        if (Storage::disk('s3')->exists("custom-icons/" . $userID . "/")) {
            $imageNames = Storage::disk('s3')->allFiles("custom-icons/" . $userID);

            foreach($imageNames as $name) {
                $path = Storage::disk('s3')->url($name);
                array_push($userIcons, $path);
            }
        }

        return response()->json([
            'iconData' => $userIcons,
        ]);
    }

    public function getIcons(IconService $iconService) {

        $icons = $iconService->getIcons();

        dd($icons);

    }
}
