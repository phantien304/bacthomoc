<?php

namespace App\Http\Controllers\Api;

use App\models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    public function index(){
        return Post::all();
    }
}
