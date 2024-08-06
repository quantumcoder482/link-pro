<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'price' => 'float'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function Course() {
        return $this->belongsTo(Course::class);
    }

    public function OfferClicks() {
        return $this->hasMany(OfferClick::class);
    }

    public function purchases() {
        return $this->hasManyThrough(Purchase::class, OfferClick::class);
    }
}
