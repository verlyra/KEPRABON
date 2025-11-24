<?php

namespace App\Services;

use App\Repositories\MasterCabangRepository;

class MasterCabangService
{
    public function __construct(
        protected MasterCabangRepository $MasterCabangRepository
    ){}

    public function list(): array
    {
        return $this->MasterCabangRepository->getAllCabang();
    }

    public function store(string $cabang): bool
    {
        return $this->MasterCabangRepository->storeCabang($cabang);
    }

    public function update(int $idCabang, string $cabang): bool
    {
        return $this->MasterCabangRepository->updateCabang($idCabang, $cabang);
    }

    public function delete(int $idCabang): bool
    {
        return $this->MasterCabangRepository->deleteCabang($idCabang);
    }
}