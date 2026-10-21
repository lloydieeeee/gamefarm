<?php

use App\Http\Controllers\AdminPaymentController;
use App\Http\Controllers\Appointment\AdminAppointmentController;
use App\Http\Controllers\Appointment\AppointmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Bloodline\AdminBloodlineController;
use App\Http\Controllers\Gamecock\AdminGamecockController;
use App\Http\Controllers\Gamecock\GamecockController;
use App\Http\Controllers\Maturity\AdminMaturityController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:admin')->group(function () {
    Route::redirect('admin', '/admin/login');

    Route::get('admin/login', [AuthenticatedSessionController::class, 'create'])
        ->name('admin.login');

    Route::post('admin/login', [AuthenticatedSessionController::class, 'store'])
        ->name('admin.login.store');

    Route::get('admin/forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('admin.password.request');

    Route::post('admin/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('admin.password.email');

    Route::get('admin/reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('admin.password.reset');

    Route::post('admin/reset-password', [NewPasswordController::class, 'store'])
        ->name('admin.password.update');
});

Route::middleware(['auth:admin', 'verified'])->group(function () {
    Route::inertia('admin/dashboard', 'dashboard')->name('admin.dashboard');

    Route::get('admin/appointments', [AdminAppointmentController::class, 'index'])
        ->name('admin.appointments.index');

    Route::patch('admin/appointments/{appointment}/approve', [AdminAppointmentController::class, 'approve'])
        ->name('admin.appointments.approve');

    Route::patch('admin/appointments/{appointment}/cancel', [AdminAppointmentController::class, 'cancel'])
        ->name('admin.appointments.cancel');

    Route::get('admin/bloodlines', [AdminBloodlineController::class, 'index'])
        ->name('admin.bloodlines.index');

    Route::get('admin/bloodlines/create', [AdminBloodlineController::class, 'create'])
        ->name('admin.bloodlines.create');

    Route::post('admin/bloodlines', [AdminBloodlineController::class, 'store'])
        ->name('admin.bloodlines.store');

    Route::get('admin/bloodlines/{bloodline}/edit', [AdminBloodlineController::class, 'edit'])
        ->name('admin.bloodlines.edit');

    Route::patch('admin/bloodlines/{bloodline}', [AdminBloodlineController::class, 'update'])
        ->name('admin.bloodlines.update');

    Route::delete('admin/bloodlines/{bloodline}', [AdminBloodlineController::class, 'destroy'])
        ->name('admin.bloodlines.destroy');

    Route::get('admin/gamecocks', [AdminGamecockController::class, 'index'])
        ->name('admin.gamecocks.index');

    Route::get('admin/gamecocks/create', [AdminGamecockController::class, 'create'])
        ->name('admin.gamecocks.create');

    Route::post('admin/gamecocks', [AdminGamecockController::class, 'store'])
        ->name('admin.gamecocks.store');

    Route::get('admin/gamecocks/{gamecock}/edit', [AdminGamecockController::class, 'edit'])
        ->name('admin.gamecocks.edit');

    Route::patch('admin/gamecocks/{gamecock}', [AdminGamecockController::class, 'update'])
        ->name('admin.gamecocks.update');

    Route::delete('admin/gamecocks/{gamecock}', [AdminGamecockController::class, 'destroy'])
        ->name('admin.gamecocks.destroy');

    Route::get('admin/maturities', [AdminMaturityController::class, 'index'])
        ->name('admin.maturities.index');

    Route::get('admin/maturities/create', [AdminMaturityController::class, 'create'])
        ->name('admin.maturities.create');

    Route::post('admin/maturities', [AdminMaturityController::class, 'store'])
        ->name('admin.maturities.store');

    Route::get('admin/maturities/{maturity}/edit', [AdminMaturityController::class, 'edit'])
        ->name('admin.maturities.edit');

    Route::patch('admin/maturities/{maturity}', [AdminMaturityController::class, 'update'])
        ->name('admin.maturities.update');

    Route::delete('admin/maturities/{maturity}', [AdminMaturityController::class, 'destroy'])
        ->name('admin.maturities.destroy');

    Route::get('admin/payments', [AdminPaymentController::class, 'index'])
        ->name('admin.payments.index');

    Route::get('admin/confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('admin.password.confirm');

    Route::post('admin/confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('admin/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('admin.logout');
});

Route::inertia('/', 'home')->name('home');

Route::get('gamecocks', [GamecockController::class, 'index'])->name('gamecocks');

Route::middleware(['auth'])->group(function () {
    Route::post('appointments', [AppointmentController::class, 'store'])
        ->name('appointments.store');
});

require __DIR__.'/settings.php';
