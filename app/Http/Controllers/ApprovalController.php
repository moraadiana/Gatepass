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
        if ($user->role->mgr_gtpuserroles_role == 1) {
            //show all submitted gatepasses where status is 1
            $gatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
                -> where('mgr_gtpgatepass_status', 1)->get();
            $approvals = Approval::all();
            
            }

        else if ($user->role->mgr_gtpuserroles_role == 2) {
            //show all submitted gatepasses where status is 1
            $gatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
                -> where('mgr_gtpgatepass_status', 2)->get();
            $approvals = Approval::all();
            
        }

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

    public function store(Request $request, Gatepass $gatepass)
   
    {
        //dd($gatepass);
        // create approval record in the approvals table
        //$gatepass= Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location', 'company') ->find($request->input('mgr_gtpgatepass_id'));
       // $approval = $gatepass->approvals()->first();

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
        return redirect()->route('approval.index')->with('success', 'Gatepass approved successfully!');
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
        //on clicking approve button update gatepass status to 2
        // $gatepass = Gatepass::find($request->input('mgr_gtpgatepass_id'));
        // $gatepass->update([
        //     'mgr_gtpgatepass_status' => 2
        // ]);


        }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
