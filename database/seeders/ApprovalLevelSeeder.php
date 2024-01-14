<?php

namespace Database\Seeders;

use App\Models\ApprovalLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApprovalLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        ApprovalLevel::create(
            [
                'mgr_gtpapprovallevels_label' => 'Department Approval',
                'mgr_gtpapprovallevels_sequence' => 10,
                'mgr_gtpapprovallevels_status' => 1,
                'mgr_gtpapprovallevels_company' => 1,
                'mgr_gtpapprovallevels_approver' => 1,
                
            ],
          
            );
            ApprovalLevel::create(
                [
                    'mgr_gtpapprovallevels_label' => 'Security Approval',
                    'mgr_gtpapprovallevels_sequence' => 20,
                    'mgr_gtpapprovallevels_status' => 1,
                    'mgr_gtpapprovallevels_company' => 1,
                    'mgr_gtpapprovallevels_approver' => 1,
                    
    
                ]
    
             );
    }
}
