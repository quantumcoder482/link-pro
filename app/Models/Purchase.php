<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
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

    public function User() {
        return $this->belongsTo(User::class);
    }

    public function Course() {
        return $this->belongsTo(Course::class);
    }

    public function OfferClick() {
        return $this->belongsTo(OfferClick::class);
    }
}
