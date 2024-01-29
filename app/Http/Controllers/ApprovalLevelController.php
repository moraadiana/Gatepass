<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use Illuminate\Http\Request;
use App\Models\ApprovalLevel;
use App\Models\Company;
use App\Models\Department;
use App\Models\Gatepass;
use App\Models\Role;
use Inertia\Inertia;

class ApprovalLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render(
            'ApprovalLevel/Index',
            [
                'approvalLevels' =>  Inertia::lazy(fn () => Company::with(
                    [
                        'departments.approvalLevels' => function ($query) {
                            $query->orderBy('mgr_gtpapprovallevels_sequence', 'asc');
                        },
                        'departments.approvalLevels.role',
                        'departments.approvalLevels.department.users' => function ($query) {
                            //get users for each department that have the role 
                        }

                    ]
                )

                    ->paginate($request->pageSize)),
                'companies' => Company::with('departments')->where('mgr_gtpcompanies_status', 1)->get(),
                'roles' => Role::all(),
                'departments' => Department::all()

            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //store new approval level in database
        //dd($request->all());
        $validatedData = $request->validate([
            'mgr_gtpapprovallevels_label' => ['required', 'string', 'max:255'],
            'mgr_gtpapprovallevels_sequence' => ['required', 'integer'],
            'mgr_gtpapprovallevels_approver' => ['required', 'integer'],
            'mgr_gtpapprovallevels_company' => ['required', 'integer'],
            'mgr_gtpapprovallevels_department' => ['required', 'integer'],


        ]);

        ApprovalLevel::create($validatedData);
    }
    //


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        // Update the approval level in the database
        $approvalLevel = ApprovalLevel::findOrFail($id);
        $approvalLevel->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
