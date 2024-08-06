@extends('layouts.guest.header')

@section('content')
    <div class="guest_home">
        <section class="two_col top">
            <div class="col">
                <h2>Unite Your Audience!</h2>
                <h3>Infinite Possibilities.</h3>
                <p>Connect your followers across all platforms and turn your following into revenue!</p>
                <div id="mobile_video" class="col mobile">
                </div>
                <div class="bottom_row my_row">
                    <a class="button blue" href="{{ route('register') }}">Sign up free</a>
                    <p><em><strong>Already on LinkPro?</strong></em> <a href="{{ route('login') }}"> Log In</a></p>
                </div>
            </div>
            <div id="desktop_video" class="col desktop">
                <div class="video_wrap">
                    <video autoplay loop muted playsinline>
                        <source src="{{ asset('/videos/home-image-loop-top-2.mp4/') }}" type="video/mp4">
                        <source src="{{ asset('/videos/home-image-loop-top-2.webm') }}" type="video/webm">
                    </video>
                </div>
            </div>
        </section>

        <section class="two_col social_media">
            <div class="col left">
                <div class="video_wrap">
                    <video autoplay loop muted playsinline>
                        <source src="{{ asset('/videos/home-image-loop-bottom.mp4/') }}" type="video/mp4">
                        <source src="{{ asset('/videos/home-image-loop-bottom.webm/') }}" type="video/webm">
                    </video>
                </div>
            </div>
            <div class="col">
                <h2>Link Your Platforms</h2>
                <p>Post your exclusive LinkPro link on all of your social media accounts. Cross all of your platforms to skyrocket your brand.</p>
            </div>
        </section>

        <section class="two_col laptop">
            <div class="col">
                <h2>Get Down To Business</h2>
                <p>LinkPro is all about business. We're in this to build all of our clients bottom line. Join Today to let LinkPro help you leverage the intersection of media & business to kick your revenue into gear.</p>
            </div>
            <div class="col right">
                <img src="{{ asset('/images/laptop-image.png') }}" alt="">
            </div>
        </section>

        <section class="two_col phone">
            <div class="col left">
                <img src="{{ asset('/images/img-phone.png') }}" alt="">
            </div>
            <div class="col">
                <h2>Self-Managed Platform</h2>
                <p>LinkPro allows you to create your own private link, add a profile & background image, and create buttons to link all of your social media and business accounts in one place.</p>
            </div>
        </section>

        <section class="two_col bottom">
            <div class="col">
                <h2>Cross Promote To Increase Revenue</h2>
                <p>Contact Us to discuss how LinkPro will work directly with you to cross promote other products & services to increase your bottom line. Get paid every week for all revenue generated from our partners.</p>
            </div>
            <div class="col right">
                <img src="{{ asset('/images/bottom-image.png') }}" alt="">
            </div>
        </section>
    </div>
@endsection
