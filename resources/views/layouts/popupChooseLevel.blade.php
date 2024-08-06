@php $pages = $user->pages()->get() @endphp

<div id="popup_choose_level">
    <a class="close_popup" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </a>
    <div class="box form_page plans @if( (count($pages) == 1) || (count($pages) > 1 && $subscription->name != "premier" ) ) adjust_overflow @endif">
        <div class="icon_wrap">
            <img src="{{ asset('/images/icon-change-plans.png') }}" alt="">
        </div>
        <h2>Change Your Plan</h2>
        <div class="my_row three_columns two_columns popup mt-2">
            <div class="column free">
                <h2 class="text-uppercase">Free</h2>
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
                        <p>Up To 9 Icons</p>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                        </svg>
                        <p>Add Social Links</p>
                    </li>
                </ul>
                <div class="pricing">
                    <h3 class="price"><sup>$</sup>0</h3>
                </div>
                <a href="#" class="button green confirm_change_plan" data-type="cancel" data-level="free-cancel" >Downgrade To Free</a>
            </div>
            @if (!$subscription || ($subscription && $subscription->name == "premier"))
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
                            <p>Custom Icons</p>
                        </li>
                    </ul>
                    <div class="pricing">
                        <h3 class="price"><sup>$</sup>4.99<span>/ mo</span></h3>
                    </div>
                    <a href="#" class="button blue_gradient confirm_change_plan" data-type="downgrade" data-level="pro" >Downgrade To Pro</a>
                </div>
            @endif

            @if (!$subscription || ($subscription && $subscription->name == "pro") )

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
                        <h3 class="price"><sup>$</sup>19.99<span>/ mo</span></h3>
                    </div>
                    <form action="{{ route('subscribe.change.plan') }}" method="post" id="popup_pro_level_form">
                        @csrf
                        <input class="level" name="level" type="hidden" value="premier">
                        <button type="submit" class='button black_gradient'>
                            Upgrade To Premier
                        </button>
                    </form>
                </div>

            @endif

        </div><!-- my_row three_columns  -->

        <div id="confirm_change_plan_details" class="change_plan_message @if(count($pages) == 1) adjust_height @endif">
            <div class="icon_wrap check">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <h2>Confirm</h2>
            <form action="" method="post">
                @csrf
                <input class="level" name="level" type="hidden" value="">
                @if ($subscription->name == "premier")
                    <h3>By downgrading your account to Pro you will lose access to password protect your links and you will be limited to 1 unique link.</h3>
                    @if( count($pages) > 1 )
                        <p>You currently have {{count($pages)}} links.</p>
                        <label for="defaultPage">Select which link you would like to stay active:</label>
                        <select name="defaultPage">
                            @foreach($pages as $page)
                                <option value="{{ $page->id }}">{{ $page->name }}</option>
                            @endforeach
                        </select>
                    @endif
                @else
                    <h3>By downgrading your account to Free your subscription will be cancelled, your icons will be limited to 8 and you will no longer be able to use custom icons.</h3>
                @endif
                <p class="confirm_text">Do you want to continue?</p>
                <div class="button_row">
                    <button type="submit" class='button green'>
                        Yes
                    </button>
                    <a class="close_details button transparent gray" href="#">No</a>
                </div>
            </form>
        </div>

        <div id="confirm_cancel_details" class="change_plan_message @if(count($pages) == 1 || $subscription->name == "pro") adjust_height @endif">
            <div class="icon_wrap check">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <h2>Confirm</h2>
            <form action="" method="post">
                @csrf
                <input class="plan" name="plan" type="hidden" value="{{ $subscription->braintree_id }}">
                @if ($subscription->name == "premier")
                    <h3>By downgrading your plan to Free your subscription will be cancelled. You will lose access to password protect your links, you will be limited to 1 unique link, your icons will be limited to 8 and you will no longer be able to use custom icons..</h3>
                    @if( count($pages) > 1 )
                        <p>You currently have {{count($pages)}} links.</p>
                        <label for="defaultPage">Select which link you would like to keep active:</label>
                        <select name="defaultPage">
                            @foreach($pages as $page)
                                <option value="{{ $page->id }}">{{ $page->name }}</option>
                            @endforeach
                        </select>
                    @endif
                @else
                    <h3>By downgrading your plan to Free your subscription will be cancelled, your icons will be limited to 8 and you will no longer be able to use custom icons.</h3>
                @endif
                <p>Do you want to continue?</p>
                <div class="button_row">
                    <button type="submit" class='button green'>
                        Yes
                    </button>
                    <a class="close_cancel_details button transparent gray" href="#">No</a>
                </div>
            </form>
        </div>

    </div><!-- box form_page plans -->
</div><!-- poopup_choose_level -->

<script>
    const confirmChangePlan = document.querySelectorAll('.confirm_change_plan');
    const confirmPlanDetails = document.querySelector('#confirm_change_plan_details');
    const popupCard = document.querySelector('#popup_choose_level .box');
    const confirmCancelDetails = document.querySelector('#confirm_cancel_details');

    confirmChangePlan.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const type = e.target.dataset.type;
            const plan = e.target.dataset.level;
            const form = document.querySelector('#confirm_change_plan_details form');
            const cancelForm = document.querySelector('#confirm_cancel_details form')
            popupCard.classList.add("size_adjust");

            if (type === "cancel") {
                confirmCancelDetails.classList.add("open");
            } else {
                confirmPlanDetails.classList.add("open");
                document.querySelector('#confirm_change_plan_details .level').value = plan;
            }

            switch (plan) {

                case 'pro':
                    form.action = '/change-plan'
                    break;
                case 'free':
                    form.action = '/subscribe/cancel'
                    break;
                case 'free-cancel' :
                    cancelForm.action = '/subscribe/cancel'
                    break;
                case 'default':
                    console.log('default')
            }

        })
    })

    document.querySelector('.close_details').addEventListener('click', function(e) {
        e.preventDefault();
        confirmPlanDetails.classList.remove("open");
        popupCard.classList.remove("size_adjust");
    });

    document.querySelector('.close_cancel_details').addEventListener('click', function(e) {
        e.preventDefault();
        confirmCancelDetails.classList.remove("open");
        popupCard.classList.remove("size_adjust");
    });

</script>
