<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Traits\BillingTrait;
class UserVerificationController extends Controller
{
    use BillingTrait;

    /**
     * @param Request $request
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function checkRecaptcha(Request $request): JsonResponse {
        $token = $request->get('token');
        $request = $request->get('action');
        $success = true;
        $SECRET_KEY_V3 = '6LdSIQIqAAAAAL18SkTssKUTDoTu7Km3WrEqQ2ro';

        try {
            $response = Http::post( 'https://www.google.com/recaptcha/api/siteverify?secret=' . $SECRET_KEY_V3 . '&response=' . $token, [] );
            $decodedResponse = json_decode($response);
            if ( !$decodedResponse->success || $decodedResponse->score < 0.5 || $decodedResponse->action !== $request ) {
                $success = false;
            }
        } catch ( Exception $e ) {
            $this->saveErrors($e);
            throw $e;
        }

        return response()->json(['valid' => $success]);

    }
}
