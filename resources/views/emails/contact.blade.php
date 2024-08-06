@component('mail::message')

# A new user has submitted a {{$reason}} inquiry.

<br>
Name: {{$name}}
<br>
Email: {{$email}}
<br>
Reason: {{$reason}}
<br>
Message: {{$message}}
<br>
<br>
<p class="signature">The LinkPro Team</p>

@endcomponent
