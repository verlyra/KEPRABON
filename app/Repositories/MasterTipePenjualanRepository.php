<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MasterTipePenjualanRepository
{
    public function getAllTipePenjualan()
    {
        return DB::select("SELECT id_tipe_penjualan as value, nama_tipe_penjualan as label FROM MASTER_TIPE_PENJUALAN");
    }

    public function storeTipePenjualan(string $tipePenjualan): bool
    {
        return DB::insert("INSERT INTO MASTER_TIPE_PENJUALAN (nama_tipe_penjualan) VALUES (?)", [$tipePenjualan]);
    }

    public function updateTipePenjualan(int $idTipePenjualan, string $tipePenjualan): bool
    {
        return DB::update("UPDATE MASTER_TIPE_PENJUALAN SET nama_tipe_penjualan = ? WHERE id_tipe_penjualan = ?", [$tipePenjualan, $idTipePenjualan]);
    }

    public function deleteTipePenjualan(int $idTipePenjualan): bool
    {
        return DB::delete("DELETE FROM MASTER_TIPE_PENJUALAN WHERE id_tipe_penjualan = ?", [$idTipePenjualan]);
    }
}