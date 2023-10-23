<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gatepass;
use Illuminate\View\View;

class GatepassController extends Controller
{
    //
    public function show(string $mgr_gtpgatepass_id): View
    {
        return view('gatepass.profile', [
            'gatepass' => Gatepass::findOrFail($mgr_gtpgatepass_id)
        ]);
    }
}
