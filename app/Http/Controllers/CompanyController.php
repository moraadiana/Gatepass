<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //  
        $company = Company::all();

        //dd($company);
        return Inertia::render('Company/Index', [
            'companies' => $company,
        ]);


     
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //create a form for creating a new company
        return Inertia::render('Company/Create',);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //store a new company
        Company::create($request->all());

        //return to index with sucess message
        return redirect()->route('company.index')
            ->with('success', 'Company created successfully!');

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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
