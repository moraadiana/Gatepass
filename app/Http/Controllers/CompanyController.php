<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\View\View;

class CompanyController extends Controller
{
    //
    public function show(string $mgr_gtpcompanies_id): View
    {
        return view('company.profile', [
            'company' => Company::findOrFail($mgr_gtpcompanies_id)
        ]);
    }
}
