<?php

namespace App\Services;

use App\Repositories\MasterItemsRepository;
use App\Repositories\TransactionRepository;
use App\Repositories\MasterTipePenjualanRepository;
use App\Repositories\MasterPembayaranRepository;
use App\Repositories\MasterCabangRepository;

class TransactionService
{
    public function __construct(
        protected TransactionRepository $transactionRepository,
        protected MasterItemsRepository $masterItemsRepository,
        protected MasterTipePenjualanRepository $masterTipePenjualanRepository,
        protected MasterPembayaranRepository $masterPembayaranRepository,
        protected MasterCabangRepository $masterCabangRepository
    ){}

    public function form(): array
    {
        $items = $this->masterItemsRepository->getAllItems();
        $tipePenjualan = $this->masterTipePenjualanRepository->getAllTipePenjualan();
        $pembayaran = $this->masterPembayaranRepository->getAllPembayaran();
        $cabang = $this->masterCabangRepository->getAllCabang();

        return [
            'items' => $items,
            'tipe_penjualan' => $tipePenjualan,
            'pembayaran' => $pembayaran,
            'cabang' => $cabang
        ];
    }

    public function store(int $id_cabang, int $id_tipe_penjualan, int $id_pembayaran, string $tanggal_beli, string|null $nama_pembeli, string|null $telp_pembeli, array $items, string $nip): bool    
    {
        return $this->transactionRepository->storeTransaction($id_cabang, $id_tipe_penjualan, $id_pembayaran, $tanggal_beli, $nama_pembeli, $telp_pembeli, $items, $nip);
    }
}