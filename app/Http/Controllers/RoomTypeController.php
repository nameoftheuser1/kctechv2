<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use App\Http\Controllers\Controller;
use App\Models\RoomImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RoomTypeController extends Controller
{
    public function index(Request $request)
    {
        $query = RoomType::query()->with('roomImages');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $roomTypes = $query->latest()->paginate(10);
        $roomTypes->appends(['search' => $request->input('search')]);

        if ($request->wantsJson()) {
            return response()->json($roomTypes);
        }

        return Inertia::render('RoomTypes/RoomTypes', [
            'roomTypes' => $roomTypes,
            'search' => $request->input('search'),
        ]);
    }

    public function show(RoomType $roomType)
    {
        $roomType->load('roomImages');

        return Inertia::render('RoomTypes/TypeShow', [
            'roomType' => [
                'id' => $roomType->id,
                'name' => $roomType->name,
                'room_images' => $roomType->roomImages->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image_path' => $image->image_path,
                    ];
                }),
            ],
        ]);
    }


    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => ['required', 'max:50']
        ]);

        $roomType = RoomType::create($fields);

        session()->flash('success', 'Room type added successfully.');

        return Inertia::location(route('roomtypes.index'));
    }


    public function destroy(RoomType $roomType)
    {
        $roomType->delete();

        session()->flash('deleted', 'Room type deleted successfully.');
        redirect('/');
    }



    public function addImages(Request $request, $roomTypeId)
    {
        $validator = Validator::make($request->all(), [
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return Inertia::render('YourComponent', [
                'errors' => $validator->errors(),
            ]);
        }

        $roomType = RoomType::findOrFail($roomTypeId);

        $images = $request->file('images');
        $roomImages = [];

        foreach ($images as $image) {
            $path = $image->store('room_images', 'public');
            $roomImages[] = new RoomImage(['path_url' => $path, 'room_types_id' => $roomType->id]);
        }

        $roomType->roomImages()->saveMany($roomImages);

        return redirect()->route('room-types.show', $roomTypeId)->with('message', 'Images added successfully!');
    }
}
