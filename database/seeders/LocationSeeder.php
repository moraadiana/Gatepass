<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Location::create(
            [
                'mgr_gtplocations_name' => 'Mombasa',
                'mgr_gtplocations_company' => 1
            ],
            [
                'mgr_gtpdepartments_name' => 'Nairobi',
                'mgr_gtpdepartments_company' => 1
            ]
        );
    }
}
