<?php

namespace App\Providers;

use App\Events\PurchasedItem;
use App\Events\UserLoggedIn;
use App\Listeners\LogUserIpAddressLoginListener;
use App\Listeners\LogUserIpAddressRegisteredListener;
use App\Listeners\SendPurchaseNotification;
use App\Listeners\UpdateTransactionStatus;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use SocialiteProviders\MailChimp\MailChimpExtendSocialite;
use SocialiteProviders\Manager\SocialiteWasCalled;
use SocialiteProviders\Shopify\ShopifyExtendSocialite;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        UserLoggedIn::class => [
            LogUserIpAddressLoginListener::class
        ],
        Registered::class => [
            SendEmailVerificationNotification::class,
            LogUserIpAddressRegisteredListener::class
        ],
        SocialiteWasCalled::class => [
            ShopifyExtendSocialite::class.'@handle',
            MailChimpExtendSocialite::class.'@handle',
        ],
        PurchasedItem::class => [
            UpdateTransactionStatus::class,
            SendPurchaseNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
