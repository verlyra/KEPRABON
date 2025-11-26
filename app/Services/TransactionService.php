<?php

namespace App\Services;

use App\Repositories\MasterItemsRepository;
// use App\Repositories\TransactionRepository;
use App\Repositories\MasterTipePenjualanRepository;
use App\Repositories\MasterPembayaranRepository;
use App\Repositories\MasterCabangRepository;

class TransactionService
{
    public function __construct(
        // protected TransactionRepository $transactionRepository,
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
}