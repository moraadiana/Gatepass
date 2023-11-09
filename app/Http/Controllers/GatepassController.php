<?php

namespace App\Http\Controllers;

use App\Models\ApprovalLevel;
use App\Models\Department;
use App\Models\Gatepass;
use App\Models\Location;
use App\Models\Role;
use App\Models\Uom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GatepassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')->get();
        return Inertia::render(
            'Gatepass/Index',
            [
                'gatepasses' => $gatepass
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(
            'Gatepass/Create',
            [
                'departments' => Department::all(),
                'uoms' => Uom::all(),
                'locations' => Location::all()
            ]

        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $gatepassData = $request->all();
        Gatepass::create($request->all());
        return redirect()->route('gatepass.index')
            ->with('success', 'Gatepass created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location', 'company')->find($id);
        $currentUser = Auth::user()->load('roles');
        $approval = $gatepass->approvals()->first();
        return Inertia::render(
            'Gatepass/Show',
            [
                'gatepass' => $gatepass,
                'user' => $currentUser,
                'approval' => $approval
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gatepass $gatepass)
    {
        return Inertia::render(
            'Gatepass/Edit',
            [
                'gatepass' => $gatepass,
                'departments' => Department::all(),
                'uoms' => Uom::all(),
                'locations' => Location::all()
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gatepass $gatepass)
    {
        //dd($request->all());

        /* $request->merge([
            'mgr_gtpgatepass_createdby' => auth()->user()->mgr_gtpusers_id
        ]);

        //Update the resource with new data from request*/
        $gatepass->update($request->input('values'));

        return redirect()->route('gatepass.index')->with('success', 'Gatepass updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function submitForApproval(Gatepass $gatepass)

    {
        $gatepassDepartment = $gatepass->mgr_gtpgatepass_department;
        $approvallevel = ApprovalLevel::where('mgr_gtpapprovallevels_department', $gatepassDepartment)->where('mgr_gtpapprovallevels_sequence', 10)->first();
        //Notify approver 
        $approvalRole = $approvallevel->mgr_gtpapprovallevels_approver;
        $userRole = Role::where('mgr_gtproles_id', $approvalRole)->first();
        $approvers = $userRole->users->pluck('mgr_gtpusers_email');
        //dd($approvers);
        
        return redirect()->route('gatepass.index')->with('success', 'Gatepass submitted for approval!');
    }
}
