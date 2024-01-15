<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Department::create(
            [
                'mgr_gtpdepartments_name' => 'BULKSTREAM ICT',
                'mgr_gtpdepartments_company' => 1
            ],
        
        );
        Department::create(
           
            [
                'mgr_gtpdepartments_name' => 'BULKSTREAM HSE',
                'mgr_gtpdepartments_company' => 1
            ]
        );
    }
}
