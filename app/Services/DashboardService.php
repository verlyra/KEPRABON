<?php

namespace App\Services;

use App\Repositories\UserRepository;

class DashboardService
{
    public function __construct(
        protected UserRepository $userRepository
    ){}

    public function index(string $nip): array
    {
        $user = $this->userRepository->findBynip($nip);
        
        return [
            'nip' => $user->nip,
            'nama' => $user->nama,
            // 'aktif' => $user->aktif
        ];
    }
}