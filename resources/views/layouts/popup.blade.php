<div id="confirm_popup">
    <div class="box">
        <div class="content_wrap">
            <div class="icon_wrap check">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <h2>Confirm</h2>
            <div class="text_wrap">
                <p class="confirm_text">Are you sure you want to <span id="text_type"></span> your plan?</p>
                <form class="button_row" action="" method="post" id="popup_form">
                    @csrf
                    <input class="level" name="level" type="hidden" value="">
                    <input class="plan" name="plan" type="hidden" value="">
                    <button type="submit" class="button green">Yes</button>
                    <a class="close_popup button transparent gray" href="#">No</a>
                </form>
            </div>
        </div>
    </div>
</div>
