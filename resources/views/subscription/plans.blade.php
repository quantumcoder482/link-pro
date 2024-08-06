@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="my_row form_page plans">
            @if (str_contains($path, '/create-page'))
                <h2 class="page_title m-0">Welcome to Link Pro!</h2>
                <p class="sub_title">Continue free forever or upgrade for advanced features!</p>
            @else
                <h2 class="page_title">Upgrade Now For Advanced Features!</h2>
            @endif
            <div class="card">
                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <ul>
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                <div class="card-body">
                    <div class="my_row three_columns {{$subscription && $subscription->name == "premier" && ($subscription->braintree_status == "active" || $subscription->braintree_status == "pending") ? "two_columns" : ""}}">
                        @if ( !$subscription || ($subscription && $subscription->name != "premier") || ($subscription->braintree_status != "active" && $subscription->braintree_status != "pending") )
                            <div class="column pro">
                                <h2 class="text-uppercase">Pro</h2>
                                <ul>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                        </svg>
                                        <p>Free Features PLUS</p>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                        </svg>
                                        <p>Unlimited Icons</p>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                        </svg>
                                        <p>Group Icons In Folders</p>
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                        </svg>
                                        <p>Custom Icons</p>
                                    </li>
                                </ul>
                                <div class="pricing">
                                    <h3><sup>$</sup>4.99<span>/ mo</span></h3>
                                </div>
                                <div class="button_row">

                                    @if ( ($subscription && $subscription->name == "pro") && ($subscription->braintree_status == "active" || $subscription->braintree_status == "pending") )
                                        <span class='button disabled'>Current</span>
                                    @elseif ($subscription && $subscription->braintree_status === "active")
                                        <button class='button blue open_popup' data-type="downgrade" data-level="pro">
                                            Downgrade My Plan
                                        </button>
                                    @else
                                        <a class='button blue_gradient' href="{{ url('/subscribe?plan=pro') }}">
                                            Get Pro
                                        </a>
                                    @endif
                                </div>
                            </div>
                        @endif
                        <div class="column premier">
                            <h2 class="text-uppercase">Premier</h2>
                            <ul>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                    </svg>
                                    <p>Pro Features PLUS</p>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                    </svg>
                                    <p>Up to 5 Unique Links</p>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                    </svg>
                                    <p>Password Protected Links</p>
                                </li>
                            </ul>
                            <div class="pricing">
                                <h3><sup>$</sup>19.99<span>/ mo</span></h3>
                            </div>
                            <div class="button_row">
                                @if (($subscription && $subscription->name == "premier") && ($subscription->braintree_status == "active" || $subscription->braintree_status == "pending"))
                                    <span class='button disabled'>Current</span>
                                @elseif ($subscription && ($subscription->braintree_status == "active" || $subscription->braintree_status == "pending") && $subscription->braintree_id != "bypass" )
                                    <button class="open_popup button black_gradient" data-type="upgrade" data-level="premier">
                                        Go Premier
                                    </button>
                                @else
                                    <a class='button black_gradient' href='{{ url('/subscribe?plan=premier') }}'>
                                        Go Premier
                                    </a>
                                @endif
                            </div>
                        </div>
                        <div class="column custom">
                            <h2 class="text-uppercase">Custom</h2>
                            <ul>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                    </svg>
                                    <p>Unlimited Links</p>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                    </svg>
                                    <p>Dedicated Account Manager</p>
                                </li>
                            </ul>
                            <div class="pricing">
                                <h3>ASK</h3>
                            </div>
                            <div class="button_row">
                                <a class="button gray_gradient" href="mailto:admin@link.pro">Contact Us</a>
                            </div>
                        </div>
                    </div>

                    @if (str_contains($path, '/create-page'))
                        <div class="my_row">
                            <div class="column free plans_page">
                                <h2 class="text-uppercase">Free</h2>
                                <div class="my_row three_columns">
                                    <div class="column">
                                        <h4>Having trouble choosing?</h4>
                                        <p>No Problem! Continue now free and upgrade later!</p>
                                    </div>
                                    <div class="column">
                                        <ul>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                </svg>
                                                <p>1 Unique Link</p>
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                </svg>
                                                <p>Up To 8 Icons</p>
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                </svg>
                                                <p>Add Social Links</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="column">
                                        <a class="button green_gradient" href="{{ route('dashboard') }}">Continue</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif

                </div>
            </div>
        </div>
    </div>

    @if (session()->has('success'))
        <div class="display_message alert" id="laravel_flash">
            <div class="icon_wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <p>{{ session()->get('success')}}</p>
            <span class="close"><strong>CLOSE</strong></span>
        </div>
    @endif

    @include('layouts.popup')

@endsection
