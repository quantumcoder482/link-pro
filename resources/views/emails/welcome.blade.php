@component('mail::message', ['id' => $data['userID']])
# Welcome To LinkPro!

<p class="sub_title">You're on your way to becoming a social icon!</p>

<p>Keep your account details handy:</p>
<p class="username">Username: <span>{{ $data['username'] }}</span></p>
<br>
Link: <a href="{{ config('app.url') }}/{{ $data['link'] }}">{{ config('app.url') }}/{{ $data['link'] }}</a>

@component('mail::button', ['url' => config('app.url') . "/login" ])
Login Now
@endcomponent

<p class="sign_off">To Your Success!</p>
<p class="signature">The LinkPro Team</p
@endcomponent
