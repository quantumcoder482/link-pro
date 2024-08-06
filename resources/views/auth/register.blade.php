@extends('layouts.guest.header')

@section('content')
<div class="container">
    <div class="my_row form_page">
        <div class="card guest">
            <div class="mb-4">
                <h3>Take control of your social sharing!</h3>
                <h4 class="text-center">Create your free account below to get started.</h4>
            </div>

            <div class="card-body">
                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="form-group row">

                        <div class="col-sm-10 mx-auto position-relative p-0">
                            <input id="email" type="email" class="form-control animate @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
                            <label for="email">E-mail Address</label>
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group row">
                        {{--<label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>--}}

                        <div class="col-sm-10 mx-auto position-relative p-0">
                            <input id="password" type="password" class="form-control animate @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
                            <label for="password">Password</label>
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group row">
                        {{--<label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>
--}}
                        <div class="col-sm-10 mx-auto position-relative p-0">
                            <input id="password-confirm" type="password" class="form-control animate" name="password_confirmation" required autocomplete="new-password">
                            <label for="password-confirm">Confirm Password</label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-10 mx-auto">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }} required>

                                <label class="form-check-label" for="remember">
                                    Check here to agree to LinkPro's <a target="_blank" href="{{ route('terms') }}">Terms and Conditions</a> and
                                        <a target="_blank" href="{{ route('privacy') }}">Privacy Policy</a>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <div class="col-sm-10 mx-auto">
                            <button type="submit" class="button blue text-uppercase">
                                {{ __('Let\'s Do This') }}
                            </button>
                        </div>
                    </div>
                    <div class="form-group row mb-0 bottom_row">
                        <div class="col-12 text-center">
                            <p><a href="{{ route('login') }}">Already on LinkPro? Login Now</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>
@endsection
