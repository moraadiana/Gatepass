<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    //Table name
    protected $table = 'mgr_gtpusers';

    //Primary key
    protected $primaryKey = 'mgr_gtpusers_id';

    public function getAuthPassword()
    {
        return $this->mgr_gtpusers_password;
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mgr_gtpusers_fname',
        'mgr_gtpusers_lname',
        'mgr_gtpusers_sname',
        'mgr_gtpusers_email',
        'mgr_gtpusers_password',
        'mgr_gtpusers_status',
        'mgr_gtpusers_createdby',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'mgr_gtpusers_password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'mgr_gtpusers_password' => 'hashed',
    ];

    public function gatepass(): Hasmany
    {
        return $this->hasMany(Gatepass::class, 'mgr_gtpgatepass_createdby');
    }

    public function approvals(): Hasmany
    {
        return $this->hasMany(Approval::class, 'mgr_gtpapprovals_createdby');
    }

    public function uoms(): Hasmany
    {
        return $this->hasMany(Uom::class, 'mgr_gtpuoms_createdby');
    }

    public function items(): Hasmany
    {
        return $this->hasMany(Item::class, 'mgr_gtpitems_createdby');
    }

    public function approvallevel(): HasOne
    {
        return $this->hasOne(ApprovalLevel::class, 'mgr_gtpapprovallevels_approver');
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(UserRole::class, 'mgr_gtpusers_role');
    }
    public function departments(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'mgr_gtpusers_department');
    }
}
