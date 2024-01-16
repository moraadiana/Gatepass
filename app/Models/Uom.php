<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Uom extends Model
{
    // use HasFactory;
    protected $table = 'mgr_gtpuoms';
    protected $primaryKey = 'mgr_gtpuoms_id';

    protected $fillable = [
        'mgr_gtpuoms_name',
        'mgr_gtpuoms_status',
    ];

    //uoms has many gatepass
    public function gatepass(): HasMany
    {
        return $this->hasMany(Gatepass::class, 'mgr_gtpgatepass_uom');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mgr_gtpuoms_createdby');
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'mgr_gtpuoms_id');
    }
}
