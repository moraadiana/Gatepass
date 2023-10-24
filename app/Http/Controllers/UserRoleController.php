<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserRole;
use Illuminate\View\View;

class UserRoleController extends Controller
{
    //
    public function show(string $mgr_gtpuserroles_id): View
    {
        return view('userrole.profile', [
            'userrole'=>UserRole::findOrFail($mgr_gtpuserroles_id)
        ]);
    }
}
