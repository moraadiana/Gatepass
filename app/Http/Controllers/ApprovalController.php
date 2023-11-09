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
        // $gatepassId = $request->input('gatepass_id');
        // $gatepass = Gatepass::where('mgr_gtpgatepass_id', $gatepassId)->first();
        // $approvalId = $request->input('approval_id');
        // $approval = Approval::where('mgr_gtpapprovals_id', $approvalId)->first();

        // //if approve button is clicked update gatepass status to approved
        // if ($request->input('approve')) {
        //     $gatepass->update([
        //         'mgr_gtpgatepass_status' => 2,
        //         // 'mgr_gtpgatepass_approvedby' => auth()->user()->mgr_gtpusers_fname,
        //     ]);
        //     $approval->update([
        //         'mgr_gtpapprovals_status' => 1,
        //         'mgr_gtpapprovals_approvallevel' => 2,
        //         'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_fname,
        //     ]);
        //     return redirect()->route('approval.store')->with('success', 'Approved successfully!');
        // }
        // //if reject button is clicked update gatepass status to rejected
        // elseif ($request->input('reject')) {
        //     $gatepass->update([
        //         'mgr_gtpgatepass_status' => 3,
        //         //'mgr_gtpgatepass_approvedby' => auth()->user()->mgr_gtpusers_fname,
        //     ]);
        //     $approval->update([
        //         'mgr_gtpapprovals_status' => 0,
        //         'mgr_gtpapprovals_approvallevel' => 1,
        //         'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_fname,
        //     ]);
        //     return redirect()->route('approval.store')->with('success', 'Rejected successfully!');
        // }
    
    try {
        // Validate user inputs
        $gatepassId = $request->input('gatepass_id');
        $approvalId = $request->input('approval_id');

        // Find the gatepass and approval by their IDs
        $gatepass = Gatepass::where('mgr_gtpgatepass_id', $gatepassId)->firstOrFail();
        $approval = Approval::where('mgr_gtpapprovals_id', $approvalId)->firstOrFail();

        // Check if approve button is clicked
        if ($request->input('approve')) {
            // Update gatepass status to pending approval at second level(security)
            $gatepass->update([
                'mgr_gtpgatepass_status' => 2,
            ]);

            // Update approval status and details
            $approval->update([
                'mgr_gtpapprovals_status' => 1,
                'mgr_gtpapprovals_approvallevel' => 2,
                'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_fname,
            ]);

            return redirect()->route('approval.store')->with('success', 'Approved successfully!');
        } elseif ($request->input('reject')) {
            // Update gatepass status to rejected
            $gatepass->update([
                'mgr_gtpgatepass_status' => 3,
            ]);

            // Update approval status and details
            $approval->update([
                'mgr_gtpapprovals_status' => 0,
                'mgr_gtpapprovals_approvallevel' => 1,
                'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_fname,
            ]);

            return redirect()->route('approval.store')->with('success', 'Rejected successfully!');
        }
    } catch (\Exception $e) {
        // Handle any exceptions (e.g., database query failures)
        return redirect()->route('approval.store')->with('error', 'Error processing request. Please try again.');
    }
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
