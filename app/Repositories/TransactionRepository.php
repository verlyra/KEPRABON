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

    public function getTransactionsByRange(string $startDate, string $endDate)
    {
        return DB::select(
            "SELECT
                a.id_penjualan,  
                a.id_cabang, 
                b.nama_cabang, 
                a.id_tipe_penjualan, 
                c.nama_tipe_penjualan, 
                a.id_pembayaran, 
                d.nama_pembayaran, 
                DATE_FORMAT(a.tanggal_beli, '%d-%m-%Y') as tanggal_beli, 
                a.nama_pembeli, 
                a.telp_pembeli,
                sum(e.kuantitas*e.harga) as total
            FROM trx_penjualan a 
            JOIN master_cabang b on a.id_cabang = b.id_cabang
            JOIN master_tipe_penjualan c on a.id_tipe_penjualan = c.id_tipe_penjualan
            JOIN master_pembayaran d on a.id_pembayaran = d.id_pembayaran
            JOIN trx_detail_penjualan e on a.id_penjualan = e.id_penjualan
            WHERE a.tanggal_beli BETWEEN ? AND ?
            GROUP BY 
                a.id_penjualan,
                a.id_cabang,
                b.nama_cabang,
                a.id_tipe_penjualan,
                c.nama_tipe_penjualan,
                a.id_pembayaran,
                d.nama_pembayaran,
                a.tanggal_beli,
                a.nama_pembeli,
                a.telp_pembeli",
            [$startDate, $endDate]
        );
    }

    public function getDetailByPenjualanId(int $id_penjualan)
{
    return DB::select(
            "SELECT 
                a.id_item,
                b.nama_item,
                a.kuantitas,
                a.harga
            FROM trx_detail_penjualan a
            JOIN master_items b 
                ON a.id_item = b.id_item
            WHERE a.id_penjualan = ?",
            [$id_penjualan]
        );
    }
}
