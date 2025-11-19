<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('MASTER_USER')->insert([
            'nip' => '29057322',
            'nama' => 'purwati',
            'password' => Hash::make('admin123'),
            'aktif' => true,
        ]);
    }
}
