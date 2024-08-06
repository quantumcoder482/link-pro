@extends('layouts.course.header')

@section('content')
    <div class="container">
        <div class="my_row form_page">

            <div class="card guest">
                <div class="mb-4">
                    <h3>{{ __('Reset Password') }}</h3>
                </div>

                <div class="card-body">
                    <form method="POST" action="{{ route('reset.course.password') }}">
                        @csrf

                        <input type="hidden" name="token" value="{{ $token }}">
                        <input type="hidden" name="creator" value="{{ $creator }}">
                        <div class="form-group row">
                            <div class="col-md-8 mx-auto">
                                <input placeholder="E-mail Adddress" id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">

                            <div class="col-md-8 mx-auto">
                                <input placeholder="New Password" id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">

                            <div class="col-md-8 mx-auto">
                                <input placeholder="Confirm Password" id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-2">
                                <button type="submit" style="
                                        background: {{ $landingPageData["button_color"] }};
                                        color: {{ $landingPageData["button_text_color"] }};
                                ">
                                    {{ __('Reset Password') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
@endsection
