<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class StatisticRepository
{
    public function omset_penjualan(): Collection
    {
        $data = DB::select("SELECT
                DATE(p.tanggal_beli) AS label,
                SUM(d.kuantitas * d.harga) AS value
            FROM trx_penjualan p
            JOIN trx_detail_penjualan d 
                ON p.id_penjualan = d.id_penjualan
            GROUP BY DATE(p.tanggal_beli)
            ORDER BY 1 desc");
        
        return collect($data);
    }

    public function transaksi_harian(): Collection
    {
        $data = DB::select("SELECT
                DATE(p.tanggal_beli) AS label,
                SUM(d.kuantitas * d.harga) AS value
            FROM trx_penjualan p
            JOIN trx_detail_penjualan d 
                ON p.id_penjualan = d.id_penjualan
            GROUP BY DATE(p.tanggal_beli)
            ORDER BY 1 desc");

        return collect($data);
    }

    public function produk_terlaris(): Collection
    {
        $data = DB::select("SELECT
                i.nama_item as label,
                SUM(d.kuantitas) AS value
            FROM trx_detail_penjualan d
            JOIN master_items i 
                ON d.id_item = i.id_item
            GROUP BY d.id_item, i.nama_item
            ORDER BY 2 DESC
            LIMIT 10");

        return collect($data);
    }

    public function performa_cabang(): Collection
    {
        $data = DB::select("SELECT
                c.nama_cabang as label,
                SUM(d.kuantitas * d.harga) AS value
            FROM trx_penjualan p
            JOIN trx_detail_penjualan d 
                ON p.id_penjualan = d.id_penjualan
            JOIN master_cabang c 
                ON p.id_cabang = c.id_cabang
            GROUP BY c.id_cabang, c.nama_cabang
            ORDER BY 2 DESC");

        return collect($data);
    }

    public function forecasting_penjualan(): Collection
    {
        $data = DB::select("SELECT
                DATE(p.tanggal_beli) AS label,
                SUM(d.kuantitas * d.harga) AS value
            FROM trx_penjualan p
            JOIN trx_detail_penjualan d 
                ON p.id_penjualan = d.id_penjualan
            WHERE p.tanggal_beli >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY DATE(p.tanggal_beli)
            ORDER BY 1");

        return collect($data);
    }
}