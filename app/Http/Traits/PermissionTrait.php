<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

trait PermissionTrait {

    public function checkPermissions() {

        $user = Auth::user();
        $permissions = $user->getPermissionsViaRoles()->pluck('name');
        Session::put('permissions', $permissions);

    }

    public function checkCoursePermission($course) {

        $user = Auth::user();
        if ($user && ($user->Purchases()->where('course_id', $course->id)->first() || $user->id === $course->user_id)) {
            return true;
        }

        return false;

    }

    public function setCreatorSession($creator) {

        if (!Session::has('creator')) {
            Session::put('creator', $creator);
        }

    }
}
