@extends('layouts.app')

@section('content')

    <div class="container">
        <h2 class="page_title">Course Creator</h2>
        <section class="card edit_page creator course_creator">
            <div id="links_page">
                <div id="edit_course" class="my_row creator_wrap"></div>
            </div>
        </section>

        @if (session()->has('success'))
            <div class="message_wrap">
                <div class="display_message alert" id="laravel_flash">
                    <div class="icon_wrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                    </div>
                    <p>{{ session()->get('success')}}</p>
                </div>
            </div>
        @endif

    </div>

@endsection
