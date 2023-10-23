<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use Illuminate\View\View;

class LocationController extends Controller
{
    //
    public function show(string $mgr_gtplocations_id): View
    {
        return view('location.profile', [
            'location' => Location::findOrFail($mgr_gtplocations_id)
        ]);
    }
}
