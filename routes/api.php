<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// base_url/api/auth/login
Route::prefix('auth')->group(function () {
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
});

Route::middleware(['tokenValidator'])->group(function () {

    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index']);
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    Route::prefix('statistic')->group(function () {
        //isi statistic
    });
});