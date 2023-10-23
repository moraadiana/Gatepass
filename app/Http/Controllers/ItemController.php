<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\View\View;

class ItemController extends Controller
{
    //
    public function show(string $mgr_gtpitems_id): View
    {
        return view('item.profile', [
            'item' => Item::findOrFail($mgr_gtpitems_id)
        ]);
    }
}
