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
        'mgr_gtpapprovals_approvallevel',
        'mgr_gtpapprovals_gatepass',
        'mgr_gtpapprovals_comment',
    ];
    //approval level belongs to a gatepass and approval level
    public function gatepass(): BelongsTo
    {
        return $this->belongsTo(Gatepass::class, 'mgr_gtpapprovals_gatepass');
    }
    public function approvallevel(): BelongsTo
    {
        return $this->belongsTo(ApprovalLevel::class, 'mgr_gtpapprovals_approvallevel');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mgr_gtpapprovals_approvedby');
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'mgr_gtpapprovals_department');
    }
    //use HasFactory;
}
