<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app" class="my_row">
    <main class="@php if(!Route::is('live.landing.page') && !Route::is('live.course.page')) { echo "py-4"; } else { echo "pt-0"; } @endphp">

        @yield('content')

        <div class="my_row user_page_footer">
            <div class="image_wrap">
                <a href="{{ Route('register') }}">
                    <p>Powered By</p>
                    <img src="{{ asset('/images/logo.png') }}" alt="">
                </a>
            </div>
        </div>
    </main>

</div>
</body>
</html>
