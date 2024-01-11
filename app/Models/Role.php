<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Role extends Model
{
    protected $table = 'mgr_gtproles';
    protected $primaryKey = 'mgr_gtproles_id';

    protected $fillable = [
        'mgr_gtproles_name',
        'mgr_gtproles_status',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'mgr_gtpuserroles', 'mgr_gtpuserroles_role', 'mgr_gtpuserroles_user');
    }
    
}
