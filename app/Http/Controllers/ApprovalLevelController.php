<?php

namespace App\Http\Controllers;
use App\Models\ApprovalLevel;
use Illuminate\View\View;
use Illuminate\Http\Request;


class ApprovalLevelController extends Controller
{
    //
    public function show(string $mgr_gtpapprovallevels_id): View
    {
        return view('approvallevel.profile', [
            'approvallevel' => ApprovalLevel::findOrFail($mgr_gtpapprovallevels_id)
        ]);
    }
}
