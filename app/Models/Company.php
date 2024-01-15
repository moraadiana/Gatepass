<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Company extends Model
{
    //use HasFactory;
    protected $table = 'mgr_gtpcompanies';
    protected $primaryKey = 'mgr_gtpcompanies_id';

    protected $fillable = [
        'mgr_gtpcompanies_name',
        'mgr_gtpcompanies_status'
    ];

    public function departments(): Hasmany
    {
        return $this->hasMany(Department::class, 'mgr_gtpdepartments_company');
    }
    //create a relatioship with gatepass

    public function locations(): Hasmany
    {
        return $this->hasMany(Location::class, 'mgr_gtplocations_company');
    }
    public function approvalLevels(): HasMany
    {
        return $this->hasMany(ApprovalLevel::class, 'mgr_gtpapprovallevels_company');
    }
}
