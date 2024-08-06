<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class AffiliateController extends Controller
{
    /**
     * @return RedirectResponse
     */
    public function store(): RedirectResponse {

        $user = Auth::user();

        $user->Affiliates()->updateOrCreate(
            ['user_id' => $user->id],
            ['status' => "approved"]
        );

        return redirect()->back()->with(['success' => true]);
    }
}
