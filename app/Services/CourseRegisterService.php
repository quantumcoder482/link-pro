<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CourseRegisterService {

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    public function create(array $data): User {
        return User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * @param $request
     *
     * @return array
     */
    public function verify($request) : array {

        $validateData = [
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'password_confirmation' => $request->password_confirmation
        ];

        $validator = Validator::make($validateData,[
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ],
            [
                'username.required'     => 'Please provide your username',
                'username.unique'       => 'Sorry, username is already taken',
                'email.required'        => 'Please provide a valid Email address',
                'email.unique'          => 'Sorry, Email is already registered',
                'password.required'     => 'Password is required',
                'password.min'          => 'Password Length Should Be More Than 8 Characters'
            ]
        );

        if($validator->fails()) {
            return [
                'success'   => false,
                'errors'    => $validator->errors()
            ];
        }

        return [
            'success' => true
        ];
    }
}
