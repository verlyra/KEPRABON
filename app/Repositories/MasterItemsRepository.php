<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MasterItemsRepository
{
    public function getAllItems()
    {
        return DB::select("SELECT id_item as id, nama_item as nama, harga_item as harga FROM MASTER_ITEM");
    }

    public function storeItem(string $namaItem, float $hargaItem): bool
    {
        return DB::insert("INSERT INTO MASTER_ITEM (nama_item, harga_item) VALUES (?, ?)", [$namaItem, $hargaItem]);
    }

    public function updateItem(int $idItem, string $namaItem, float $hargaItem): bool
    {
        return DB::update("UPDATE MASTER_ITEM SET nama_item = ?, harga_item = ? WHERE id_item = ?", [$namaItem, $hargaItem, $idItem]);
    }

    public function deleteItem(int $idItem): bool
    {
        return DB::delete("DELETE FROM MASTER_ITEM WHERE id_item = ?", [$idItem]);
    }
}