@extends('layouts.app')

@section('content')

    @php //dd($purchasedCourses) @endphp

    <div class="creator course_creator">
        <div id="links_page" class="live_page course">
            <div class="my_row courses_grid all_courses">
                <div class="container">
                    @if (!$purchasedCourses->isEmpty())
                        <section class="section_wrap my_row">
                            <h2 class="page_title">Your Courses</h2>
                            <div class="sections">
                                @foreach($purchasedCourses as $course)

                                    @php
                                        $videoLink = \App\Models\CourseSection::where('course_id', $course->id)->where('type', 'video')->pluck('video_link')->first();
                                        if (strpos($videoLink, "youtube") !== false) {
                                            $str = explode("embed/", $videoLink);
                                            $videoCode = preg_replace('/\s+/', '',$str[1]);
                                            $imageUrl = "https://img.youtube.com/vi/" . $videoCode . "/mqdefault.jpg";
                                        } elseif (strpos($videoLink, "vimeo") !== false) {
                                            $str = explode("video/", $videoLink);
                                            $videoCode = preg_replace('/\s+/', '',$str[1]);
                                            $imageUrl = "https://vumbnail.com/" . $videoCode . ".jpg";
                                        } else {
                                            $imageUrl = asset('images/image-placeholder.jpg');
                                        }
                                    @endphp

                                    <div class="column">
                                        <div class="column_image">
                                            <a href="/{{$course->username}}/course/{{$course->slug}}">
                                                <img src="{{ $imageUrl }}" alt="">
                                            </a>
                                        </div>
                                        <div class="column_title">
                                            <a href="/{{$course->username}}/course/{{$course->slug}}">
                                                <h3>{{$course->title}}</h3>
                                            </a>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </section>
                    @endif
                    <section class="section_wrap my_row">
                        <h2 class="page_title">Available Courses</h2>
                            <div class="sections">
                                @foreach($unPurchasedCourses as $course)
                                    @php
                                        $videoLink = \App\Models\CourseSection::where('course_id', $course->id)->where('type', 'video')->pluck('video_link')->first();
                                        if (strpos($videoLink, "youtube") !== false) {
                                            $str = explode("embed/", $videoLink);
                                            $videoCode = preg_replace('/\s+/', '',$str[1]);
                                            $imageUrl = "https://img.youtube.com/vi/" . $videoCode . "/mqdefault.jpg";
                                        } elseif (strpos($videoLink, "vimeo") !== false) {
                                            $str = explode("video/", $videoLink);
                                            $videoCode = preg_replace('/\s+/', '',$str[1]);
                                            $imageUrl = "https://vumbnail.com/" . $videoCode . ".jpg";
                                        } else {
                                            $imageUrl = asset('images/image-placeholder.jpg');
                                        }
                                    @endphp
                                    <div class="column">
                                        <div class="column_image">
                                            <a target="_blank" href="/{{$course->username}}/{{$course->lp_slug}}">
                                                <img src="{{ $imageUrl }}" alt="">
                                            </a>
                                        </div>
                                        <div class="column_title">
                                            <a target="_blank" href="/{{$course->username}}/{{$course->lp_slug}}">
                                                <h3>{{$course->title}}</h3>
                                            </a>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                    </section>
                </div>
            </div>
        </div>
    </div>

@endsection
