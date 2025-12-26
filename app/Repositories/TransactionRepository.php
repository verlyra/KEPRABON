<?php

namespace App\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionRepository
{
    public function getAllTransaction()
    {
        return DB::select("SELECT * FROM TRX_PENJUALAN");
    }

    public function storeTransaction(int $id_cabang, int $id_tipe_penjualan, int $id_pembayaran, string $tanggal_beli, string|null $nama_pembeli, string|null $telp_pembeli, array $items, string $nip): bool
    {
        DB::beginTransaction();
        try {
            $id_trx = DB::table('TRX_PENJUALAN')->insertGetId([
                'id_cabang' => $id_cabang,
                'id_tipe_penjualan' => $id_tipe_penjualan,
                'id_pembayaran' => $id_pembayaran,
                'tanggal_beli' => Carbon::createFromFormat('d-m-Y', $tanggal_beli)->format('Y-m-d 00:00:00'),
                'nama_pembeli' => $nama_pembeli,
                'telp_pembeli' => $telp_pembeli,
                'nip' => $nip
            ]);

            foreach ($items as $item) {
                DB::table('TRX_DETAIL_PENJUALAN')->insert([
                    'id_penjualan' => $id_trx,
                    'id_item' => $item['id_item'],
                    'kuantitas' => $item['kuantitas'],
                    'harga' => $item['harga']
                ]);
            }   

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
