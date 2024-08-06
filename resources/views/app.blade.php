<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'LinkPro') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    @if(isset($page['props']['event']))
    <meta head-key="title" property="og:title" content="{{ isset($page['props']['event']['title']) ?? ''}}" />
    <meta head-key="image" property="og:image" content="{{ isset($page['props']['event']['image']) ?? ''}}" />
    <meta head-key="description" property="og:description" content="{{ isset($page['props']['event']['description']) ?? ''}}" />
    @endif
    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>