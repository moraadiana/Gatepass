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
            'mgr_gtpusers_empno' => 'G1109',
            'mgr_gtpusers_department' => 2,
            'mgr_gtpusers_email' => 'diana.moraa@bulkstream.co',
            'mgr_gtpusers_password' => bcrypt('password'),

        ]);

        User::create([
            'mgr_gtpusers_fname' => 'Manasse',
            'mgr_gtpusers_lname' => 'Gitau',
            'mgr_gtpusers_sname' => 'r',
            'mgr_gtpusers_empno' => 'G1119',
            'mgr_gtpusers_department' => 2,
            'mgr_gtpusers_email' => 'gitau.manasse@bulkstream.co',
            'mgr_gtpusers_password' => bcrypt('password'),
        ]);

        User::create([
            'mgr_gtpusers_fname' => 'Amina',
            'mgr_gtpusers_lname' => 'Birgen',
            'mgr_gtpusers_sname' => 'r',
            'mgr_gtpusers_empno' => 'G1120',
            'mgr_gtpusers_department' => 2,
            'mgr_gtpusers_email' => 'amina.birgen@bulkstream.co',
            'mgr_gtpusers_password' => bcrypt('password'),
        ]);
    }
}
