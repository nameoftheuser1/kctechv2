<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request){

        $fields = $request->validate([
            'name' => ['required', 'max:50'],
        ]);

        Category::create($fields);


    }
}
