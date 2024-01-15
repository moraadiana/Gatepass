<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::create(
            [
                'mgr_gtpcompanies_name' => 'Bulkstream'
            ],
            [
                'mgr_gtpcompanies_name' => 'Bulkstream TC'
            ]
        );
    }
}
