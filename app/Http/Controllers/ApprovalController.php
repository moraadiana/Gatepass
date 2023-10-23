<?php

namespace App\Http\Controllers;
use App\Models\Approval;
use Illuminate\View\View;
use Illuminate\Http\Request;

class ApprovalController extends Controller
{
    /**
     * Show the profile for an approval.
     */
    public function show(string $mgr_gtpapprovals_id): View
    {
        return view('approval.profile', [
            'approval' => Approval::findOrFail($mgr_gtpapprovals_id)
        ]);
    }
}
