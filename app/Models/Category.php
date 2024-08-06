<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'parent_id',
        'name',
    ];

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = ['created_at', 'updated_at'];

    public function courses() {
        return $this->belongsToMany(Course::class, 'category_course', 'category_id', 'course_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
