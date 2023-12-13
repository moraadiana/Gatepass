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

class ApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $user = User::with('role')->with('department')->find(auth()->user()->mgr_gtpusers_id);
        $gatepasses = [];
        $approvals = Approval::all();
        if ($user->role->mgr_gtpuserroles_role == 1) {
            //show all submitted gatepasses where status is 1
            $gatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
                -> where('mgr_gtpgatepass_status', 1)->get();
            //$approvals = Approval::all();
            
            }

        else if ($user->role->mgr_gtpuserroles_role == 3) {
            //show all submitted gatepasses where status is 1
            $gatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
                -> where('mgr_gtpgatepass_status', 2)->get();
            $approvals = Approval::all();
            
        }

        return Inertia::render(
            'Approval/Index',
            [
                'gatepasses' => $gatepasses,
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

        $user = User::with('role')->with('department')->find(auth()->user()->mgr_gtpusers_id);
        //$useremail = $user->email;

    
    //check if action is approve
    if ($request->input('action') === 'approve')
     {
        if ($user->role->mgr_gtpuserroles_role == 1){
            Approval::create([
                'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_id,
                'mgr_gtpapprovals_approveddate' => now(),
                'mgr_gtpapprovals_status' => 1,
                'mgr_gtpapprovals_approvallevel' => 1,
                'mgr_gtpapprovals_gatepass' => $gatepass->mgr_gtpgatepass_id,
    
            ]);
            //on clicking approve button update gatepass status to 2
            $gatepass->update([
                'mgr_gtpgatepass_status' => 2
            ]);
            //send email to users where role is 3(security approvers)
            Mail::to('diana.moraa@grainbulk.com')->send(new submitForApproval);
            

            //Mail::to('diana.moraa@grainbulk.com')->send(new submitForApproval);
           

           return redirect()->route('approval.index')->with('success', 'Gatepass approved successfully!');
        }
        elseif ($user->role->mgr_gtpuserroles_role == 3)
        {
            Approval::create([
                'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_id,
                'mgr_gtpapprovals_approveddate' => now(),
                'mgr_gtpapprovals_status' => 1,
                'mgr_gtpapprovals_approvallevel' => 2,
                'mgr_gtpapprovals_gatepass' => $gatepass->mgr_gtpgatepass_id,
    
            ]);
            //on clicking approve button update gatepass status to 2
            $gatepass->update([
                'mgr_gtpgatepass_status' => 3
            ]);
            //send email to user when gatepass is approved
            Mail::to('diana.moraa@grainbulk.com')->send(new GatepassApproved);
           return redirect()->route('approval.index')->with('success', 'Gatepass approved successfully!');
           
        }
    }
        //if action is reject
elseif ($request->input('action') === 'reject') 
    {
            if ($user->role->mgr_gtpuserroles_role == 1)
            {
                Approval::create([
                    'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_id,
                    'mgr_gtpapprovals_approveddate' => now(),
                    'mgr_gtpapprovals_status' => 0,
                    'mgr_gtpapprovals_approvallevel' => 1,
                    'mgr_gtpapprovals_gatepass' => $gatepass->mgr_gtpgatepass_id,
                ]);
                //on clicking reject button update gatepass status to 1
                $gatepass->update([
                    'mgr_gtpgatepass_status' => 4
                ]);
              //send email to user when gatepass is rejected
                Mail::to('diana.moraa@grainbulk.com')->send(new GatepassRejected);

                return redirect()->route('approval.index')->with('success', 'Gatepass rejected successfully!');
            }
            elseif ($user->role->mgr_gtpuserroles_role == 3)
            {
                Approval::create([
                    'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_id,
                    'mgr_gtpapprovals_approveddate' => now(),
                    'mgr_gtpapprovals_status' => 0,
                    'mgr_gtpapprovals_approvallevel' => 2,
                    'mgr_gtpapprovals_gatepass' => $gatepass->mgr_gtpgatepass_id,

                ]);
                //on clicking reject button update gatepass status to 1
                $gatepass->update([
                    'mgr_gtpgatepass_status' => 4
                ]);

               //send email to user when gatepass is rejected
                Mail::to('diana.moraa@grainbulk.com')->send(new GatepassRejected);
                return redirect()->route('approval.index')->with('success', 'Gatepass rejected successfully!');
            }
    }
    
}
   

    public function show( $gatepass, $approval)    
    
    {
     //show all gatepass where status is 
     $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')->
     where('mgr_gtpapprovals_id', $approval->id)
                              ->where('mgr_gtpapprovals_status', 1)
                              ->get();
dd($gatepass);
      
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
