<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $reason;
    public $message;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($validatedData)
    {
        $this->name = $validatedData['name'];
        $this->email = $validatedData['email'];
        $this->reason = $validatedData['reason'];
        $this->message = $validatedData['message'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->subject('Contact Form Entry')
                    ->replyTo($this->email)
                    ->markdown('emails.contact',[
                        'name' => $this->name,
                        'email' => $this->email,
                        'reason' => $this->reason,
                        'message' => $this->message
                    ]);
    }
}
