<?php

namespace Database\Seeders;

use App\Models\Uom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Uom::create(

            [
                'mgr_gtpuoms_name' => 'PC(s)',
                'mgr_gtpuoms_createdby' => 2
            ],

        );
        Uom::create(
            [
                'mgr_gtpuoms_name' => 'Roll(s)',
                'mgr_gtpuoms_createdby' => 2
            ]
        );
    }
}
