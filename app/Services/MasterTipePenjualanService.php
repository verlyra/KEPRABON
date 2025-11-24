<?php

namespace App\Services;

use App\Repositories\MasterTipePenjualanRepository;

class MasterTipePenjualanService
{
    public function __construct(
        protected MasterTipePenjualanRepository $MasterTipePenjualanRepository
    ){}

    public function list(): array
    {
        return $this->MasterTipePenjualanRepository->getAllTipePenjualan();
    }

    public function store(string $tipePenjualan): bool
    {
        return $this->MasterTipePenjualanRepository->storeTipePenjualan($tipePenjualan);
    }

    public function update(int $idTipePenjualan, string $tipePenjualan): bool
    {
        return $this->MasterTipePenjualanRepository->updateTipePenjualan($idTipePenjualan, $tipePenjualan);
    }

    public function delete(int $idTipePenjualan): bool
    {
        return $this->MasterTipePenjualanRepository->deleteTipePenjualan($idTipePenjualan);
    }
}