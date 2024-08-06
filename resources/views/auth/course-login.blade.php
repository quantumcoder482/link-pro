@extends('layouts.course.header')

@section('content')

    <div class="container">

        <div class="my_row form_page mt-5">
            <div class="card guest">
                <div class="mb-4">
                    <h3> Log in to access {{ $username }}'s courses</h3>
                </div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}?creator={{$username}}">
                        @csrf

                        <div class="form-group row">

                            <div class="col-md-8 mx-auto">
                                <input placeholder="Username or Email"
                                       id="identity"
                                       type="text"
                                       class="form-control
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

                            <div class="col-md-8 mx-auto">
                                <input placeholder="Password"
                                       id="password"
                                       type="password"
                                       class="form-control @error('password') is-invalid @enderror"
                                       name="password"
                                       required
                                       autocomplete="current-password"
                                >

                                @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-8 offset-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-2">
                                <button type="submit" class="button text-uppercase" style="
                                    background: {{ $course["header_color"] }};
                                    color: {{ $course["header_text_color"] }};
                                ">
                                    {{ __('Sign In') }}
                                </button>
                            </div>
                        </div>

                        @if (Route::has('password.request'))
                            <div class="form-group mb-0">
                                <div class="col-12 text-center">
                                    <a class="btn btn-link" href="{{ route('show.reset.password', ['user' => $username]) }}">
                                        {{ __('Need your password reset?') }}
                                    </a>
                                </div>
                            </div>
                        @endif

                    </form>
                </div>
            </div>
        </div>

    </div>
@endsection
