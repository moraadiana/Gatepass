<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use Illuminate\View\View;

class DepartmentController extends Controller
{
    //
    public function show(string $mgr_gtpdepartments_id): View
    {
        return view('department.profile', [
            'department' => Department::findOrFail($mgr_gtpdepartments_id)
        ]);
    }
}

