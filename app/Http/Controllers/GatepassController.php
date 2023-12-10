<?php

namespace App\Http\Controllers;

use App\Models\ApprovalLevel;
use App\Models\Approval;
use App\Models\Department;
use App\Models\Gatepass;
use App\Models\Location;
use App\Models\Role;
use App\Models\Uom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\submitForApproval;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class GatepassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gatepass = Gatepass::with('user', 'uom','company', 'department', 'source_location', 'destination_location')->where('mgr_gtpgatepass_status', 0)->get();
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

            // store item details in mgr_gtpitems tableD
            //Item::store($gatepassData);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location', 'company')->find($id);
        $currentUser = Auth::user()->load('role');
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
        //Update the resource with new data from request*/
        $gatepass->update($request->input('values'));

        //update the gatepass status to 1

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

        // create approval record on submit
        Approval::create([
            'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_id,
            'mgr_gtpapprovals_approveddate' => now(),
            'mgr_gtpapprovals_status' => 1,
            'mgr_gtpapprovals_approvallevel' => 1,
            'mgr_gtpapprovals_gatepass' => $gatepass->mgr_gtpgatepass_id,

        ]);
        //update gatepass status to 1
        $gatepass->update([
            'mgr_gtpgatepass_status' => 1
        ]);
       


    Mail::to('diana.moraa@grainbulk.com')->send(new submitForApproval);


        return redirect()->route('gatepass.index')->with('success', 'Gatepass submitted for approval!');
    }
}
