@extends('layouts.guest.header')

@section('content')

<div class="container">

    <div class="my_row form_page">
        <div class="card guest login_form row">
            <div class="col-12">
                <div class="standard_heading @isset($course) mb-0 @endisset">
                    <h3>{{ __('Log in to LinkPro') }}</h3>
                </div>
                @isset($course)
                    <p class="text-center">to Access</p>
                    <div class="row">
                        <div class="course_heading col-12" style="background: {{ $course->header_color }}">
                            <img src="{{ $course->logo }}" alt="{{ $course->title }}">
                            <h3  style="color: {{ $course->header_text_color }}">{{ $course->title }}</h3>
                        </div>
                    </div>
                @endisset

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}@isset($course)?course={{$course->id}}@endisset">
                        @csrf

                        <div class="form-group row">

                            <div class="col-12 position-relative p-0">
                                <input id="identity"
                                       type="text"
                                       class="form-control animate
                                       @error('username')
                                            is-invalid
                                       @enderror
                                       @error('email')
                                            is-invalid
                                       @enderror
                                       @error('identity')
                                            is-invalid
                                       @enderror
                                       "
                                       name="identity"
                                       value="{{ old('identity') }}"
                                       required
                                       autofocus
                                >
                                <label for="identity">E-mail or UserName</label>
                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @enderror

                                @error('username')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                @enderror

                                @error('identity')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('identity') }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">

                            <div class="col-12 position-relative p-0">
                                <input id="password"
                                       type="password"
                                       class="form-control animate @error('password') is-invalid @enderror"
                                       name="password"
                                       required
                                       autocomplete="current-password"
                                >
                                <label for="password">Password</label>

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-12 p-0">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-12 p-0">
                                <button type="submit" class="button blue text-uppercase">
                                    {{ __('Sign In') }}
                                </button>
                            </div>
                        </div>

                        @if (Route::has('password.request'))
                            <div class="form-group mb-0">
                                <div class="col-12 text-center">
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Need your password reset?') }}
                                    </a>
                                </div>
                            </div>
                        @endif

                        <div class="form-group row mb-0">
                            <div class="col-12 text-center">
                               <p>Not on LinkPro? <a href="{{ route('register') }}">Start Now Free!</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection
