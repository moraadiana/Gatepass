<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //use HasFactory;
    protected $fillable =[
        'mgr_gtpuserroles_name',
        'mgr_gtpuserroles_status',
        'mgr_gtpuserroles_createddate',
        'mgr_gtpuserroles_createdby'

    ];
    protected $table = 'mgr_gtpuserroles';
    protected $primaryKey = 'mgr_gtpuserroles_id'; 
}
