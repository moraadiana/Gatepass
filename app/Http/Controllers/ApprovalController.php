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
use Illuminate\Support\Facades\Mail;
use App\Mail\GatepassApproved;
use App\Mail\submitForApproval;
use App\Mail\GatepassRejected;
use Illuminate\Support\Facades\Auth;

class ApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()

     {
        //get current user
        $currentUser = Auth::user();
        $approvals = Approval::all();

        //fing role of current user 
        $approverRole = $currentUser->roles->first();
        //find approvallevel

        //dd($approverRole->mgr_gtproles_name);
     if ($approverRole->mgr_gtproles_name == 'Department Approver')
     {
        //get gatepass where status is 2 and gatepass department is same as that of logged in user 
        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
            ->where('mgr_gtpgatepass_status', 2)
            ->where('mgr_gtpgatepass_department', $currentUser->mgr_gtpusers_department)
            ->get();
     }
     else if ($approverRole->mgr_gtproles_name == 'Security Approver')
     {
        //get gatepass where status is 2 and gatepass department is same as that of logged in user 
        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
            ->where('mgr_gtpgatepass_status', 2)
            ->get();
     }
   
        return Inertia::render(
            'Approval/Index',
            [
                'gatepasses' => $gatepass,
                'approvals' => $approvals
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

    public function store(Request $request, Gatepass $gatepass)

    {
    }


    public function show($gatepass, $approval)

    {
        //show all gatepass where status is 
        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')->where('mgr_gtpapprovals_id', $approval->id)
            ->where('mgr_gtpapprovals_status', 1)
            ->get();
      //  dd($gatepass);
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
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
