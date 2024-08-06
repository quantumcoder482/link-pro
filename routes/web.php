<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Foundation\Application;


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\IconController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\ContactMailController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MailchimpController;
use App\Http\Controllers\ShopifyController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\Auth\CourseRegisterController;
use App\Http\Controllers\Auth\CoursePasswordController;
use App\Http\Controllers\Admin\AdminStatsController;
use App\Http\Controllers\AffiliateController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\UserVerificationController;
use Spatie\Honeypot\ProtectAgainstSpam;
use TCG\Voyager\Facades\Voyager;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'event' => [
            'title' => 'LinkPro',
            'image' => asset('images/logo-large.png'),
            'description' => 'Connect your followers across all platforms and turn your following into revenue!',
        ]
    ]);
})->name('home');

Route::middleware('auth')->group(function () {

    Route::get('/edit-account', [UserController::class, 'edit'])->name('user.edit');

    Route::get('/register/create-page', [PageController::class, 'showCreatePage'])->middleware('auth.banned')->name('create.page');
    Route::get('/email-test', [MailController::class, 'sendEmail']);

    Route::put('/update-account', [UserController::class, 'updateAccountInfo'])->name('user.update.info');
    Route::get('/get-user-pages', [UserController::class, 'getAllUserPages'])->name('user.get.pages');

    Route::post('/folder/new', [FolderController::class, 'store'])->name('add.folder');

    Route::get('/auth/shopify', [ShopifyController::class, 'auth'])->name('shopify.auth');
    Route::get('/auth/shopify/callback', [ShopifyController::class, 'callback']);
    Route::get('/shopify/get-products/{id}', [ShopifyController::class, 'getAllProducts'])->name('shopify.get.products');
    Route::get('/shopify/get-stores', [ShopifyController::class, 'getStores'])->name('shopify.get.stores');

    Route::get('/auth/mailchimp', [MailchimpController::class, 'auth'])->name('mailchimp.auth');
    Route::get('/auth/mailchimp/callback', [MailchimpController::class, 'callback']);
    Route::get('/mailchimp/list', [MailchimpController::class, 'getLists'])->name('mailchimp.get.lists');
    Route::put('/mailchimp/remove-connection', [MailchimpController::class, 'removeConnection'])->name('mailchimp.remove.connection');

    Route::get('/get-aff-icons', [IconController::class, 'getAffIcons']);
    Route::get('/get-standard-icons', [IconController::class, 'getStandardIcons']);
    Route::get('/get-custom-icons', [IconController::class, 'getCustomIcons']);

    Route::post('/payment-onboarding', [UserController::class, 'paymentOnboarding'])->name('payment.onboarding');
    Route::get('/onboarding-success', [UserController::class, 'onboardingSuccess'])->name('onboarding.success');

    Route::group(['prefix' => 'dashboard'], function () {
        Route::post('/links/new', [LinkController::class, 'store']);
        Route::put('/links/update/{link}', [LinkController::class, 'update']);
        Route::patch('/links/status/{link}', [LinkController::class, 'updateStatus']);
        Route::patch('/links/update-positions', [LinkController::class, 'updatePositions']);
        Route::put('/links/delete/{link}', [LinkController::class, 'destroy']);

        Route::post('/page/new', [PageController::class, 'store'])->name('page.new');
        Route::patch('/page/update-header-image/{page}', [PageController::class, 'updateHeaderImage'])->name('page.header.update');
        Route::patch('/page/update-profile-image/{page}', [PageController::class, 'updateProfileImage'])->name('page.profile.update');
        Route::patch('/page/update-name/{page}', [PageController::class, 'updateName'])->name('page.name.update');
        Route::patch('/page/update-title/{page}', [PageController::class, 'updateTitle'])->name('page.title.update');
        Route::patch('/page/update-bio/{page}', [PageController::class, 'updateBio'])->name('page.bio.update');
        Route::patch('/page/update-profile-layout/{page}', [PageController::class, 'updateProfileLayout'])->name('profile.layout.update');

        Route::get('/page/get-links/{page}', [LinkController::class, 'getPageLinks'])->name('page.get.links');

        Route::get('/pages/folder/links/{folder}', [FolderController::class, 'getFolderLinks'])->name('get.folder.links');
        Route::patch('/folder/status/{folder}', [FolderController::class, 'updateFolderStatus']);
        Route::put('/folder/delete/{folder}', [FolderController::class, 'destroy']);
        Route::patch('/folder/update-name/{folder}', [FolderController::class, 'updateName']);
    });

    Route::get('/get-course-categories', [CourseController::class, 'getCourseCategories']);

    Route::group(['prefix' => 'subscribe'], function () {
        Route::post('/get-paypal-client', [SubscriptionController::class, 'getPayPalClient']);
        Route::get(
            '/stripe-success',
            [SubscriptionController::class, 'stripeSubscribeSuccess']
        )->name('stripe.subscribe.success');
        Route::post(
            '/paypal-success',
            [SubscriptionController::class, 'payPalSubscribeSuccess']
        )->name('paypal.subscribe.success');
        Route::get(
            '/success',
            [SubscriptionController::class, 'showSuccessPage']
        )->name('show.subscribe.success');
    });
});


Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
    Route::get('/affiliate-stats', [AdminStatsController::class, 'show'])->name('adminAffStats');
    Route::post('/stats/get/offer', [AdminStatsController::class, 'getOfferStats']);
    Route::post('/stats/get/publisher', [AdminStatsController::class, 'getPublisherStats']);
    Route::post('/ban-user/{user}', [UserController::class, 'banUserByType'])->name('ban.user');
    Route::post('/unban-user/{user}', [UserController::class, 'unBanUser'])->name('unban.user');

    /*Route::post('/subscriptions', [App\Http\Controllers\VoyagerFilterController::class, 'index']);
    Route::post('/users', [App\Http\Controllers\VoyagerFilterController::class, 'index']);
    Route::post('/pages', [App\Http\Controllers\VoyagerFilterController::class, 'index']);
    Route::post('/links', [App\Http\Controllers\VoyagerFilterController::class, 'index']);
    Route::post('/referrals', [App\Http\Controllers\VoyagerFilterController::class, 'index']);
    Route::post('/purchases', [App\Http\Controllers\VoyagerFilterController::class, 'index']);
    Route::post('/offers', [App\Http\Controllers\VoyagerFilterController::class, 'index']);*/
});

