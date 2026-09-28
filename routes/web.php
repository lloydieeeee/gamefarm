<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Gamecock\AdminGamecockController;
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

    Route::get('admin/gamecocks', [AdminGamecockController::class, 'index'])
        ->name('admin.gamecocks.index');

    Route::get('admin/confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('admin.password.confirm');

    Route::post('admin/confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('admin/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('admin.logout');
});

Route::inertia('/', 'home')->name('home');

require __DIR__.'/settings.php';
