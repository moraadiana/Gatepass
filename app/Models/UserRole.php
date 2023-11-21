<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserRole extends Model
{

    protected $table = 'mgr_gtpuserroles';
    protected $primaryKey = 'mgr_gtpuserroles_id';

    protected $fillable = [
        'mgr_gtpuserroles_role',
        'mgr_gtpuserroles_user',
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class, 'mgr_gtpuserroles_user');
    }
    public function role():BelongsTo
    {
        return $this->belongsTo(Role::class, 'mgr_gtpuserroles_role');
    }
}
