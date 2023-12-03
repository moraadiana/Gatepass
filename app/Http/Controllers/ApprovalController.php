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
    public function index()
    {


        //fetch role of current user
        $user = User::with('role')->with('department')->find(auth()->user()->mgr_gtpusers_id);
        //dd($user->department);
        if ($user->role->mgr_gtpuserroles_role == 1) {
            //show all submitted gatepasses wwere status is 1
            $gatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
                -> where('mgr_gtpgatepass_status', 1)->get();
            
            }
        //dd($gatepasses);

        return Inertia::render(
            'Approval/Index',
            [
                'gatepasses' => $gatepasses,
                //'approvals' => $approvals
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

    public function store(Gatepass $gatepass, ApprovalLevel $approvallevel)

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
        //on clicking approve button create approval recod
        $approval = new Approval();
        $approval->approved_by = auth()->user()->id;
        $approval->approved_date = now();
        $approval->status = 2;
        $approval->approval_level = 1; // Replace with the appropriate approval level
        $approval->gatepass_id = $id;
        $approval->created_by = auth()->user()->id;
        $approval->save();

        // Rest of the code...

        }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
