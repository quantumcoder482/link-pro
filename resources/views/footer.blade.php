<?php
?>
@if(Route::is('create.page'))
    <footer>
        <ul>
            <li><a href="{{ route('how-it-works') }}">How It Works</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Sign Up</a></li>
            <li><a href="{{ route('contact') }}">Contact Us</a></li>
        </ul>
        <small>&copy; Copyright LinkPro LLC | All Rights Reserved</small>
    </footer>
@else
    <footer>
        <ul>
            <li><a href="{{ route('contact') }}">Contact Us</a></li>
            <li><a href="{{ route('user.edit') }}">Settings</a></li>
            @php $userSub = Auth::user()->subscriptions()->first(); @endphp
            <li><a href="{{ route('how-it-works') }}">How It Works</a></li>
            <li><a href="{{ route('setup.page') }}">Setup</a></li>
            @if( empty($userSub) || ($userSub->name != "premier" && !$userSub->ends_at) || ($userSub->ends_at && $userSub->ends_at < \Carbon\Carbon::now()) )
                <li><a href="{{ route('plans.get') }}">Upgrade</a></li>
            @endif
        </ul>
        <p><small><a href="{{route('terms')}}">Terms And Conditions</a> | <a href="{{route('privacy')}}">Privacy Policy</a></small></p>
        <small>&copy; Copyright LinkPro LLC | All Rights Reserved</small>
    </footer>
@endif


