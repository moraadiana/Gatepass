<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gatepass extends Model
{
   // use HasFactory;
    protected $fillable=[
        'name',
        'vehicle registration',
        'auxilary document',
        'destination',
        'purpose',
        'status',
        'created date',
        'department',
        'source location',
        'destination location',
        'uom',
        'created by'

    ];
}
