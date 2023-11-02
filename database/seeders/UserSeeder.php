<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'mgr_gtpusers_fname' => 'Diana',
            'mgr_gtpusers_lname' => 'Moraa',
            'mgr_gtpusers_sname' => 'M',
            'mgr_gtpusers_email' => 'diana.moraa@grainbulk.com',
            'mgr_gtpusers_role' => 1,
            'mgr_gtpusers_password' => bcrypt('password'),
        ]);
    }
}
