<?php

use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    //return dashboard route
    return redirect(
        route('dashboard')
    );
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/approval/{mgr_gtpapprovals_id}', [ApprovalController::class, 'show']);

Route::get('/approvallevel/{mgr_gtpapprovallevels_id}', [ApprovalLevelController::class, 'show']);

Route::get('/company/{mgr_gtpcompanies_id}', [CompanyController::class, 'show']);

Route::get('/department/{mgr_gtpdepartments_id}', [DepartmentController::class, 'show']);

Route::get('/gatepass/{mgr_gtpgatepass_id}', [GatepassController::class, 'show']);

Route::get('/item/{mgr_gtpitems_id}', [ItemController::class, 'show']);

Route::get('/location/{mgr_gtplocations_id}', [LocationController::class, 'show']);

Route::get('/uom/{mgr_gtpuoms_id}', [UomController::class, 'show']);

Route::get('/userrole/{mgr_gtpuserroles_id}', [UserRoleController::class, 'show']);


require __DIR__ . '/auth.php';
require __DIR__.'/../vendor/autoload.php';

