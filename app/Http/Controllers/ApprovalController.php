<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Approval;
use Illuminate\Routing\Route;
use Inertia\Inertia;

class ApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Approval $approval)
    {
        // $approval = Approval::with('gatepass')->get();
        // return Inertia::render(
        //     'Approval/Index',


        //     [
        //         'approvals' => $approval
        //     ]
        //dd($approval);
        $approval = Approval::with('approvallevel')
        ->where('mgr_gtpapprovals_status', 1)
        ->get();
        return Inertia::render(
            'Approval/Index',
            [
                'approvals' => $approval
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
