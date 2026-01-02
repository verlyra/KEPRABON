<?php

namespace App\Services;

use App\Repositories\StatisticRepository;
use App\Helper\Forecasting;

class StatisticService
{
    public function __construct(
        protected StatisticRepository $statisticRepository
    ){}

    public function index(): array
    {
        $data_forecast = $this->statisticRepository->forecasting_penjualan();

        $forecasting = Forecasting::SES(
            data: $data_forecast->toArray(),
            alpha: 0.3,
            days: 3
        );
        
        return [
            'omset_penjualan' => $this->statisticRepository->omset_penjualan(),
            'transaksi_harian' => $this->statisticRepository->transaksi_harian(),
            'produk_terlaris' => $this->statisticRepository->produk_terlaris(),
            'performa_cabang' => $this->statisticRepository->performa_cabang(),
            'forecasting_penjualan' => $forecasting,
        ];
    }
}