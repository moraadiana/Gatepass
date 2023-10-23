<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    //use HasFactory;
    protected $fillable=[
        'description',
        'code',
        'quantity',
        'uom',
        'status',
        'created dated',
        'gatepass',
        'created by'


    ];
}
