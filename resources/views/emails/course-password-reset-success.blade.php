@component('mail::message-course', ['landingPageData' => $data['landingPageData'], 'loginLink' => config('app.url') . '/' . $data['creator'] . '/course/login'])
<h3>Your password has been reset!</h3>
<h3>Click the button below to login now...</h3>

@component('mail::button-course', ['url' => config('app.url') . '/' . $data['creator'] . '/course/login',
'backgroundColor' =>  $data['landingPageData']['button_color'],
'buttonTextColor' => $data['landingPageData']['button_text_color'] ])
Login Now
@endcomponent

<p class="sign_off">To Your Success!</p>
<p class="signature">{{ $data['creator'] }}</p>
@endcomponent
