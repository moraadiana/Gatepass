<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gatepass extends Model
{
   // use HasFactory;
    protected $fillable=[
        'mgr_gtpgatepass_name',
        'mgr_gtpgatepass_vehiclereg',
        'mgr_gtpgatepass_auxilarydoc',
        'mgr_gtpgatepass_destination',
        'mgr_gtpgatepass_purpose',
        'mgr_gtpgatepass_status',
        'mgr_gtpgatepass_createddate',
        'mgr_gtpgatepass_department',
        'mgr_gtpgatepass_sourcelocation',
        'mgr_gtpgatepass_destinationlocation',
        'mgr_gtpgatepass_uom',
        'mgr_gtpgatepass_createdby'

    ];
    protected $table = 'mgr_gtpgatepass';
    protected $primaryKey = 'mgr_gtpgatepass_id'; 

}
