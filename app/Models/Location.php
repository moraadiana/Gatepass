<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
   // use HasFactory;
   protected $table = 'mgr_gtplocations';
   protected $primaryKey = 'mgr_gtplocations_id'; 
   
   protected $fillable = [
    'mgr_gtplocations_name',
    'mgr_gtplocations_status',
    'mgr_gtplocations_company'
   ];
   
}
