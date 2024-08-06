<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'header_img',
        'profile_img',
        'title',
        'bio',
        'is_protected',
        'password',
        'default',
        'disabled',
        'profile_layout',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function links() {
        return $this->hasMany(Link::class);
    }

    public function folders() {
        return $this->hasMany(Folder::class);
    }

    public function pageVisits() {
        return $this->hasMany(PageVisit::class);
    }

    public function getPageCountAttribute() {
        $user = $this->user()->get();
        $pageCount = count(Page::where('user_id', $user[0]->id)->get());
        return "{$pageCount}";
    }

    public $additional_attributes = ['page_count'];
    /*public function getRouteKeyName() {
        return 'name';
    }*/
}
