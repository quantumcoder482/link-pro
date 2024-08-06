@extends(Auth::check() ? 'layouts.app' : 'layouts.guest.header')

@section('content')

    <div class="container">
        <div class="row utility_page mx-auto">
            <div class="col-12">
                <h2 class="page_title">How It Works</h2>
                <div class="row two_columns">
                    <div class="col-12 col-md-6 mb-4 mb-md-0 order-1 order-md-0 column">
                        <div class="image_wrap">
                            <img src="{{ asset('images/how-it-works-step-1.jpg') }}" alt="">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 column order-0 order-md-1">
                        <h3 class="column_title">Step 1</h3>
                        <p>Get started by creating your free account with your <strong>email address and password.</strong></p>
                    </div>
                </div>
                <div class="row two_columns">
                    <div class="col-12 col-md-6 column">
                        <h3 class="column_title">Step 2</h3>
                        <p>Choose a link name so followers can find all your <strong>socials, products, and info in one place.</strong></p>
                    </div>
                    <div class="col-12 col-md-6 mb-4 mb-md-0 column">
                        <div class="image_wrap">
                            <img src="{{ asset('images/how-it-works-step-2.jpg') }}" alt="">
                        </div>
                    </div>
                </div>
                <div class="row two_columns">
                    <div class="col-12 col-md-6 mb-4 mb-md-0 order-1 order-md-0 column">
                        <div class="image_wrap">
                            <img src="{{ asset('images/how-it-works-step-3.jpg') }}" alt="">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 column order-0 order-md-1">
                        <h3 class="column_title">Step 3</h3>
                        <p>Keep a free account forever or <strong>upgrade for advanced features with Pro,</strong> Premium or Custom.</p>
                    </div>
                </div>
                <div class="row two_columns">
                    <div class="col-12 col-md-6 column">
                        <h3 class="column_title">Step 4</h3>
                        <p>Build your page with images, text, icons, and links. <strong>Post your link everywhere!</strong></p>
                    </div>
                    <div class="col-12 col-md-6 mb-4 mb-md-0 column">
                        <div class="image_wrap">
                            <img src="{{ asset('images/how-it-works-step-4.png') }}" alt="">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