Auth::routes();

Route::group(['middleware' => ['auth', 'EnsureLinkIsCreated', 'lp.user', 'auth.banned']], function () {

    Route::group(['prefix' => 'dashboard'], function () {
        Route::get('/pages/{page}', [PageController::class, 'edit'])->name('pages.edit');
        Route::get('/pages', [PageController::class, 'redirect']);
        Route::get('/', [PageController::class, 'redirect'])->name('dashboard');
    });

    Route::group(['prefix' => 'creator-center'], function () {
        Route::get('/add-landing-page', [LandingPageController::class, 'store'])->name('add.landing.page');
        Route::get('/add-course', [CourseController::class, 'store'])->name('add.course');
        Route::get('/', [CourseController::class, 'showCreatorCenter'])->name('creator.center');
        Route::get('/landing-page/{landing_page}', [LandingPageController::class, 'edit'])->name('edit.landing.page');

        Route::group(['prefix' => 'landing-page'], function () {
            Route::patch('/save-image/{landing_page}', [LandingPageController::class, 'saveImage'])->name('lp.save.image');
            Route::patch('/save-data/{landing_page}', [LandingPageController::class, 'saveLandingPageData'])->name('lp.save.data');
            Route::post('/add-section/{landing_page}', [LandingPageController::class, 'addSection'])->name('lp.add.section');
            Route::put('/delete-section/{landing_page_section}', [LandingPageController::class, 'deleteSection'])->name('delete.section');
            Route::patch('/update-section-data/{landing_page_section}', [LandingPageController::class, 'updateSectionData'])->name('update.section.data');
            Route::patch('/update-section-image/{landing_page_section}', [LandingPageController::class, 'updateSectionImage'])->name('update.section.image');
            Route::patch('/publish/{landing_page}', [LandingPageController::class, 'publishLandingPage'])->name('publish.landing_page');
            Route::patch('/activate/{landing_page}', [LandingPageController::class, 'activateLandingPage'])->name('activate.landing_page');
            Route::patch('/update-sections-positions', [LandingPageController::class, 'updateSectionsPositions']);
        });

        Route::group(['prefix' => 'course'], function () {
            Route::get('/{course}', [CourseController::class, 'edit'])->name('edit.course');
            Route::patch('/save-data/{course}', [CourseController::class, 'saveCourseData'])->name('course.save.data');
            Route::patch('/save-image/{course}', [CourseController::class, 'saveImage'])->name('course.save.image');
            Route::post('/add-section/{course}', [CourseController::class, 'addSection'])->name('course.add.section');
            Route::put('/delete-section/{course_section}', [CourseController::class, 'deleteSection'])->name('delete.course.section');
            Route::patch('/update-section-data/{course_section}', [CourseController::class, 'updateSectionData'])->name('update.course.section.data');
            Route::patch('/update-sections-positions', [CourseController::class, 'updateSectionsPositions']);
            Route::patch('/update-section-image/{course_section}', [CourseController::class, 'updateSectionImage'])->name('update.course.section.image');
            Route::patch('/update-section-file/{course_section}', [CourseController::class, 'updateSectionFile'])->name('update.course.section.file');
        });

        Route::group(['prefix' => 'offer'], function () {
            Route::patch('/update-icon/{offer}', [OfferController::class, 'updateOfferIcon'])->name('update.offer.icon');
            Route::patch('/update-data/{offer}', [OfferController::class, 'updateOfferData'])->name('update.offer.data');
            Route::patch('/publish/{offer}', [OfferController::class, 'publishOffer'])->name('publish.offer');
        });
    });

    Route::get('/plans', [SubscriptionController::class, 'showPlans'])->name('plans.get');
    Route::group(['prefix' => 'subscribe'], function () {
        Route::put('/cancel', [SubscriptionController::class, 'cancel'])->name('subscribe.cancel');
        Route::post('/resume', [SubscriptionController::class, 'resume'])->name('subscribe.resume');
        Route::post('/change-plan', [SubscriptionController::class, 'changePlan'])->name('subscribe.change.plan');
        Route::get('/', [SubscriptionController::class, 'showPurchasePage'])->name('subscribe.get');
        Route::get('/cancel-checkout', [SubscriptionController::class, 'cancelCheckout'])->name('cancel.checkout');
        Route::post('/paypal-payment-method', [SubscriptionController::class, 'changePaymentMethodToPaypal'])->name('paypal.payment.method');
        Route::post('/get-stripe-billing-date', [SubscriptionController::class, 'getStripeBillingDate']);
    });

    Route::post('/stats/link', [StatsController::class, 'getLinkStats']);
    Route::post('/stats/page', [StatsController::class, 'getPageStats']);
    Route::post('/stats/folder', [StatsController::class, 'getFolderStats']);
    //Route::get('/stats/get/deleted', [StatsController::class, 'getDeletedStats']);
    Route::post('/stats/get/offer', [StatsController::class, 'getOfferStats']);
    Route::post('/stats/get/publisher', [StatsController::class, 'getPublisherStats']);
    Route::get('/stats', [StatsController::class, 'show'])->name('stats');
    Route::post('/store-affiliate', [AffiliateController::class, 'store'])->name('register.affiliate');
});

