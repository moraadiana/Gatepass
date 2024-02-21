<?php

namespace App\Http\Controllers;

use App\Models\Gatepass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $approvedGatepassesCount = Gatepass::where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)->where('mgr_gtpgatepass_status', 1)->count();
        $pendingGatepassesCount = Gatepass::where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)->where('mgr_gtpgatepass_status', 2)->count();
        $rejectedGatepassesCount = Gatepass::where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)->where('mgr_gtpgatepass_status', 0)->count();
        $totalGatepassesCount = Gatepass::where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)->count();
        $approvedGatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
            ->where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)->where('mgr_gtpgatepass_status', 1)->orderBy('mgr_gtpgatepass_id', 'desc')->limit(5)->get();
        $rejectedGatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
            ->where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)->where('mgr_gtpgatepass_status', 0)->orderBy('mgr_gtpgatepass_id', 'desc')->limit(5)->get();
        $pendingGatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
            ->where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)->where('mgr_gtpgatepass_status', 2)->orderBy('mgr_gtpgatepass_id', 'desc')->limit(5)->get();
        $allGatepasses = Gatepass::with('user', 'uom', 'department', 'source_location', 'destination_location')
            ->where('mgr_gtpgatepass_createdby', auth()->user()->mgr_gtpusers_id)->orderBy('mgr_gtpgatepass_id', 'desc')->limit(5)->get();

        return Inertia::render('Dashboard', [
            'approvedGatepassesCount' => $approvedGatepassesCount,
            'pendingGatepassesCount' => $pendingGatepassesCount,
            'rejectedGatepassesCount' => $rejectedGatepassesCount,
            'totalGatepassesCount' => $totalGatepassesCount,
            'approvedGatepasses' => $approvedGatepasses,
            'rejectedGatepasses' => $rejectedGatepasses,
            'pendingGatepasses' => $pendingGatepasses,
            'allGatepasses' => $allGatepasses,
        ]);
    }
}
