<?php

namespace App\Http\Controllers;

use App\Mail\GatepassApproved;
use App\Mail\GatepassRejected;
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
use App\Models\User;
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


        $gatepass = Gatepass::create([
            'mgr_gtpgatepass_name' => $gatepassData['mgr_gtpgatepass_name'],
            'mgr_gtpgatepass_vehiclereg' => $gatepassData['mgr_gtpgatepass_vehiclereg'],
            'mgr_gtpgatepass_auxilarydoc' => $gatepassData['mgr_gtpgatepass_auxilarydoc'],
            'mgr_gtpgatepass_purpose' => $gatepassData['mgr_gtpgatepass_purpose'],
            'mgr_gtpgatepass_department' => $gatepassData['mgr_gtpgatepass_department'],
            'mgr_gtpgatepass_destination' => $gatepassData['mgr_gtpgatepass_destination'],
            'mgr_gtpgatepass_sourcelocation' => $gatepassData['mgr_gtpgatepass_sourcelocation'],
            'mgr_gtpgatepass_destinationlocation' => $gatepassData['mgr_gtpgatepass_destinationlocation'],
            'mgr_gtpgatepass_createdby' => auth()->user()->mgr_gtpusers_id,

        ]);
        $gatepass->items()->createMany($request->input('items'));



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
        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location', 'company', 'items')->find($id);
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

        $gatepassCompany = $gatepass->department->company;
        $firstApprovalLevel = ApprovalLevel::where('mgr_gtpapprovallevels_company', $gatepassCompany->mgr_gtpcompanies_id)
            ->orderBy('mgr_gtpapprovallevels_sequence', 'asc')->first();

        $approverRole = $firstApprovalLevel->role->users
            ->where('mgr_gtpusers_department', $gatepass->department->mgr_gtpdepartments_id);

        //dd($approvallevel);
        // create approval record on submit
        $gatepass->approvals()->create([
            'mgr_gtpapprovals_approveddate' => now(),
            'mgr_gtpapprovals_status' => 2,
            'mgr_gtpapprovals_approvallevel' => $firstApprovalLevel->mgr_gtpapprovallevels_id,
        ]);
        //update gatepass status to pending
        $gatepass->update([
            'mgr_gtpgatepass_status' => 2
        ]);

        foreach ($approverRole as $approver) {
            Mail::to($approver->mgr_gtpusers_email)->send(new submitForApproval);
        }

        return redirect()->route('gatepass.index')->with('success', 'Gatepass submitted for approval!');
    }
    public function gatepassApproval(Request $request, Gatepass $gatepass)
    {
        $previousApproval = $gatepass->approvals()->where('mgr_gtpapprovals_status', 2)->first();

        $previousApproval->update([
            'mgr_gtpapprovals_status' => $request->input('status'),
            'mgr_gtpapprovals_approvedby' => auth()->user()->mgr_gtpusers_id,
            'mgr_gtpapprovals_comment' => $request->input('comment'),
            'mgr_gtpapprovals_approveddate' => now(),
        ]);

        if ($request->input('status') == 1) {
            $nextApprovalLevel = ApprovalLevel::where('mgr_gtpapprovallevels_company', $gatepass->department->company->mgr_gtpcompanies_id)
                ->where('mgr_gtpapprovallevels_sequence', '>', $previousApproval->approvallevel->mgr_gtpapprovallevels_sequence)
                ->orderBy('mgr_gtpapprovallevels_sequence', 'asc')
                ->first();

            if ($nextApprovalLevel) {
                $gatepass->approvals()->create([
                    'mgr_gtpapprovals_approveddate' => now(),
                    'mgr_gtpapprovals_status' => 2,
                    'mgr_gtpapprovals_approvallevel' => $nextApprovalLevel->mgr_gtpapprovallevels_id,                
                ]);

                foreach ($nextApprovalLevel->role->users as $approver) {
                    Mail::to($approver->mgr_gtpusers_email)->send(new submitForApproval);
                }
            } else {

                $gatepass->update([
                    'mgr_gtpgatepass_status' => 1
                ]);

                //Notify the requestor that the gatepass has been approved
                Mail::to($gatepass->user->mgr_gtpusers_email)->send(new GatepassApproved);
            }
        } else {
            $gatepass->update([
                'mgr_gtpgatepass_status' => 0
            ]);
            //Notify the requestor that the gatepass has been rejected
            Mail::to($gatepass->user->mgr_gtpusers_email)->send(new GatepassRejected);
        }
    }

    // show all approved gatepasses


}
