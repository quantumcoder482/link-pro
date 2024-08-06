<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('/js/app.js') }}" defer></script>
    <script src="https://js.braintreegateway.com/web/3.82.0/js/client.min.js"></script>
    <script src="https://js.braintreegateway.com/web/dropin/1.32.0/js/dropin.min.js"></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

</head>
<body>
@php
    $routeName = Illuminate\Support\Facades\Route::currentRouteName();
	$user = \Illuminate\Support\Facades\Auth::user();
    $userSub = $user->subscriptions()->first();
	$roles = $user->getRoleNames();
@endphp

    @include('layouts.menu')

    <div id="app" class="my_row @auth member @endauth">
        <header class="my_row nav_row">
            <nav>
                <div class="container">
                    <div class="content_wrap">
                        <div class="left_column">
                            <a class="logo" href="{{ url('/dashboard') }}">
                                <h1><img src="{{ asset('images/logo.png') }}" alt="Link Pro"></h1>
                            </a>
                        </div>
                        <div class="right_column">
                            @include('partials.user-profile-menu')
                        </div>

                    </div>
                </div>
            </nav>
        </header>
        <main>
            @yield('content')
        </main>

        @if($roles->contains('admin') || $roles->contains('lp.user'))
            @include('footer')
        @else
            @include('layouts.course.footer')
        @endif

    </div>
</body>
</html>
