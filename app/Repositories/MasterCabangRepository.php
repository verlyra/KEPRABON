<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MasterCabangRepository
{
    public function getAllCabang()
    {
        return DB::select("SELECT id_cabang as value, nama_cabang as label FROM MASTER_CABANG");
    }

    public function storeCabang(string $cabang): bool
    {
        return DB::insert("INSERT INTO MASTER_CABANG (nama_cabang) VALUES (?)", [$cabang]);
    }

    public function updateCabang(int $idCabang, string $cabang): bool
    {
        return DB::update("UPDATE MASTER_CABANG SET nama_cabang = ? WHERE id_cabang = ?", [$cabang, $idCabang]);
    }

    public function deleteCabang(int $idCabang): bool
    {
        return DB::delete("DELETE FROM MASTER_CABANG WHERE id_cabang = ?", [$idCabang]);
    }
}