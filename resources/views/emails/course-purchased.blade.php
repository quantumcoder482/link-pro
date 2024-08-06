@component('mail::message-course', ['course' => $data['course'], 'loginLink' => config('app.url') . $data['course']['slug'] . '/login'])
# Course Purchased!

<p class="sub_title">You have purchased the {{ $data['course']['title'] }} course!</p>

<p>Login with your email or username below to access your course:</p>
<p class="username">Username: <span>{{ $data['username'] }}</span></p>
<br>

@component('mail::button-course', ['url' => config('app.url') . $data['course']['slug'] . '/login',
'backgroundColor' =>  $data['course']['header_color'],
'buttonTextColor' => $data['course']['header_text_color'] ])
Login Now
@endcomponent

<p class="sign_off">To Your Success!</p>
<p class="signature">{{ $data['creator'] }}</p>
@endcomponent
