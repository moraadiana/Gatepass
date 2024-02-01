<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Department extends Model
{
    //use HasFactory;
    protected $table = 'mgr_gtpdepartments';
    protected $primaryKey = 'mgr_gtpdepartments_id'; 

    protected $fillable =[
        'mgr_gtpdepartments_name',
        'mgr_gtpdepartments_status',
        'mgr_gtpdepartments_company',
    ];
    public function users():Hasmany
    {
        return $this->hasMany(User::class,'mgr_gtpusers_department');
    }
    public function gatepass():Hasmany
    {
        return $this->hasMany(Gatepass::class,'mgr_gtpgatepass_createdby');
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'mgr_gtpdepartments_company');
    }
    
    public function approvals():Hasmany
    {
        return $this->hasMany(Approval::class,'mgr_gtpapprovals_department');
    }
   
    //approval level
    public function approvallevels():Hasmany
    {
        return $this->hasMany(ApprovalLevel::class,'mgr_gtpapprovallevels_department');
    }
   
}
