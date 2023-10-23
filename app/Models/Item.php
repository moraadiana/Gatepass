<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    //use HasFactory;
    protected $fillable=[
        'mgr_gtpitems_description',
        'mgr_gtpitems_code',
        'mgr_gtpitems_quantity',
        'mgr_gtpitems_uom',
        'mgr_gtpitems_status',
        'mgr_gtpitems_createddated',
        'mgr_gtpitems_gatepass',
        'mgr_gtpitems_createdby'


    ];
    protected $table = 'mgr_gtpitems';
    protected $primaryKey = 'mgr_gtpitems_id'; 
}
