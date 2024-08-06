
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
    <div class="modal-dialog form_page" role="document">
        <div class="modal-content card guest login_form">
            <div class="standard_heading @isset($course) mb-0 @endisset">
                <h3 class="modal-title text-center">{{ __('Log In') }}</h3>
            </div>
            {{--@isset($course)
                <p>to Access</p>
                <div class="row">
                    <div class="course_heading col-10 mx-auto" style="background: {{ $course->header_color }}">
                        <img src="{{ $course->logo }}" alt="{{ $course->title }}">
                        <h3  style="color: {{ $course->header_text_color }}">{{ $course->title }}</h3>
                    </div>
                </div>
            @endisset--}}
            <a class="close" data-dismiss="modal" aria-label="Close" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
            </a>
            <div class="modal-body">
                <form id="custom_login_form" method="POST" action="{{--{{ route('customLoginPost') }}--}}">
                    @csrf

                    <div class="form-group row mb-3">
                        <div class="col-10 mx-auto">
                            <span class="invalid-feedback" role="alert"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-10 mx-auto position-relative p-0">
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
                        </div>
                    </div>

                    <div class="form-group row">

                        <div class="col-10 mx-auto position-relative p-0">
                            <input id="password"
                                   type="password"
                                   class="form-control animate @error('password') is-invalid @enderror"
                                   name="password"
                                   required
                                   autocomplete="current-password"
                            >
                            <label for="password">Password</label>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-10 mx-auto p-0">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                <label class="form-check-label" for="remember">
                                    {{ __('Remember Me') }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row mb-0">
                        <div class="col-10 mx-auto p-0">
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

                </form>
            </div>

        </div>
    </div>
</div>
