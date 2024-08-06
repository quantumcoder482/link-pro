@extends('layouts.app')

@section('content')

    <div class="my_row form_page plans checkout">
        <div class="container">
            <h2 class="page_title mb-0 w-100">Upgrade to <span class="text-capitalize">{{$plan}}</span> For Only </h2>
            <div class="pricing m-0">
                <h3><sup>$</sup>{{ $price ?? '' }}<span>/ mo</span></h3>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-lg-6 plan_details order-lg-0 order-1 ">
                            <div class="row">
                                <div class="col-12 my_row three_columns">
                                    <div class="column {{$plan}}">
                                        <h2 class="text-uppercase"><span>{{$plan}} Plan</span> Includes</h2>
                                        <ul>
                                            @if($plan == "pro")
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
                                                    <p>Unlimited Icons</p>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                    </svg>
                                                    <p>Custom Icons</p>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                    </svg>
                                                    <p>Add Social Links</p>
                                                </li>
                                            @else
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
                                                    <p>Unlimited Icons</p>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                    </svg>
                                                    <p>Custom Icons</p>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                    </svg>
                                                    <p>Password Protected Links</p>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                                    </svg>
                                                    <p>Add Social Links</p>
                                                </li>
                                            @endif
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6 credit_card_form order-lg-1 order-0">
                            @if (count($errors) > 0)
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif

                            <div class="my_row payment_form_wrap">
                                <div class="my_row">
                                    <a class="discount_link" href="#">Have a Promo Code?</a>
                                    <div class="discount_wrap my_row">
                                        <form id="submit_discount_code" action="#" method="post">
                                            @csrf
                                            <input type="text" name="discountCode" id="discount_code" />
                                            <input id="code_plan" type="hidden" name="planId" value="{{ strtolower($plan) }}">
                                            <button type="submit" class="button blue">Apply</button>
                                        </form>
                                        <div id="promo_success_message" class="my_row" role="alert"></div>
                                        <div id="promo_error_message" class="my_row" role="alert"></div>

                                    </div>
                                </div>
                                <div class="my_row">
                                    @php
                                        if ($bypass == true) {
                                            $route = route('subscribe.change.plan');
                                        } elseif ($existing) {
	                                        $route = route('subscribe.resume');
                                        } else {
	                                        $route = route('subscribe.post');
                                        }
                                    @endphp

                                    <form method="post" id="payment-form" action="{{ $route }}">
                                        @csrf
                                        <section>
                                            <input type="hidden" name="level" value="{{ $plan }}">
                                            <input type="hidden" name="planId" value="{{ $plan == 'pro' ?  'pro' : 'premier'}}">
                                            <input id="form_discount_code" type="hidden" name="discountCode">
                                            <input type="hidden" id="bypass" value=null>
                                            <div class="drop_in_wrap">
                                                <div class="bt-drop-in-wrapper">
                                                    <div id="bt-dropin"></div>
                                                </div>
                                            </div>
                                        </section>

                                        <input id="nonce" name="payment_method_nonce" type="hidden" />
                                        <button class="button blue" type="submit"><span>Submit</span></button>
                                    </form>

                                    <div id="loading_spinner">
                                        <img src="{{ asset( 'images/spinner.svg' ) }}" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <script src="https://js.braintreegateway.com/web/3.82.0/js/venmo.min.js"></script>
    <script src="https://js.braintreegateway.com/web/3.82.0/js/apple-pay.min.js"></script>
    <script src="https://js.braintreegateway.com/web/3.82.0/js/data-collector.min.js"></script>
    <script>
        let spinner = document.querySelector('#loading_spinner');
        var form = document.querySelector('#payment-form');
        var client_token = "{{ $token }}";
        spinner.classList.remove('active');
        braintree.dropin.create({
            authorization: client_token,
            selector: '#bt-dropin',
            paypal: {
                flow: 'vault'
            },
            googlePay: {
                googlePayVersion: 2,
                merchantId: '0764-6991-5982',
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPrice: "{{ $price }}",
                    currencyCode: 'USD'
                },
            },
            venmo: {
                allowDesktop: true,
                paymentMethodUsage: 'multi_use',
            },
            applePay: {
                displayName: 'LinkPro',
                paymentRequest: {
                    total: {
                        label: 'LinkPro',
                        amount: '{{ $price  }}'
                    },
                    // We recommend collecting billing address information, at minimum
                    // billing postal code, and passing that billing postal code with all
                    // Apple Pay transactions as a best practice.
                    requiredBillingContactFields: ["postalAddress"]
                }
            }
        }, function (createErr, instance) {
            if (createErr) {
                console.log('Create Error', createErr);
                return;
            }
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                spinner.classList.add('active');

                const code = document.querySelector('#form_discount_code').value;

                if (code.toLowerCase() === "freepremier" || code.toLowerCase() === "freepro") {
                    form.submit();
                } else {
                    instance.requestPaymentMethod(function(err, payload) {
                        if (err) {
                            console.log('Request Payment Method Error', err);
                            return;
                        }
                        // Add the nonce to the form and submit
                        document.querySelector('#nonce').value = payload.nonce;
                        form.submit();
                    });
                }

            });
        });
    </script>
@endsection
