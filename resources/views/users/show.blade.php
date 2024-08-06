@extends('layouts.links')

@section('content')
    <div class="container">
        <div style="background: {{ $user->background }}">
            <div class="row justify-content-center">
                <div class="col-12 col-md-6">
                    @foreach($user->links as $link)
                        <div class="link">
                            <a href="{{ $link->link }}"
                               data-link-id="{{ $link->id }}"
                            class="user-link d-block p-4 mb-4 rounded h3 text-center"
                               target="_blank"
                               rel="nofollow"
                            >
                                {{ $link->name }}
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection
