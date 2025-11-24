<?php

namespace App\Services;

use App\Repositories\MasterPembayaranRepository;

class MasterPembayaranService
{
    public function __construct(
        protected MasterPembayaranRepository $MasterPembayaranRepository
    ){}

    public function list(): array
    {
        return $this->MasterPembayaranRepository->getAllPembayaran();
    }

    public function store(string $namaPembayaran): bool
    {
        return $this->MasterPembayaranRepository->storePembayaran($namaPembayaran);
    }

    public function update(int $idPembayaran, string $namaPembayaran): bool
    {
        return $this->MasterPembayaranRepository->updatePembayaran($idPembayaran, $namaPembayaran);
    }
    public function delete(int $idPembayaran): bool
    {
        return $this->MasterPembayaranRepository->deletePembayaran($idPembayaran);
    }
}