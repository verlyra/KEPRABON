<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['hmacValidator'])->group(function () {

    // base_url/api/auth/login
    Route::prefix('auth')->group(function () {
        Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    });

    Route::middleware(['tokenValidator'])->group(function () {

<<<<<<< HEAD
    Route::get('/statistic', [\App\Http\Controllers\DashboardController::class, 'statistic']);
    
    Route::prefix('master')->group(function () {
        Route::prefix('cabang')->group(function () {
            Route::get('/list', [\App\Http\Controllers\MasterCabangController::class, 'list']);
            Route::post('/store', [\App\Http\Controllers\MasterCabangController::class, 'store']);
            Route::put('/update', [\App\Http\Controllers\MasterCabangController::class, 'update']);
            Route::delete('/delete', [\App\Http\Controllers\MasterCabangController::class, 'delete']);
        });
        Route::prefix('tipe-penjualan')->group(function () {
            Route::get('/list', [\App\Http\Controllers\MasterTipePenjualanController::class, 'list']);
            Route::post('/store', [\App\Http\Controllers\MasterTipePenjualanController::class, 'store']);
            Route::put('/update', [\App\Http\Controllers\MasterTipePenjualanController::class, 'update']);
            Route::delete('/delete', [\App\Http\Controllers\MasterTipePenjualanController::class, 'delete']);
        });
        Route::prefix('pembayaran')->group(function () {
            Route::get('/list', [\App\Http\Controllers\MasterPembayaranController::class, 'list']);
            Route::post('/store', [\App\Http\Controllers\MasterPembayaranController::class, 'store']);
            Route::put('/update', [\App\Http\Controllers\MasterPembayaranController::class, 'update']);
            Route::delete('/delete', [\App\Http\Controllers\MasterPembayaranController::class, 'delete']);
        });Route::prefix('items')->group(function () {
            Route::get('/list', [\App\Http\Controllers\MasterItemsController::class, 'list']);
            Route::post('/store', [\App\Http\Controllers\MasterItemsController::class, 'store']);
            Route::put('/update', [\App\Http\Controllers\MasterItemsController::class, 'update']);
            Route::delete('/delete', [\App\Http\Controllers\MasterItemsController::class, 'delete']);
        });
        Route::prefix('users')->group(function () {
            Route::get('/list', [\App\Http\Controllers\MasterUserController::class, 'list']);
            Route::post('/store', [\App\Http\Controllers\MasterUserController::class, 'store']);
            Route::put('/update', [\App\Http\Controllers\MasterUserController::class, 'update']);
            Route::delete('/delete', [\App\Http\Controllers\MasterUserController::class, 'delete']);
        });
    });
    Route::prefix('transaction')->group(function () {
        Route::get('/list', [\App\Http\Controllers\TransactionController::class, 'index']); 
        Route::get('/detail', [\App\Http\Controllers\TransactionController::class, 'detail']);
        Route::get('/form', [\App\Http\Controllers\TransactionController::class, 'form']);
        Route::post('/store', [\App\Http\Controllers\TransactionController::class, 'store']);
        Route::put('/update', [\App\Http\Controllers\TransactionController::class, 'update']);
        Route::delete('/delete', [\App\Http\Controllers\TransactionController::class, 'delete']);
    });
    Route::get('/laporan', [\App\Http\Controllers\LaporanController::class, 'laporan']);
=======
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
                Route::get('/list', [\App\Http\Controllers\MasterTipePenjualanController::class, 'list']);
                Route::post('/store', [\App\Http\Controllers\MasterTipePenjualanController::class, 'store']);
                Route::put('/update', [\App\Http\Controllers\MasterTipePenjualanController::class, 'update']);
                Route::delete('/delete', [\App\Http\Controllers\MasterTipePenjualanController::class, 'delete']);
            });
            Route::prefix('pembayaran')->group(function () {
                Route::get('/list', [\App\Http\Controllers\MasterPembayaranController::class, 'list']);
                Route::post('/store', [\App\Http\Controllers\MasterPembayaranController::class, 'store']);
                Route::put('/update', [\App\Http\Controllers\MasterPembayaranController::class, 'update']);
                Route::delete('/delete', [\App\Http\Controllers\MasterPembayaranController::class, 'delete']);
            });Route::prefix('items')->group(function () {
                Route::get('/list', [\App\Http\Controllers\MasterItemsController::class, 'list']);
                Route::post('/store', [\App\Http\Controllers\MasterItemsController::class, 'store']);
                Route::put('/update', [\App\Http\Controllers\MasterItemsController::class, 'update']);
                Route::delete('/delete', [\App\Http\Controllers\MasterItemsController::class, 'delete']);
            });
            Route::prefix('users')->group(function () {
                Route::get('/list', [\App\Http\Controllers\MasterUserController::class, 'list']);
                Route::post('/store', [\App\Http\Controllers\MasterUserController::class, 'store']);
                Route::put('/update', [\App\Http\Controllers\MasterUserController::class, 'update']);
                Route::delete('/delete', [\App\Http\Controllers\MasterUserController::class, 'delete']);
            });
        });
        Route::prefix('transaction')->group(function () {
            Route::get('/list', [\App\Http\Controllers\TransactionController::class, 'index']); 
            Route::get('/detail', [\App\Http\Controllers\TransactionController::class, 'detail']);
            Route::get('/form', [\App\Http\Controllers\TransactionController::class, 'form']);
            Route::post('/store', [\App\Http\Controllers\TransactionController::class, 'store']);
            Route::put('/update', [\App\Http\Controllers\TransactionController::class, 'update']);
            Route::delete('/delete', [\App\Http\Controllers\TransactionController::class, 'delete']);
        });
        Route::get('/laporan', [\App\Http\Controllers\LaporanController::class, 'laporan']);
    });
>>>>>>> 68bee562997a76cbabacaefa4eccbb8789f78975
});