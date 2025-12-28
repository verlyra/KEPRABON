<?php

namespace App\Services;

use Carbon\Carbon;
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

    public function getTransactions(string $startDate, string $endDate)
    {
        // Format input d-m-Y menjadi Y-m-d untuk query database
        $start = Carbon::createFromFormat('d-m-Y', $startDate)->format('Y-m-d 00:00:00');
        $end = Carbon::createFromFormat('d-m-Y', $endDate)->format('Y-m-d 23:59:59');

        return $this->transactionRepository->getTransactionsByRange($start, $end);
    }

    public function getDetail(int $id_penjualan)
    {
        return $this->transactionRepository->getDetailByPenjualanId($id_penjualan);
    }

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

    public function update(int $id_penjualan, int $id_cabang, int $id_tipe_penjualan, int $id_pembayaran, string $tanggal_beli, string|null $nama_pembeli, string|null $telp_pembeli, array $items, string $nip): bool    
    {
        return $this->transactionRepository->updateTransaction($id_penjualan, $id_cabang, $id_tipe_penjualan, $id_pembayaran, $tanggal_beli, $nama_pembeli, $telp_pembeli, $items, $nip);
    }

    public function delete(int $id_penjualan): bool
    {
        return $this->transactionRepository->deleteTransaction($id_penjualan);
    }
}