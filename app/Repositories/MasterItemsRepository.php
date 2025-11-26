<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MasterItemsRepository
{
    public function getAllItems()
    {
        return DB::select("SELECT id_item as id, nama_item as nama, harga_item as harga FROM MASTER_ITEMS");
    }

    public function storeItem(string $namaItem, float $hargaItem): bool
    {
        return DB::insert("INSERT INTO MASTER_ITEMS (nama_item, harga_item) VALUES (?, ?)", [$namaItem, $hargaItem]);
    }

    public function updateItem(int $idItem, string $namaItem, float $hargaItem): bool
    {
        return DB::update("UPDATE MASTER_ITEMS SET nama_item = ?, harga_item = ? WHERE id_item = ?", [$namaItem, $hargaItem, $idItem]);
    }

    public function deleteItem(int $idItem): bool
    {
        return DB::delete("DELETE FROM MASTER_ITEMS WHERE id_item = ?", [$idItem]);
    }
}