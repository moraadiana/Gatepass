<?php

namespace App\Http\Controllers;

use App\Models\ApprovalLevel;
use App\Models\Approval;
use App\Models\Department;
use App\Models\Gatepass;
use App\Models\Location;
use App\Models\Role;
use App\Models\Item;
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
        //gate the last 10 gatepasses for the logged in user in asc order by created_at 
        $gatepass = Gatepass::with('user', 'uom', 'company', 'department', 'source_location', 'destination_location')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

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
                'locations' => Location::all(),
                'items' => Item::all(),
            ]

        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $gatepassData = $request->all();

       // dd($gatepassData);
        Gatepass::create($request->all());
        //Item::create($request->all());

        // $gatepass = Gatepass::with('user', 'uom', 'company', 'department', 'source_location', 'destination_location');
        //     Item::create([
        //         'mgr_gtpitems_gatepass' =>  $gatepass->mgr_gtpgatepass_id,
        //         'mgr_gtpitems_description' => $request->input('mgr_gtpitems_description'),
        //         'mgr_gtpitems_code' => $request->input('mgr_gtpitems_code'),
        //         'mgr_gtpitems_quantity' => $request->input('mgr_gtpitems_quantity'),
        //         'mgr_gtpitems_uom' => $request->input('mgr_gtpitems_uom'),
        //         // Add other fields as needed
        //     ]);




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
        // submit for approval button be available for the user who created the gatepass

        $gatepassDepartment = $gatepass->mgr_gtpgatepass_department;
        $firstApprovalLevel = ApprovalLevel::where('mgr_gtpapprovallevels_department', $gatepassDepartment)->orderBy('mgr_gtpapprovallevels_sequence', 'asc')->first();

        //dd($approvallevel);
        // create approval record on submit
        Approval::create([
            'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_id,
            'mgr_gtpapprovals_approveddate' => now(),
            'mgr_gtpapprovals_status' => 0,
            'mgr_gtpapprovals_approvallevel' => $firstApprovalLevel->mgr_gtpapprovallevels_id,
            'mgr_gtpapprovals_gatepass' => $gatepass->mgr_gtpgatepass_id,

        ]);
        //update gatepass status to 1
        $gatepass->update([
            'mgr_gtpgatepass_status' => 1
        ]);



        Mail::to('diana.moraa@grainbulk.com')->send(new submitForApproval);


        return redirect()->route('gatepass.index')->with('success', 'Gatepass submitted for approval!');
    }

    // show all approved gatepasses


}
