@extends('layouts.app')

@section('content')
    <div class="container">

        <h2 class="page_title">Pages</h2>
        <section id="pre_register" class="card edit_page">
            <h3>Build a LinkPro Page to create one link to promote all of your social media account.</h3>
            <h3>Plus create your own Courses or market existing Courses for a revenue share!</h3>
            <ul>
                <li>
                    <span class="number">1</span>
                    <div class="text_wrap">
                        <h4>Create your LinkPro Page</h4>
                        <p>Add images, text and all of your social media or contact icons to your Page.</p>
                    </div>
                </li>
                <li>
                    <span class="number">2</span>
                    <div class="text_wrap">
                        <h4>Share your Page</h4>
                        <p>Add your Page link to any social or email accounts to link all of your followers with one simple link.</p>
                    </div>
                </li>
                <li>
                    <span class="number">3</span>
                    <div class="text_wrap">
                        <h4>Create or market LinkPro Courses</h4>
                        <p>After creating your Page, create your own video Courses or market other public Courses to generate Income</p>
                    </div>
                </li>
            </ul>
            <a class="button blue full" href="{{Route('create.page')}}">
                Get Started!
            </a>
        </section>

    </div>
@endsection
