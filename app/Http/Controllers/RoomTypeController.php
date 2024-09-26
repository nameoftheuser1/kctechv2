<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{
    public function store(Request $request){
        $fields = $request->validate([
            'name' => ['required', 'max:50']
        ]);

        RoomType::create($fields);
    }
}
