<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApprovalLevel extends Model
{
    //use HasFactory;
    protected $table = 'mgr_gtpapprovallevels';
    protected $primaryKey = 'mgr_gtpapprovallevels_id';

    protected $fillable = [
        'mgr_gtpapprovallevels_label',
        'mgr_gtpapprovallevels_approver',
        'mgr_gtpapprovallevels_sequence',
        'mgr_gtpapprovallevels_status',
        'mgr_gtpapprovallevels_company',
        'mgr_gtpapprovallevels_department',
    ];

    // has many approvals,items
    public function approvals(): Hasmany
    {
        return $this->hasMany(Approval::class, 'mgr_gtpapprovals_approvallevel');
    }
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'mgr_gtpapprovallevels_approver');
    }

    public function department(): BelongsTo
    {

        return $this->belongsTo(Department::class, 'mgr_gtpapprovallevels_department');
    }
}
