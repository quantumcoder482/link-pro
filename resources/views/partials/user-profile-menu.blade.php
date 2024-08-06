<div class="nav_links_wrap" >

    <!-- Right Side Of Navbar -->
    <ul class="ml-auto">
        <!-- Authentication Links -->
        @guest
            @if (Route::has('login'))
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                </li>
            @endif

            @if (Route::has('register'))
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                </li>
            @endif
        @else
            @php
                $page = $user->pages()->where('user_id', $user->id)->where('default', true)->first();
                $image = null;
            @endphp

            @if($roles->contains('admin') || $roles->contains('lp.user'))
                @php $image = $page->profile_img; @endphp
                @if( empty($userSub) || ($userSub->name != "premier" && !$userSub->ends_at) || ($userSub->ends_at && $userSub->ends_at < \Carbon\Carbon::now()) )
                    <li class="upgrade_link">
                        <a class="button blue" href="{{route('plans.get')}}">Upgrade</a>
                    </li>
                @endif
            @endif

            <li class="nav-item">

                <a class="nav-link" href="{{ route('user.edit') }}" role="button" >
                    <img id="user_image" src="{{ $image ? : asset('images/profile-placeholder-img.png') }}" alt="User Profile">
                    <span id="username">{{ $user->username }}</span>
                </a>
            </li>

        @endguest
    </ul>
</div>
