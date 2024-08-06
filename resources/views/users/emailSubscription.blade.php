@extends('layouts.guest.header')

@section('content')

    <div class="email_subscription_page">
        <div class="container">
            <div class="my_row card">
                <h2>{{ $message }}</h2>

                @if( $subscribed )
                    <p>We promise we won't bug you too much. Feel free to UnSubscribe at anytime if you get sick of us!</p>
                @else
                    <p class="mb-0">We are sorry to see you go.</p>
                    <p>If this was a mistake, click the link below to ReSubscribe:</p>
                    <div class="link_wrap">
                        <a href="{{ $siteURL }}email-subscription/{{ $userID }}?action=subscribe">ReSubscribe</a>
                    </div>
                @endif

                <div class="button_wrap">
                    <a class="button blue" href="{{ route('login') }}">Login Now</a>
                </div>
            </div>

        </div>
    </div>
@endsection
