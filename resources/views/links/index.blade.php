@extends('layouts.app')

@section('content')
<div class="container" id="links_page">


    <div id="root"></div>


    {{--<div class="row justify-content-center">
        <div class="col-8">
            <h2>Your Links</h2>
            @foreach($links as $link)
                <div class="card">
                    <div>
                        <img src="{{ $link->link_icon }}" />
                    </div>
                    <p>{{ $link->name }}</p>
                    <p><a href="{{ $link->link }}">{{ $link->link }}</a></p>
                    --}}{{--<td>{{ $link->visits_count }}</td>
                    <td>{{ $link->latest_visit ? $link->latest_visit->created_at->format('M j Y - H:ia') : 'N/A' }}</td>--}}{{--
                    <p><a href="/dashboard/links/{{ $link->id }}">Edit</a>
                </div>
            @endforeach
            --}}{{--<div class="card">

               <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Url</th>
                            <th>Visits</th>
                            <th>Last Visit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($links as $link)
                            <tr>
                                <td>{{ $link->name }}</td>
                                <td><a href="{{ $link->link }}">{{ $link->link }}</a></td>
                                <td>{{ $link->visits_count }}</td>
                                <td>{{ $link->latest_visit ? $link->latest_visit->created_at->format('M j Y - H:ia') : 'N/A' }}</td>
                                <td><a href="/dashboard/links/{{ $link->id }}">Edit</a>
                            </tr>
                        @endforeach
                    </tbody>
               </table>--}}{{--
               <a href="/dashboard/links/new" class="btn btn-primary">Add Link</a>
        </div>
        <div class="col-4 preview_col">
            <div id="preview"></div>
        </div>
    </div>--}}
</div>
@endsection
