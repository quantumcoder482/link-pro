@extends(Auth::check() ? 'layouts.app' : 'layouts.guest.header')

@section('content')

    <div class="container">
        <div class="my_row setup_page">
            <h2 class="page_title">Setup</h2>
            <div class="card">
                <div id="setup"></div>
            </div>

        </div>
    </div>

@endsection
