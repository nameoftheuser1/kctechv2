<?php

namespace App\Http\Controllers;

use App\Models\StaffMember;
use App\Http\Requests\StoreStaffMemberRequest;
use App\Http\Requests\UpdateStaffMemberRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = StaffMember::query();

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

        StaffMember::create($fields);

        session()->flash('success', 'Staff added successfully.');

        return redirect()->route('staff.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(StaffMember $staffMember)
    {
        $currentMonth = now()->month;
        $currentYear = now()->year;

        $advanceSalaries = $staffMember->advanceSalaries()
            ->whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->paginate(10);

        return Inertia::render('Staff/StaffShow', [
            'staff' => $staffMember,
            'advanceSalaries' => $advanceSalaries,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StaffMember $staffMember)
    {
        return Inertia::render('Staff/StaffEdit', [
            'staff' => $staffMember,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StaffMember $staffMember)
    {
        $fields = $request->validate([
            'name' => ['required', 'max:50', 'regex:/^[\p{L} ]+$/u'],
            'salary' => ['required', 'numeric', 'min:0'],
            'payout_date' => ['required', 'date', 'date_format:Y-m-d'],
        ]);

        $staffMember->update($fields);

        session()->flash('success', 'Staff updated successfully.');

        return redirect()->route('staff.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StaffMember $staffMember)
    {
        $staffMember->delete();

        session()->flash('deleted', 'Staff updated successfully.');

        return redirect()->route('staff.index');

    }
}
