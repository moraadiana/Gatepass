<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Approval extends Model
{
    protected $table = 'mgr_gtpapprovals';
    protected $primaryKey = 'mgr_gtpapprovals_id';    

    protected $fillable = [
        'mgr_gtpapprovals_status',
        'mgr_gtpapprovals_approvedby',
        'mgr_gtpapprovals_approveddate',
        'mgr_gtpapprovals_approvallevel',
        'mgr_gtpapprovals_gatepass',
        'mgr_gtpapprovals_createdby'
    ];
    //approval level belongs to a gatepass and approval level
    public function gatepass(): BelongsTo
    {
        return $this->belongsTo(Gatepass::class);
    }
    public function approvallevel(): BelongsTo
    {
        return $this->belongsTo(ApprovalLevel::class);
    }
    public function departments(): BelongsTo
    {
        return $this->belongsTo(Departments::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    //use HasFactory;
}
