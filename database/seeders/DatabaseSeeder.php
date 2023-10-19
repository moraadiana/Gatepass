<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'mgr_gtpusers_fname' => 'Diana',
            'mgr_gtpusers_lname' => 'Moraa',
            'mgr_gtpusers_sname' => 'M',
            'mgr_gtpusers_email' => 'diana.moraa@grainbulk.com',
            'mgr_gtpusers_password' => bcrypt('password'),
        ]);
    }
}
