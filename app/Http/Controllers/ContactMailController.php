<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ContactRequest;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Http\Traits\BillingTrait;
use Inertia\Response;
use Spatie\Honeypot\Honeypot;

class ContactMailController extends Controller
{
    use BillingTrait;
    public function index(Honeypot $honeypot): Response {
        return Inertia::render('Contact/Contact', [
            'honeypot' => $honeypot,
        ]);
    }

    /**
     * @param ContactRequest $request
     *
     * @return RedirectResponse
     */
    public function contactSendMail(ContactRequest $request): RedirectResponse {

        $reason = $request->get('reason');

        if ($reason == "general" || $reason == "support") {
            $email = 'matteo@link.pro';//'support@link.pro';
        } else {
            $email = 'matteo@link.pro'; //'partners@link.pro';
        }

        Mail::to($email)->send(new ContactMail($request));

        return back();
    }
}
