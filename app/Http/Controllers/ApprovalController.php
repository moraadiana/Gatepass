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
        //find role of current user 
        $approverRole = $currentUser->roles->first();
       
        //get gatepass where status is 2 and gatepass department is same as that of logged in user 
        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
            ->where('mgr_gtpgatepass_status', 2) 
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
    
   
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

    public function approvalhistory()
    {
        $myApprovals = Approval::where('mgr_gtpapprovals_approvedby', auth()->user()->mgr_gtpusers_id)
        ->with('user','gatepass','gatepass.department', 'gatepass.source_location', 'gatepass.destination_location')
        ->orderBy('created_at', 'desc')
        ->get();

       

     // dd($myApprovals);
       // return route to approval history page 
       return Inertia::render(
        'Gatepass/Approval-history',
        [
            'approvals' => $myApprovals,
           
            
        ]
        );

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
