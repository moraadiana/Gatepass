<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uom extends Model
{
   // use HasFactory;
   protected $table = 'mgr_gtpuoms';
   protected $primaryKey = 'mgr_gtpuoms_id'; 
   
   protected $fillable=[
    'mgr_gtpuoms_name',
    'mgr_gtpuoms_status',
    'mgr_gtpuoms_createddate',
    'mgr_gtpuoms_createdby'
   ];
   
}
