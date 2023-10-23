<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appoval extends Model
{

    protected $fillable = [
        'mgr_gtpapprovals_status',
        'mgr_gtpapprovals_approvedby',
        'mgr_gtpapprovals_approveddate',
        'mgr_gtpapprovals_approvallevel',
        'mgr_gtpapprovals_gatepass',
        'mgr_gtpapprovals_created by'
    ];
        protected $table = 'mgr_gtpapprovals';
        protected $primaryKey = 'mgr_gtpapprovals_id';    
    //use HasFactory;
}
