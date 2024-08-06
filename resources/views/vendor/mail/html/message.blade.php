@component('mail::layout')
{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url'), 'id' => $id ?? '' ])
{{--{{ config('app.name') }}--}}
@endcomponent
@endslot

{{-- Body --}}
{{ $slot }}

{{-- Subcopy --}}
@isset($subcopy)
@slot('subcopy')
@component('mail::subcopy')
{{ $subcopy }}
@endcomponent
@endslot
@endisset

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
© Copyright {{ date('Y') }} {{ config('app.name') }}, LLC | @lang('All rights reserved.')
<br />
<p><small>You created an account on LinkPro, gosh you're smart! If for some reason you are over it, it's ok to stop getting our messages. All the same we're sad to see you go!
    </small></p>
<a href="{{ config('app.url') }}/email-subscription/{{ $id ?? '' }}?action=unsubscribe">Unsubscribe</a>
@endcomponent
@endslot
@endcomponent
