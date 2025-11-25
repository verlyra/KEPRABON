<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class MasterUserRepository
{
    public function getAllUser()
    {
        return DB::select("SELECT nip as nip, nama as nama, aktif as aktif FROM MASTER_USER");
    }

    public function storeUser(string $nip, string $nama, string $password, bool $aktif): bool
    {
        $hashedPassword = Hash::make($password);

        return DB::insert(
            "INSERT INTO MASTER_USER (nip, nama, password, aktif) VALUES (?, ?, ?, ?)",
            [$nip, $nama, $hashedPassword, $aktif]
        );
    }

    public function updateUser(string $nip_old, string $nip_new, string $nama, string $password, bool $aktif): bool
    {
        $hashedPassword = Hash::make($password);

        return DB::update(
            "UPDATE MASTER_USER SET nip = ?, nama = ?, password = ?, aktif = ? WHERE nip = ?",
            [$nip_new, $nama, $hashedPassword, $aktif, $nip_old]
        );
    }

    public function deleteUser(string $nip): bool
    {
        return DB::delete("DELETE FROM MASTER_USER WHERE nip = ?", [$nip]);
    }
}