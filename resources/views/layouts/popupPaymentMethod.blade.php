<div id="popup_payment_method"  class="form_page checkout">
    <a class="close_popup" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </a>
    <div class="box">
        <div class="content_wrap">
            <div class="icon_wrap blue_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                </svg>
            </div>
            <h2>Choose Another Way to Pay</h2>
            <div class="text_wrap form_wrap">
                <form id="update_payment_method_form" action="{{ route('user.update.payment') }}" method="post" >
                    @csrf
                    <input id="method_nonce" name="payment_method_nonce" type="hidden"/>
                    <input id="pm_type" type="hidden" name="pm_type" value="">
                    <input id="pm_last_four" type="hidden" name="pm_last_four" value="">
                    <div class="bt-drop-in-wrapper">
                        <div id="bt-dropin-update"></div>
                    </div>
                    {{--<input type="text" name="postal_code" placeholder="Postal Code">--}}
                    <button type="submit" class='button blue'>
                        Submit
                    </button>
                </form>

            </div>
        </div>
    </div>
</div>

<script>
    const updatePaymentForm = document.querySelector('#update_payment_method_form');
    const pmType = document.querySelector('#pm_type');
    const pmLastFour = document.querySelector('#pm_last_four');
    const client_token = "{{ $token }}";
    const subscriptionName = "{{$subscription->name}}";
    let amount;
    if (subscriptionName === "pro") {
        amount = '4.99'
    } else {
        amount = '19.99'
    }

    const dropinInstance = braintree.dropin.create({
        authorization: client_token,
        selector: '#bt-dropin-update',
        paypal: {
            flow: 'vault'
        },
        googlePay: {
            googlePayVersion: 2,
            merchantId: '0764-6991-5982',
            transactionInfo: {
                totalPriceStatus: 'FINAL',
                totalPrice: amount,
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
                    amount: amount
                },
                // We recommend collecting billing address information, at minimum
                // billing postal code, and passing that billing postal code with all
                // Apple Pay transactions as a best practice.
                //requiredBillingContactFields: ["postalAddress"]
            }
        },
    }, function (createErr, instance) {
        if (createErr) {
            console.log('Create Error', createErr);
            return;
        }
        updatePaymentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            instance.requestPaymentMethod(function (err, payload) {
                if (err) {
                    console.log('Request Payment Method Error', err);
                    return;
                }

                pmType.value = payload["type"];
                if ( payload["details"]["lastFour"] !== undefined) {
                    pmLastFour.value = payload["details"]["lastFour"];
                }
                // Add the nonce to the form and submit
                document.querySelector('#method_nonce').value = payload.nonce;
                updatePaymentForm.submit();
            });
        });
    });

</script>
