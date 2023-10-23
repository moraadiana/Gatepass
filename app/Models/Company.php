<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //use HasFactory;
    protected $table = 'mgr_gtpcompanies';
    protected $primaryKey = 'mgr_gtpcompanies_id'; 
    
    protected $fillable =[
        'mgr_gtpcompanies_name',
        'mgr_gtpcompanies_status'
    ];
    
}
