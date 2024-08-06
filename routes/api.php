<?php

use App\Http\Controllers\api\RegisterController;
use App\Http\Controllers\api\ShopifyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    
});

Route::controller(RegisterController::class)->group(function(){
    
});

Route::post('login', [RegisterController::class,'login']);

Route::get('connect-shopify-store', [ShopifyController::class, 'store']);
Route::get('auth/shopify/callback', [ShopifyController::class, 'apiCallback']);

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
 
    return ['token' => $token->plainTextToken];
});


