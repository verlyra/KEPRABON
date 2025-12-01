<?php

namespace App\Services;

use Carbon\Carbon;
use App\Repositories\LaporanRepository;

class LaporanService
{
    public function __construct(
        protected LaporanRepository $LaporanRepository
    ){}

    public function index(string $startDate, string $endDate): array
    {
        $startDate = Carbon::parse($startDate)->startOfDay()->format('Y-m-d 00:00:00'); 
        $endDate   = Carbon::parse($endDate)->endOfDay()->format('Y-m-d 23:59:59');   

        return $this->LaporanRepository->getLaporanByDateRange($startDate, $endDate);
    }
}