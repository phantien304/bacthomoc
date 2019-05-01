<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';
    protected $fillable = ['id','author_create','post_status','thumbnail','category_id','post_type','view_count','comment_count','pin_home','post_parent'];
}
