<?php

namespace App\Http\Traits;

use App\Models\Page;

trait PageTrait {

    public function getAllPages() {

        return Page::all()->pluck('name')->toArray();
    }
}
