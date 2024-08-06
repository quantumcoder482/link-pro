@component('mail::message', ['id' => $data['userID']])

This email is to confirm that you have successfully unsubscribed and you will no longer receive any communication from LinkPro unless you change your mind!
<br>
<br>
We are sorry to see you go. If this was a mistake, click the button below to ReSuscribe:
<br>
<br>
<p><a href="{{ config('app.url') }}/email-subscription/{{ $data["userID"] }}?action=subscribe">ReSubscribe Now!</a></p>
@component('mail::button', ['url' => config('app.url') . "/login" ])
    Login Now
@endcomponent
<p class="sign_off">To Your Success!</p>
<p class="signature">The LinkPro Team</p>
@endcomponent
