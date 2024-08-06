<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'spatie_roles';

    public function users() {
        return $this->hasMany(User::class);
    }

    public function Permissions() {
        return $this->belongsToMany(Permission::class);
    }
}
