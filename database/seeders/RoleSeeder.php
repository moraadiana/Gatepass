<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Role::create([
            'mgr_gtproles_name' => 'GBHL-ICT Approver',
            'mgr_gtproles_status' => 1
        ]);
        Role::create([
            'mgr_gtproles_name' => 'GBHL-HSE Approver',
            'mgr_gtproles_status' => 1
        ]);
    }
}
