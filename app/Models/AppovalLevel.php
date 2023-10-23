<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppovalLevel extends Model
{
    //use HasFactory;
    protected $fillable =[
        'mgr_gtpapprovallevels_label',
        'mgr_gtpapprovallevels_approver',
        'mgr_gtpapprovallevels_sequenceid',
        'mgr_gtpapprovallevels_status',
        'mgr_gtpapprovallevels_createddate'
    ];
    protected $table = 'mgr_gtpapprovallevels';
    protected $primaryKey = 'mgr_gtpapprovallevels_id';  
}
