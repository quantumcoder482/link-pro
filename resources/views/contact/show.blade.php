@extends(Auth::check() ? 'layouts.app' : 'layouts.guest.header')

@section('content')

    <div class="container" id="contact_page">
        <div class="my_row form_page">
            <h2 class="page_title text-center">Contact Us</h2>
            <div class="card guest">
                <div class="card-body text-center">
                    <div id="contact_form" class="my_row"></div>
                </div>
            </div>
        </div>
    </div>

@endsection
