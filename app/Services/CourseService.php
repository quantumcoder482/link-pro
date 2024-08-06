<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Link;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseService {

    /**
     * @param $user
     *
     * @return mixed
     */
    public function getCourses($user): mixed {

        return $user->Offers()
                    ->where('published', '=', true)
                    ->leftJoin("courses", "offers.course_id", "=", "courses.id")
                    ->select('courses.id', 'courses.title', 'courses.slug')
                    ->get()->toArray();
    }

    /**
     * @param $course
     *
     * @return mixed
     */
    public function getCourseData($course): mixed {
        $courseData = $course->attributesToArray();
        $sections = $course->CourseSections()->orderBy('position', 'asc')->get()->toArray();
        $courseCategory = $course->categories()->orderBy('id', 'desc')->get();
        if(count($courseCategory) > 0) {
            $courseData["category"] = $courseCategory[0]["id"];
        }

        $sectionArray = [];
        if (!empty($sections)) {
            foreach ( $sections as $index => $section ) {
                $object = [
                    "name" => $section["type"] . "_" . $index + 1,
                ];
                $merged = array_merge( $section, $object );
                array_push( $sectionArray, $merged );
            }

            $courseData["sections"] = $sectionArray;
        } else {
            $courseData["sections"] = [];
        }

        return $courseData;
    }

    public function getCourseOfferData($course) {

        return $course->Offer()->first();
    }

    public function saveCourseData($course, $request): array {
        $keys = collect($request->all())->keys();
        $slug = null;

        if($keys[0] == "category") {
            $this->saveCourseCategory($course, $request[$keys[0]]);
        } else {
            $course->update([
                $keys[0] => $request[$keys[0]]
            ]);
        }

        if ($keys[0] == "title") {
            $slug = Str::slug($request[$keys[0]], '-');
            $course->update([
                'slug' => $slug,
            ]);

            $this->updateCourseLinks($course, $request[$keys[0]]);
        }

        return [
            "key" => $keys[0],
            "slug" => $slug
        ];
    }

    /**
     * @param $userID
     * @param $request
     * @param $key
     * @param $course
     *
     * @return string
     */
    public function saveCourseImage($userID, $request, $key, $course): string {
        $imgName = time() . '.' . $request->ext;
        $pathToFolder = 'courses/' . $userID . '/' . $course->id . '/' . $key . '/';
        $path = $pathToFolder . $imgName;

        $files = Storage::disk('s3')->allFiles($pathToFolder);
        Storage::disk('s3')->delete($files);

        Storage::disk('s3')->copy(
            $request->$key,
            str_replace($request->$key, $path, $request->$key)
        );

        $imagePath = Storage::disk('s3')->url($path);

        $course->update([$key => $imagePath]);

        return $imagePath;

    }

    /**
     * @param $userID
     * @param $request
     * @param $key
     * @param $section
     *
     * @return string
     */
    public function saveSectionImage($userID, $request, $key, $section ): string {
        $imgName = time() . '.' . $request->ext;

        $pathToFolder = 'courses/' . $userID . '/' . $section->course_id . '/sections/' . $section->id . '/';
        $path =  $pathToFolder . $imgName;

        $files = Storage::disk('s3')->allFiles($pathToFolder);
        Storage::disk('s3')->delete($files);

        Storage::disk('s3')->copy(
            $request->$key,
            str_replace($request->$key, $path, $request->$key)
        );

        $imagePath = Storage::disk('s3')->url($path);

        $section->update(['image' => $imagePath]);

        return $imagePath;
    }

    /**
     * @param $course
     * @param $userID
     * @param $request
     *
     * @return mixed
     */
    public function addCourseSection($course, $userID, $request): mixed {

        $sectionCount = $course->CourseSections()->count();
        if ($sectionCount > 0) {
            $position = $sectionCount;
        } else {
            $position = 0;
        }

        return $course->CourseSections()->create([
           'user_id'    => $userID,
           'type'       => $request->type,
           'position'   => $position,
           'button'     => $request->type === "file" ? 1 : 0,
           'lock_video' => $request->type === "video" ? true : null
        ])->fresh();
    }

    /**
     * @param $section
     * @param $request
     *
     * @return mixed
     */
    public function saveSectionData($section, $request): mixed {
        $keys = collect($request->all())->keys();

        $section->update([
            $keys[0] => $request[$keys[0]]
        ]);

        return $keys[0];
    }

    /**
     * @param $userID
     * @param $request
     * @param $key
     * @param $section
     *
     * @return string
     */
    public function saveSectionFile($userID, $request, $key, $section ): string {

        $name = $request->get('name') ? $request->get('name') : time(); ;
        $fileName = $name . '.' . $request->ext;
        $pathToFolder = 'courses/' . $userID . '/' . $section->course_id . '/sections/' . $section->id . '/';
        $path =  $pathToFolder . $fileName;

        $files = Storage::disk('s3')->allFiles($pathToFolder);
        Storage::disk('s3')->delete($files);

        Storage::disk('s3')->copy(
            $request->$key,
            str_replace($request->$key, $path, $request->$key)
        );

        $filePath = Storage::disk('s3')->url($path);

        $section->update(['file' => $filePath]);

        return $filePath;
    }

    /**
     * @param $authUserID
     *
     * @return mixed
     */
    public function getUnpurchasedCourses($authUserID): mixed {
        $courses = Course::whereDoesntHave('purchases',
            function (Builder $query)  use($authUserID) {
            $query->where('user_id', '=', $authUserID);
        })->whereHas('offer', function($query) {
            $query->where('active', true)->where('public', true)->where('published', true);
        })->leftJoin('users', 'users.id', '=', 'courses.user_id')
          ->leftJoin('course_sections', function($query) {
              $query->on('course_sections.course_id', '=', 'courses.id')
                    ->whereNotNull('course_sections.video_link');
          })
            ->select('courses.*', 'users.username', 'course_sections.video_link', 'course_sections.position')
            ->get();

        $unique = $courses->sortBy('position')->unique('id');
        return $unique->values()->all();
    }

    /**
     * @param $userID
     *
     * @return mixed
     */
    public function getUserPurchasedCourses($userID): mixed {
        $courses = Course::whereHas('purchases', function (Builder $query) use($userID) {
            $query->where('user_id', 'like', $userID);
        })->leftJoin('users', 'users.id', '=', 'courses.user_id')
            ->leftJoin('course_sections', function($query) {
                $query->on('course_sections.course_id', '=', 'courses.id')
                      ->whereNotNull('course_sections.video_link');
            })
            ->select('courses.*', 'users.username', 'course_sections.video_link', 'course_sections.position')->get();

        $unique = $courses->sortBy('position')->unique('id');
        return $unique->values()->all();
    }

    /**
     * @param $request
     *
     * @return void
     */
    public function updateAllSectionsPositions($request): void {

        foreach($request['sections'] as $index => $section) {
            $currentSection = CourseSection::findOrFail( $section["id"] );
            if ( $currentSection["position"] != $index ) {
                $currentSection["position"] = $index;
                $currentSection->save();
            }
        }
    }

    /**
     * @param $course
     * @param $value
     *
     * @return void
     */
    private function saveCourseCategory($course, $value): void {

        $categoryArray = [$value];
        $category = Category::where('id', '=', $value)->pluck('parent_id');

        if($category[0]) {
            array_push($categoryArray,$category[0]);
        }

        $course->categories()->sync($categoryArray);
    }

    /**
     * @param $course
     * @param $name
     *
     * @return void
     */
    private function updateCourseLinks($course, $name): void {

        $courseLinks = Link::where('course_id', $course->id)->get();

        if (count($courseLinks) > 0) {
            foreach($courseLinks as $link) {
                $link->update([
                    'name'  => $name,
                ]);
            }
        }
    }
}
