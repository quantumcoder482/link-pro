<div id="confirm_cancel_popup" class="change_plan_message">
    <div class="box">
        <div class="content_wrap">
            <div class="icon_wrap check">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <h2>Confirm</h2>
            <div class="text_wrap">
                <form action="{{route('subscribe.cancel')}}" method="post">
                    @csrf
                    <input class="plan" name="plan" type="hidden" value="{{ $subscription->braintree_id }}">
                    @if ($subscription->name == "premier")
                        @php $pages = $user->pages()->get() @endphp
                        <h3>By cancelling your subscription you will lose access to password protect your links, you will be limited to 1 unique link, your icons will be limited to 8 and you will no longer be able to use custom icons.</h3>
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
                        <h3>By cancelling your subscription, you will be limited to 8 icons and you will no longer be able to use custom icons.</h3>
                    @endif
                    <p class="confirm_text">Do you want to continue?</p>
                    <div class="button_row">
                        <button type="submit" class='button green'>
                            Yes
                        </button>
                        <a class="close_popup button transparent gray" href="#">No</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
