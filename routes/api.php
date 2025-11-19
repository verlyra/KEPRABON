<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// base_url/api/auth/login
Route::prefix('auth')->group(function () {
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
});

Route::middleware(['tokenValidator'])->group(function () {

    Route::get('/test', function (Request $request) {
        return response()->json([
            'message' => 'Token valid, akses diterima.',
            'user' => $request->headers->get('Authorization'),
        ]);
    });

    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index']);

    Route::prefix('statistic')->group(function () {
        //isi statistic
    });
});