Route::group(['middleware' => ['course.user:course', 'auth.banned']], function () {
    Route::get('/{user:username}/password/reset/', [CoursePasswordController::class, 'showPasswordUpdate'])->name('show.password.update');
    Route::get('/{user:username}/course/reset-password', [CoursePasswordController::class, 'showResetPassword'])->name('show.reset.password');
    Route::get('/courses', [CourseController::class, 'showAllCourses'])->name('all.courses');
    Route::get('/{user:username}/course/{course:slug}', [CourseController::class, 'show'])->name('live.course.page');
    Route::get('/{user:username}/course-page/{course:slug}', [CourseController::class, 'showCourseLander'])->name('live.course.lander');
    Route::get('/{user:username}/course/{course:slug}/checkout', [PurchaseController::class, 'show'])->name('course.checkout');
    Route::get('/pre-register-link-pro', [PageController::class, 'showPreRegister'])->name('pre.register');
    Route::get('/purchase/cancel-checkout', [PurchaseController::class, 'cancelCheckout'])->name('cancel.course.checkout');
    Route::get('/purchase/success', [PurchaseController::class, 'success'])->name('course.purchase.success');
});

Route::get('/{course:slug?}/login', [AuthenticatedSessionController::class, 'create'])->name('login');

Route::post('/custom-login', [AuthenticatedSessionController::class, 'customLoginPost'])->name('customLoginPost');
Route::post('/send-reset-course-password', [CoursePasswordController::class, 'sendResetCoursePassword'])->name('send.reset.course.password');
Route::post('/reset-course-password', [CoursePasswordController::class, 'resetCoursePassword'])->name('reset.course.password');

Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
Route::post('/send-reset-password-email', [PasswordResetLinkController::class, 'store'])->name('password.email');
Route::post('/reset-password-submit', [NewPasswordController::class, 'store'])->name('password.store');

