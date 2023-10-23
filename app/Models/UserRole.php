<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Role extends Model
{
    //use HasFactory;
    protected $table = 'mgr_gtpuserroles';
    protected $primaryKey = 'mgr_gtpuserroles_id'; 
    protected $fillable =[
        'mgr_gtpuserroles_name',
        'mgr_gtpuserroles_status',
        'mgr_gtpuserroles_createddate',
        'mgr_gtpuserroles_createdby'

    ];

    public function users():Hasmany
    {
        return $this->hasMany(User::class,'mgr_gtpusers_roles');
    }
   
}
