<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends BaseController
{
    /**
     * Login api
     *
     * @return Response
     */
    public function login(Request $request): JsonResponse
    {
       /*  if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->plainTextToken; 
            $success['name'] =  $user->name;
            return $this->sendResponse($success, 'User login successfully.');
        }else{ 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }  */

        //$storeDomain = $request->get('storeDomain');

        /* return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ])->with(['course' => null, 'storeDomain' => null]); */

        $response = [
            'loginUrl'  => 'https://up-hare-rightly.ngrok-free.app/api/login'
        ];
        return response()->json($response, 200);
    }
}
