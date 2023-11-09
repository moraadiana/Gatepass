<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{

    protected $table = 'mgr_gtpuserroles';
    protected $primaryKey = 'mgr_gtpuserroles_id';

    protected $fillable = [
        'mgr_gtpuserroles_role',
        'mgr_gtpuserroles_user',
    ];
}
