<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleHasPermission extends Model
{
    use HasFactory;

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = ['created_at', 'updated_at'];

    protected $fillable = [
        'spatie_role_id',
        'spatie_permission_id'
    ];

    public function Roles() {
        return $this->hasMany(Role::class);
    }

    public function Permissions() {
        return $this->hasMany(Permission::class);
    }
}
