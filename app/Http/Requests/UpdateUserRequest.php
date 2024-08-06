<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        $user = Auth::User();

        if ($request->password && $request->email) {
            return [
                'email' => 'required|string|email|max:255|unique:users,email,' . $user["id"],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ];
        }

        if ($request->password) {
            return [
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ];
        }

        return [
            'email' => 'required|string|email|max:255|unique:users,email,' . $user["id"],
        ];

    }
}
