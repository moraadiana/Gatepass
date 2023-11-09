<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Approval;
use App\Models\ApprovalLevel;
use App\Models\Gatepass;
use App\Models\User;
use Illuminate\Routing\Route;
use Inertia\Inertia;
use Psy\Readline\Hoa\Console;

class ApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Approval $approval)
    {
        // $approval = Approval::with('gatepass')->get();
        // return Inertia::render(
        //     'Approval/Index',


        //     [
        //         'approvals' => $approval
        //     ]
        //dd($approval);
        $approvallevel = auth()->user()->approvallevel->mgr_gtpapprovallevels_status;

        $approval = Approval::with('gatepass.department', 'gatepass.source_location', 'gatepass.destination_location', 'gatepass.uom')
            ->where('mgr_gtpapprovals_status', $approvallevel)
            ->get();
        return Inertia::render(
            'Approval/Index',
            [
                'approvals' => $approval
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render(
            'Approval/Create',
            [
                'approvals' => Approval::all()
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)

    {
        $gatepass->approvals()->create([
            'mgr_gtpapprovals_approvedby' => $approvallevel->mgr_gtpapprovallevels_approver,
            'mgr_gtpapprovals_approveddate' => now(),
            'mgr_gtpapprovals_status' => 2,
            'mgr_gtpapprovals_approvallevel' => $approvallevel->mgr_gtpapprovallevels_id,
            'mgr_gtpapprovals_gatepass' => $gatepass->mgr_gtpgatepass_id,
            'mgr_gtpapprovals_createdby' => auth()->user()->mgr_gtpusers_id
        ]);
    }

    public function show(string $id)
    {
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
