<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MasterPembayaranRepository
{
    public function getAllPembayaran()
    {
        return DB::select("SELECT id_pembayaran as value, nama_pembayaran as label FROM MASTER_PEMBAYARAN");
    }

    public function storePembayaran(string $pembayaran): bool
    {
        return DB::insert("INSERT INTO MASTER_PEMBAYARAN (nama_pembayaran) VALUES (?)", [$pembayaran]);
    }

    public function updatePembayaran(int $idPembayaran, string $pembayaran): bool
    {
        return DB::update("UPDATE MASTER_PEMBAYARAN SET nama_pembayaran = ? WHERE id_pembayaran = ?", [$pembayaran, $idPembayaran]);
    }

    public function deletePembayaran(int $idPembayaran): bool
    {
        return DB::delete("DELETE FROM MASTER_PEMBAYARAN WHERE id_pembayaran = ?", [$idPembayaran]);
    }
}