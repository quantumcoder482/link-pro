@component('mail::message', ['id' => $data['userID']])
# Congrats on going {{ $data["plan"] }}!

@if ($data["plan"] == "PRO")
The people that take this step are not only wiser than the average bear, but also know what it takes to push to the next level!
<br>
<br>
Login now to build out your newest features!
<br>
<ul class="pro">
<li>
<div class="image_wrap">
<img src="{{ asset('images/check-mark-blue.png') }}" alt="">
</div>
Unlimited Icons
</li>
<li>
<div class="image_wrap">
<img src="{{ asset('images/check-mark-blue.png') }}" alt="">
</div>
Custom Icons
</li>
<li>
<div class="image_wrap">
<img src="{{ asset('images/check-mark-blue.png') }}" alt="">
</div>
Custom Icon Text
</li>
</ul>
<br>
Add your exclusive icon designs, personal web stores, web site favicon icons, and customize all of your icon names!
Take full advantage of your new features!
@else
You’ve taken a serious step to get the most out of LinkPro!
<br>
With a Premier account you will now have:
<ul class="premier">
<li>
<div class="image_wrap">
<img src="{{ asset('images/check-mark-black.png') }}" alt="">
</div>
Up to 5 Unique Links
</li>
<li>
<div class="image_wrap">
<img src="{{ asset('images/check-mark-black.png') }}" alt="">
</div>
Unlimited and customizable icon images and text on each link
</li>
</ul>
<br>
@endif
@component('mail::button', ['url' => config('app.url') . "/login" ])
    Login Now
@endcomponent
To Your Success!<br>
<p class="signature">The LinkPro Team</p>
@endcomponent
