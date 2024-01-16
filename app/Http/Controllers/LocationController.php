<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        //
        $location= Location::with('company')->get();
       // dd($location);
        return Inertia::render(
            'Location/Index',
            [
               
                'locations' => Inertia::lazy(fn () => Company::with(
                    [
                        'locations' => function ($query) {
                            $query->orderBy('mgr_gtplocations_id', 'asc');
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        Location::create($request->all());

      
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
      $location = Location::findOrFail($id);
      $location->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
