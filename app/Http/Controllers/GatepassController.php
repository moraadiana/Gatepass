<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Gatepass;
use App\Models\Location;
use App\Models\Uom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GatepassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gatepass = Gatepass::with('user', 'uom', 'department', 'location')->get();
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
        $gatepass = Gatepass::with('user', 'uom', 'department', 'location')->find($id);
        return Inertia::render(
            'Gatepass/Show',
            [
                'gatepass' => $gatepass
            ]
        );
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
