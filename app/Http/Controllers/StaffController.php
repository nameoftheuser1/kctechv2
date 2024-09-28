<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Staff::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('salary', 'like', "%{$search}%");
            });
        }

        $staff = $query->latest()->paginate(10);

        $staff->appends(['search' => $request->input('search')]);

        return inertia('Staff/Staff', [
            'staff' => $staff,
            'search' => $request->input('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Staff/StaffCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => ['required', 'max:50', 'regex:/^[\p{L} ]+$/u'],
            'salary' => ['required', 'numeric', 'min:0'],
            'payout_date' => ['required', 'date', 'date_format:Y-m-d'],
        ]);

        Staff::create($fields);

        session()->flash('success', 'Staff added successfully.');

        return redirect()->route('staff.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        $currentMonth = now()->month;
        $currentYear = now()->year;

        $advanceSalaries = $staff->advanceSalaries()
            ->whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->paginate(10);

        return Inertia::render('Staff/StaffShow', [
            'staff' => $staff,
            'advanceSalaries' => $advanceSalaries,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff)
    {
        return Inertia::render('Staff/StaffEdit', [
            'staff' => $staff,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Staff $staff)
    {
        $fields = $request->validate([
            'name' => ['required', 'max:50', 'regex:/^[\p{L} ]+$/u'],
            'salary' => ['required', 'numeric', 'min:0'],
            'payout_date' => ['required', 'date', 'date_format:Y-m-d'],
        ]);

        $staff->update($fields);

        session()->flash('success', 'Staff updated successfully.');

        return redirect()->route('staff.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        $staff->delete();

        session()->flash('deleted', 'Staff updated successfully.');

        return redirect()->route('staff.index');

    }
}
