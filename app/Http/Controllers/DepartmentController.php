<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\Company;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //show department with its company
        $department = Department::with('company')->get();

        return Inertia::render(
            'Department/Index',
            [
               
                'departments' => Inertia::lazy(fn () => Company::with(
                    [
                        'departments' => function ($query) {
                            $query->orderBy('mgr_gtpdepartments_id', 'asc');
                        },
                        //'departments.role',
                    ]
                )
                ->paginate($request->pageSize)),
                'companies' => Company::all(),
                

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
        'Department/Create', 
        [
            'companies' => Company::all()
            
        ]

    );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Department::create($request->all());

        //return to index with success message
     

    }

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
        //
        $department = Department::findOrFail($id);
        $department->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
