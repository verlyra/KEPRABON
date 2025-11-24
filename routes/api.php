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
    
    Route::prefix('master')->group(function () {
        Route::prefix('cabang')->group(function () {
            Route::get('/list', [\App\Http\Controllers\MasterCabangController::class, 'list']);
            Route::post('/store', [\App\Http\Controllers\MasterCabangController::class, 'store']);
            Route::put('/update', [\App\Http\Controllers\MasterCabangController::class, 'update']);
            Route::delete('/delete', [\App\Http\Controllers\MasterCabangController::class, 'delete']);
        });
        Route::prefix('tipe-penjualan')->group(function () {
        //isi statistic
        });
        Route::prefix('pembayaran')->group(function () {
        //isi statistic
        });Route::prefix('items')->group(function () {
        //isi statistic
        });
    }); 
       
});