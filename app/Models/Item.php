<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    //use HasFactory;
    protected $table = 'mgr_gtpitems';
    protected $primaryKey = 'mgr_gtpitems_id';

    protected $fillable=[
        'mgr_gtpitems_description',
        'mgr_gtpitems_code',
        'mgr_gtpitems_quantity',
        'mgr_gtpitems_uom',
        'mgr_gtpitems_status',
        'mgr_gtpitems_createddated',
        'mgr_gtpitems_gatepass',


    ];
     
    public function gatepass(): BelongsTo
    {
        return $this->belongsTo(Gatepass::class, 'mgr_gtpitems_gatepass');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mgr_gtpitems_createdby');
    }
    // has uom 
    public function uom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'mgr_gtpitems_uom');
    }
}
