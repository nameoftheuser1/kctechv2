<?php

use App\Http\Controllers\AdvanceSalaryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StaffMemberController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');


Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'LoginPage')->name('login.show');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/change-password', [AuthController::class, 'changePassword'])->name('change-password');

    Route::resource('/rooms', RoomController::class);
    Route::delete('/rooms/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');
    Route::resource('/roomtypes', RoomTypeController::class);
    Route::delete('/roomtypes/{roomType}', [RoomTypeController::class, 'destroy'])->name('roomtypes.destroy');
    Route::resource('/staff', StaffMemberController::class);
    Route::post('/staff', [StaffMemberController::class, 'store'])->name('staff.store');
    Route::delete('/staff/{staff}', [StaffMemberController::class, 'destroy'])->name('staff.destroy');
    Route::resource('/salaries', AdvanceSalaryController::class);
    Route::post('/staff/salaries/{staff}', [AdvanceSalaryController::class, 'store'])->name('salary.store');
    Route::resource('/expenses', ExpenseController::class);
    Route::post('/room-types/{roomTypeId}/images', [RoomTypeController::class, 'addImages'])
     ->name('room-images.add');
});
