@component('mail::message', ['id' => $data['userID']])
# Heya {{ $data['username'] }}!

We want to offer you a FREE month when you upgrade to our PRO plan!
<br>
Click the link below and login, then click 'Have a Promo Code?' and enter the code: <strong>Pro1Month</strong>
<br>
<p><a href="{{ config('app.url') }}/subscribe?plan=pro">Go Pro Now!</a></p>

@component('mail::button', ['url' => config('app.url') . "/login" ])
Login Now
@endcomponent

<p class="sign_off">To Your Success!</p>
<p class="signature">The LinkPro Team</p>
@endcomponent
