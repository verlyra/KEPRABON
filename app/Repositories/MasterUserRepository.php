<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class MasterUserRepository
{
    public function getAllUser()
    {
        return DB::select("SELECT nip as nip, nama as nama FROM MASTER_USER");
    }

    public function storeUser(string $nip, string $nama, string $password): bool
    {
        $hashedPassword = Hash::make($password);

        return DB::insert(
            "INSERT INTO MASTER_USER (nip, nama, password) VALUES (?, ?, ?)",
            [$nip, $nama, $hashedPassword]
        );
    }

    public function updateUser(string $nip_old, string $nip_new, string $nama, string $password): bool
    {
        $hashedPassword = Hash::make($password);

        return DB::update(
            "UPDATE MASTER_USER SET nip = ?, nama = ?, password = ? WHERE nip = ?",
            [$nip_new, $nama, $hashedPassword, $nip_old]
        );
    }

    public function deleteUser(string $nip): bool
    {
        return DB::delete("DELETE FROM MASTER_USER WHERE nip = ?", [$nip]);
    }
}