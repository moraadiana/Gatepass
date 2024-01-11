<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Gatepass extends Model
{
    // use HasFactory;
    protected $table = 'mgr_gtpgatepass';
    protected $primaryKey = 'mgr_gtpgatepass_id';

    protected $fillable = [
        'mgr_gtpgatepass_name',
        'mgr_gtpgatepass_vehiclereg',
        'mgr_gtpgatepass_auxilarydoc',
        'mgr_gtpgatepass_destination',
        'mgr_gtpgatepass_purpose',
        'mgr_gtpgatepass_status',
        'mgr_gtpgatepass_department',
        'mgr_gtpgatepass_sourcelocation',
        'mgr_gtpgatepass_destinationlocation',
        'mgr_gtpgatepass_createdby'

    ];
    // has many approvals,items
    public function approvals(): Hasmany
    {
        return $this->hasMany(Approval::class, 'mgr_gtpapprovals_gatepass');
    }
    public function items(): Hasmany
    {
        return $this->hasMany(Item::class, 'mgr_gtpitems_gatepass');
    }
    //belongs to uom
    public function uom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'mgr_gtpgatepass_uom');
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'mgr_gtpgatepass_department');
    }
    // belongs to company
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'mgr_gtpgatepass_company');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mgr_gtpgatepass_createdby');
    }
    public function source_location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'mgr_gtpgatepass_sourcelocation');
    }
    public function destination_location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'mgr_gtpgatepass_destinationlocation');
    }
}
