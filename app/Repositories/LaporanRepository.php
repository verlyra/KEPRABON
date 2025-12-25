<?php

namespace App\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LaporanRepository
{
    public function getLaporanByDateRange(string $startDate, string $endDate)
    {
        return DB::select(
            "SELECT * FROM LAPORAN WHERE tanggal BETWEEN ? AND ?",
            [$startDate, $endDate]
        );
    }
}