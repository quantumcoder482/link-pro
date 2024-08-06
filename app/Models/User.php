<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Link as Link;
use App\Models\Page as Page;
use App\Models\Referral as Referral;
use Mchev\Banhammer\Models\Ban;
use Spatie\Permission\Traits\HasRoles;
use TCG\Voyager\Models\User as VoyagerUser;
use Mchev\Banhammer\Traits\Bannable;

class User extends \TCG\Voyager\Models\User
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, Bannable;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /** Relationships **/

    public function pages(){
        return $this->hasMany(Page::class);
    }

    public function links(){
        return $this->hasMany(Link::class);
    }

    public function folders(){
        return $this->hasMany(Folder::class);
    }

    public function linkVisits() {
        return $this->hasManyThrough(LinkVisit::class, Link::class);
    }

    public function pageVisits() {
        return $this->hasManyThrough(PageVisit::class, Page::class);
    }

    public function subscriptions() {
        return $this->hasOne(Subscription::class);
    }

    public function referrals(){
        return $this->hasMany(Referral::class);
    }

    public function ShopifyStores() {
        return $this->hasMany(ShopifyStore::class);
    }

    public function LandingPages() {
        return $this->hasOne(LandingPage::class);
    }

    public function LandingPageSections() {
        return $this->hasMany(LandingPageSection::class);
    }

    public function Courses() {
        return $this->hasMany(Course::class);
    }

    public function Offers() {
        return $this->hasMany(Offer::class);
    }

    public function OfferClicks() {
        return $this->hasMany(OfferClick::class, 'referral_id');
    }

    public function Purchases() {
        return $this->hasMany(Purchase::class);
    }

    public function Affiliates() {
        return $this->hasOne(Affiliate::class);
    }

    public function Banned() {
        return $this->hasMany(Ban::class);
    }

    public function UserIpAddress() {
        return $this->hasMany(UserIpAddress::class);
    }

    /** Other Functions **/

    public function getRedirectRoute(): \Symfony\Component\HttpFoundation\Response|\Illuminate\Http\RedirectResponse {
        $loginURL = url()->previous();
        $roles = $this->getRoleNames();
        $previousURL = Session::get( 'url.intended' );

        $courseID = isset($_GET['course']) ? $_GET['course'] : null;
        $course = null;
        if ($courseID) {
            $course = Course::findOrFail($courseID);
            $creator = User::where('id', '=', $course->user_id)->get()->pluck('username');
        }

        if ( $previousURL ) {
            return Inertia::location($previousURL);
        }

        if ($roles->contains('admin')) {

            if ($course) {
                return Inertia::location('/' . $creator[0] . '/course/' . $course->slug);
            } else if (str_contains($loginURL, "admin")) {
                return to_route( 'admin' );
            }

        } else if ($roles->contains("course.user") && $roles->contains('lp.user')) {

            if ($course) {
                return Inertia::location('/' . $creator[0] . '/course/' . $course->slug);
            }

        } else if ($roles->contains('lp.user')) {

            $userPages = $this->pages()->get();

            if ( $userPages->isEmpty() ) {
                return to_route( 'create.page' );
            }

        } else if ($roles->contains("course.user")) {

            if ($course) {
                return Inertia::location('/' . $creator[0] . '/course/' . $course->slug);
            } else {
                return to_route('all.courses');
            }
        }

        $pageID = $this->pages()->where('default', '=', 1)->pluck('id')->first();
        return Inertia::location('/dashboard/pages/' . $pageID);
        //return to_route( 'dashboard' );
    }
}
