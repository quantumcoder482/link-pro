@extends(Auth::user() ? 'layouts.app' : 'layouts.guest.header')

@section('content')

    <div class="container">
        <div class="my_row form_page checkout course_purchase">
            <h2 class="page_title text-center">Checkout Now</h2>
            @if (count($errors) > 0)
                <div class="alert alert-danger">
                    <ul>
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <div class="card @guest guest @endguest">
                <div class="card-body">
                    <div class="course_banner" style="background: {{ $course->header_color }}">
                        <div class="image_wrap w-50 mx-auto">
                            <img src="{{ $course->logo }}" alt="">
                        </div>
                    </div>
                    <form method="post" class="my_row" id="payment-form" action="{{ route('course.purchase') }}">
                        <div class="text_wrap text-center">
                            <h3>You are purchasing {{$course->title}} course for ${{number_format($offer->price, 2, ".", ",")}}</h3>
                        </div>
                        @csrf
                        <input id="nonce" name="payment_method_nonce" type="hidden" />
                        <input type="hidden" id="client_nonce" value={{$token}}>
                        <input type="hidden" id="offer_price" value={{$offer->price}}>
                        <input type="hidden" name="offer" value="{{$offer->id}}">
                        <input id="form_discount_code" type="hidden" name="discountCode">
                        <input type="hidden" id="bypass" value=null>
                        <input id="user" type="hidden" name="user">
                        <input type="hidden" id="course_creator" name="course_creator" value="{{$creator}}">
                        <input type="hidden" id="course_id" name="course_id" value="{{$course->id}}">
                        <input type="hidden" name="affRef" value="{{$affRef}}">
                        <input type="hidden" name="clickId" value="{{$clickId}}">
                        <input type="hidden" id="user_guest" name="user_guest" value="@guest true @else false @endguest">
                        <div class="column_wrap row">
                            @guest
                                <section id="account_register" class="col-12 col-md-6">
                                    <h4>Register for an account</h4>
                                    <div class="form-group row g-0">
                                        <div class="col-12 position-relative">
                                            <input id="username" type="text" class="animate form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="username">
                                            <label for="username">Username</label>
                                            @error('username')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $errors->first('username') }}</strong>
                                                </span>
                                            @enderror
                                            <span id="username_error" class="invalid-feedback" role="alert"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row g-0">
                                        <div class="col-12 position-relative">
                                            <input id="email" type="email" class="animate form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
                                            <label for="email">E-mail Address</label>
                                            @error('email')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $errors->first('email') }}</strong>
                                                </span>
                                            @enderror
                                            <span id="email_error" class="invalid-feedback" role="alert"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row g-0">
                                        <div class="col-12 position-relative">
                                            <input id="password" type="password" class="animate form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
                                            <label for="password">Password</label>
                                            @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $errors->first('password') }}</strong>
                                                    </span>
                                            @enderror
                                            <span id="password_error" class="invalid-feedback" role="alert"></span>
                                        </div>
                                    </div>
                                    <div class="form-group row g-0">
                                        <div class="col-12 position-relative">
                                            <input id="password-confirm" type="password" class="animate form-control" name="password_confirmation" required autocomplete="new-password">
                                            <label for="password-confirm">Confirm Password</label>
                                        </div>
                                    </div>
                                    <p>Already have an account?<br/>
                                        <a style="cursor: pointer"
                                           data-bs-toggle="modal"
                                           data-bs-target="#loginModal">Click Here To Login</a>
                                    </p>
                                </section>
                            @endguest
                            <section class="@guest col-12 col-md-6 @else col-12 @endguest">
                                <div class="drop_in_wrap">
                                    <div class="bt-drop-in-wrapper">
                                        <div id="bt-dropin"></div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="button_wrap my_row">
                            <button class="button blue" type="submit"><span>Submit</span></button>
                        </div>
                    </form>
                    <div id="loading_spinner">
                        <img src="{{ asset( 'images/spinner.svg' ) }}" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://js.braintreegateway.com/web/3.82.0/js/venmo.min.js"></script>
    <script src="https://js.braintreegateway.com/web/3.82.0/js/apple-pay.min.js"></script>
    <script src="https://js.braintreegateway.com/web/3.82.0/js/data-collector.min.js"></script>
@endsection