Route::get('/{user:username}/{landing_page:slug}', [LandingPageController::class, 'show'])->name('live.landing.page');
Route::get('/{user:username}/course/{course:slug}/register', [CourseRegisterController::class, 'show'])->name('course.register.show');

Route::post('/mailchimp/subscribe', [MailchimpController::class, 'subscribeToList'])->name('mailchimp.subscribe');

Route::get('/contact', [ContactMailController::class, 'index'])->name('contact');

Route::group(['middleware' => [ProtectAgainstSpam::class]], function () {
    Route::post('/contact/send', [ContactMailController::class, 'contactSendMail'])->name('contact.send');
    Route::post('/course-register', [CourseRegisterController::class, 'store'])->name('course.register.store');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register.user.store');
});

Route::post('/check-recaptcha', [UserVerificationController::class, 'checkRecaptcha'])->name('check.recaptcha');

Route::post('/stripe-webhook', [WebhookController::class, 'receiveWebhookResponse'])->name('stripe.webhook');
Route::post('/stripe-products-webhook', [WebhookController::class, 'receiveProductWebhookResponse'])->name('stripe.products.webhook');
Route::post('/paypal-webhook', [WebhookController::class, 'receivePaypalWebhookResponse'])->name('paypal.webhook');

Route::get('/get-icons', [IconController::class, 'getIcons']);

Route::get('/terms-and-conditions', function () {
    return Inertia::render('Utilities/Terms');
})->name('terms');
Route::get('/privacy-policy', function () {
    return Inertia::render('Utilities/Privacy');
})->name('privacy');

Route::get('/how-it-works', function () {
    return Inertia::render('HowItWorks/Index');
})->name('how-it-works');
Route::get('/setup', function () {
    return Inertia::render('Setup/Index');
})->name('setup.page');

Route::view('/plan-options', 'subscription.public-plans')->name('public.plans');

Route::post('/check-page-auth/{page}', [PageController::class, 'pageAuth'])->name('check.page.auth');
Route::get('/email-subscription/{user}', [UserController::class, 'emailSubscription'])->name('email.subscription');
Route::post('/link-click/{link}', [TrackingController::class, 'storeLinkVisit']);
Route::post('/folder-click/{folder}', [TrackingController::class, 'storeFolderClick']);

Route::get('/{page}', [PageController::class, 'show'])->name('show.live.page');

Route::get('/offers/{offer}/{user}', [OfferController::class, 'redirectToLandingPage'])->name('show.offer.page');

require __DIR__ . '/auth.php';
