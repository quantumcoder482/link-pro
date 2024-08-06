@component('mail::message', ['id' => $data['userID']])
We are certainly sad to see you go but want to thank you for your participation! If there is anything we can do to make you reconsider, please let us know! If not, make sure to stay out there crushing it!
<br>
<br>
Your subscription is set to end on <span class="date">{{ $data["end_date"] }}</span>
<br>
<br>
Take advantage of the rest of the time you have!

@component('mail::button', ['url' => config('app.url') . "/login" ])
    Login Now
@endcomponent

<p class="sign_off">To Your Success!</p>
<p class="signature">The LinkPro Team</p>
@endcomponent
