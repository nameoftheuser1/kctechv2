<?php

namespace App\Http\Controllers;

use App\Models\AdvanceSalary;
use App\Http\Requests\StoreAdvanceSalaryRequest;
use App\Http\Requests\UpdateAdvanceSalaryRequest;
use App\Models\Staff;
use Illuminate\Http\Request;

class AdvanceSalaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Staff $staff)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Staff $staff,Request $request)
    {
        $fields = $request->validate([
            'amount' => 'required|numeric',
            'date' => 'required|date',
        ]);

        $staff->advanceSalaries()->create($fields);

        session()->flash('success', 'Advance salary added successfully.');

        return redirect()->route('staff.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(AdvanceSalary $advanceSalary)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdvanceSalary $advanceSalary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AdvanceSalary $advanceSalary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdvanceSalary $advanceSalary)
    {
        //
    }
}
