@component('mail::message-course', ['landingPageData' => $data['landingPageData'], 'loginLink' => config('app.url') . '/' . $data['creator'] . '/course/login'])
<h3>Click The Button Below to Reset Your Password...</h3>

@component('mail::button-course', ['url' => $data['link'],
'backgroundColor' =>  $data['landingPageData']['button_color'],
'buttonTextColor' => $data['landingPageData']['button_text_color'] ])
Reset Password
@endcomponent

<p class="sign_off">To Your Success!</p>
<p class="signature">{{ $data['creator'] }}</p>
@endcomponent
