<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\UUID;

class OfferClick extends Model
{
    use HasFactory, UUID;

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

    public function offer() {
        return $this->belongsTo(Offer::class);
    }

    public function purchases() {
        return $this->hasOne(Purchase::class);
    }

    public function users() {
        return $this->hasOne(User::class, 'referral_id');
    }
}
