<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    {{--<link href="{{ asset('css/app.css') }}" rel="stylesheet">--}}
    @vite('resources/js/app.jsx')

</head>
<body class="guest">
<div id="app" class="my_row">
    <header class="guest_header">
        <div class="column left">
            <h1><a href="/"><img src="{{ asset('images/logo.png') }}" alt="Link Pro"></a></h1>
        </div>
        <div class="column right">

            <a href="@isset($course)/{{$course->slug}}@endisset/login">Log In</a>
            <a href="{{route('contact')}}">Contact Us</a>
            <a class="button transparent" href="/register">Sign Up</a>
        </div>
    </header>

    <main class="@if(Route::is('guest-home')) guest_home @endif @if(Route::is('course.checkout')) checkout @endif">
        @yield('content')
    </main>

    {{--@include('partials.login')--}}
    @include ('layouts.guest.footer')
</div>
</body>
</html>
