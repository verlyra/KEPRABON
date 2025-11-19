<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use stdClass;

class UserRepository
{
    public function findBynip(string $nip): ?stdClass
    {
        return DB::selectOne("SELECT * FROM MASTER_USER WHERE nip = ?", [$nip]);
    }

    public function updateToken(int $nip, string $token): bool
    {
        $affectedRows = DB::update(
            "UPDATE MASTER_USER SET token = ? WHERE nip = ?",
            [$token, $nip]
        );
        return $affectedRows > 0;
    }
}