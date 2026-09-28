<?php

use App\Http\Controllers\Settings\AdminProfileController;
use App\Http\Controllers\Settings\AdminSecurityController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');
});

Route::middleware(['auth:admin'])->group(function () {
    Route::redirect('settings', '/admin/settings/profile');

    Route::get('admin/settings/profile', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('admin/settings/profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
});

Route::middleware(['auth:admin', 'verified'])->group(function () {
    Route::delete('admin/settings/profile', [AdminProfileController::class, 'destroy'])->name('admin.profile.destroy');

    Route::get('admin/settings/security', [AdminSecurityController::class, 'edit'])
        ->name('admin.security.edit');

    Route::put('admin/settings/password', [AdminSecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('admin-password.update');

    Route::inertia('admin/settings/appearance', 'settings/appearance')->name('admin.appearance.edit');
});