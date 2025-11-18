<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use stdClass;

class UserRepository
{
    public function findByUsername(string $username): ?stdClass
    {
        return DB::selectOne("SELECT * FROM MASTER_USER WHERE username = ?", [$username]);
    }

    public function updateToken(int $id_user, string $token): bool
    {
        $affectedRows = DB::update(
            "UPDATE MASTER_USER SET token = ? WHERE id_user = ?",
            [$token, $id_user]
        );
        return $affectedRows > 0;
    }
}