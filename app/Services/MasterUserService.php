<?php

namespace App\Services;

use App\Repositories\MasterUserRepository;

class MasterUserService{
    public function __construct(
        protected MasterUserRepository $MasterUserRepository
    ){}

    public function list(): array
    {
        return $this->MasterUserRepository->getAllUser();
    }

    public function store(string $nip, string $nama, string $password): bool
    {
        return $this->MasterUserRepository->storeUser($nip, $nama, $password);
    }

    public function update(string $nip_old, string $nip_new, string $nama, string $password): bool
    {
        return $this->MasterUserRepository->updateUser($nip_old, $nip_new, $nama, $password);
    }

    public function delete(string $nip): bool
    {
        return $this->MasterUserRepository->deleteUser($nip);
    }


}