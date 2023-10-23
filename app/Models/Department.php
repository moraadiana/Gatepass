<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    //use HasFactory;
    protected $fillable =[
        'mgr_gtpdepartments_name',
        'mgr_gtpdepartments_status',
        'mgr_gtpdepartments_company',


    ];
    protected $table = 'mgr_gtpdepartments';
    protected $primaryKey = 'mgr_gtpdepartments_id'; 

}
