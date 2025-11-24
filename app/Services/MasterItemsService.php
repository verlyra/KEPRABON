<?php

namespace App\Services;

use App\Repositories\MasterItemsRepository;

class MasterItemsService
{
    public function __construct(
        protected MasterItemsRepository $MasterItemsRepository
    ){}
    
    public function list(): array
    {
        return $this->MasterItemsRepository->getAllItems();
    }

    public function store(string $namaItem, float $hargaItem): bool
    {
        return $this->MasterItemsRepository->storeItem($namaItem, $hargaItem);
    }

    public function update(int $idItem, string $namaItem, float $hargaItem): bool
    {
        return $this->MasterItemsRepository->updateItem($idItem, $namaItem, $hargaItem);
    }

    public function delete(int $idItem): bool
    {
        return $this->MasterItemsRepository->deleteItem($idItem);
    }
}