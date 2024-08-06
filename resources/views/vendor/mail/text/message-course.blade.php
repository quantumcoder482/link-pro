@component('mail::layout')
{{-- Header --}}
@slot('header')
@component('mail::header-course', ['loginLink' => $loginLink, 'course' => $course ])
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
© Copyright {{ date('Y') }} | @lang('All rights reserved.')
<br />
@endcomponent
@endslot
@endcomponent
