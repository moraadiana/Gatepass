<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Approval;
use App\Models\ApprovalLevel;
use App\Models\Gatepass;
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
        //update the gatepass status to the level of the next approver
        $gatepassId = $request->input('gatepass_id');
        $approvalId = $request->input('approval_id');
        // $gatepass = Gatepass::where('mgr_gtpgatepass_id', $gatepassId)->first();
        // $gatepass->update(["mgr_gtpgatepass_status" => 1]);

        
        $approval = Approval::where('mgr_gtpapprovals_id', $approvalId)->first();
        dd($approval);
        $approval->update(["mgr_gtpapprovals_approvallevel" => 2]);
        


        return redirect()->route('approval.store')->with('success', 'Approval created successfully!');
    }

    /**
     * Display the specified resource.
     */
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
