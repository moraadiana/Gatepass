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
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;


use function PHPSTORM_META\map;

class GatepassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $gatepass = Gatepass::with('user', 'uom', 'company', 'department', 'source_location', 'destination_location', 'items')
            ->where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->pageSize);
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
            'mgr_gtpgatepass_department' => auth()->user()->mgr_gtpusers_department,
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
        //FIND CURRENT USER


        $currentUser = auth()->user();


        $gatepass = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location', 'company', 'items', 'approvals.approvalLevel.role', 'approvals.user')
            ->find($id);





        return Inertia::render(
            'Gatepass/Show',
            [
                'gatepass' => $gatepass,
                'currUser' => $currentUser->load('roles'),
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
                'gatepass' => $gatepass->load('user', 'uom', 'department', 'source_location', 'destination_location', 'company', 'items'),
                'departments' => Department::all(),
                'uoms' => Uom::all(),
                'locations' => Location::all(),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gatepass $gatepass, Item $item)
    {
        //Update the resource with new data from request*/
   
        $gatepass->update($request->all());

    
    // Remove all items
    $gatepass->items()->delete();

    // Recreate items with new data from request
    $gatepass->items()->createMany($request->input('items'));
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
        

        $gatepassCompany = $gatepass->department->company;
        $firstApprovalLevel = ApprovalLevel::where('mgr_gtpapprovallevels_company', $gatepassCompany->mgr_gtpcompanies_id)
            ->orderBy('mgr_gtpapprovallevels_sequence', 'asc')->first();
            //dd($firstApprovalLevel);

        $approverRole = $firstApprovalLevel->role->users
            ->where('mgr_gtpusers_department', $gatepass->department->mgr_gtpdepartments_id);

       //dd($approverRole);

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
    //create function to print a gatepass when print button is clicked
    public function printGatepass(Gatepass $gatepass)
    {
    
        //return gatepass.print in pdf format 
      //  $gatepass->load('user', 'uom', 'department', 'source_location', 'destination_location', 'company', 'items', 'approvals.approvalLevel.role', 'approvals.user');


        $pdf = PDF::loadView('gatepass.print', compact('gatepass'));
        return $pdf->stream('gatepass.pdf');
    }


    // show all approved gatepasses


}
