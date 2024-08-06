@extends('layouts.app')

@section('content')

    <div class="container" id="affiliate_signup">

        <div class="my_row form_page stats">
            <h2 class="page_title text-center">Affiliate Signup</h2>
            <div class="card">

                @if (\Session::has('success'))

                    <h3>Thanks for submitting to be an affiliate</h3>
                    <p>Once you have been approved you will be able to start adding offers to your LinkPro page and earn money!</p>

                @else

                    <form method="POST" action="{{ route('register.affiliate') }}">
                        @csrf
                        <div class="input_wrap">
                            <input id="name" type="text" name="name">
                            <label for="name">Name</label>
                        </div>

                        <button class="button blue" type="submit">Submit</button>
                    </form>

                @endif
            </div>
        </div>
    </div>

@endsection
