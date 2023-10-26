<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Location extends Model
{
   // use HasFactory;
   protected $table = 'mgr_gtplocations';
   protected $primaryKey = 'mgr_gtplocations_id'; 

   protected $fillable = [
    'mgr_gtplocations_name',
    'mgr_gtplocations_status',
    'mgr_gtplocations_company'
   ];

   public function gatepass():Hasmany
   {
       return $this->hasMany(Gatepass::class,'mgr_gtpgatepass_sourcelocation');
       return $this->hasMany(Gatepass::class,'mgr_gtpgatepass_destinationlocation');
   }


   public function company(): BelongsTo
   {
       return $this->belongsTo(Company::class, 'mgr_gtplocations_company');
   }
   
}
