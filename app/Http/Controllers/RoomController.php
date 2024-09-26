<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomType;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Room::query();

        $query->join('room_types', 'rooms.room_type_id', '=', 'room_types.id')
            ->select('rooms.*', 'room_types.name as room_type_name');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('rooms.room_number', 'like', "%{$search}%")
                    ->orWhere('rooms.stay_type', 'like', "%{$search}%")
                    ->orWhere('room_types.name', 'like', "%{$search}%");
            });
        }

        $rooms = $query->latest()->paginate(10);

        return inertia('Rooms/Rooms', [
            'rooms' => $rooms,
            'search' => $request->input('search'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $room_types = RoomType::all();

        return Inertia::render('Rooms/RoomCreate', [
            'room_types' => $room_types,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $fields = $request->validate([
            'room_number' => ['required', 'string', 'max:255', 'unique:rooms'],
            'room_type_id' => ['required', 'exists:room_types,id'],
            'price' => ['required', 'numeric', 'min:0'],
            'pax' => ['required', 'integer', 'min:1'],
            'stay_type' => ['required', 'string', 'in:day tour,overnight'],
        ]);

        Room::create($fields);

        session()->flash('success', 'Room added successfully.');

        return redirect()->route('rooms.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
