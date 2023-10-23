<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Uom;
use Illuminate\View\View;

class UomController extends Controller
{
    //
    public function show(string $mgr_gtpuoms_id): View
    {
        return view('uom.profile', [
            'uom' => Uom::findOrFail($mgr_gtpuoms_id)
        ]);
    }
}
