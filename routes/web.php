<?php

use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\ApprovalLevelController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\GatepassController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PrintController;
use App\Http\Controllers\UomController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SsoLoginController;
use App\Http\Controllers\UserController;
use App\Models\Gatepass;
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

Route::get('/ssologin/{token}', [SsoLoginController::class, 'login'])->name('sso.login');


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
    Route::get('/gatepass/my-approval-history', [ApprovalController::class, 'approvalHistory'])->name('gatepass.myApprovalHistory');
    Route::resource('gatepass', GatepassController::class);
    Route::post('/gatepass/{gatepass}/submit-for-approval', [GatepassController::class, 'submitForApproval'])->name('gatepass.submitForApproval');
    Route::post('/gatepass/{gatepass}/gatepassApproval', [GatepassController::class, 'gatepassApproval'])->name('gatepass.gatepassApproval');
    //create route for  printGatepass function
    Route::get('/gatepass/{gatepass}/print', [GatepassController::class, 'printGatepass'])->name('gatepass.print');

    Route::get('/approval', [ApprovalController::class, 'index'])->name('approval.index');

    //Route::get('/gatepass/approval',[ApprovalController::class, 'show'])->name('approval.show');

    //creates routes in print controller  public function prnpriview()

    Route::resource('gatepass.approval', ApprovalController::class);

    Route::resource('approvallevels', ApprovalLevelController::class);

    Route::resource('company', CompanyController::class);

    Route::resource('department', DepartmentController::class);

    Route::resource('item', ItemController::class);

    Route::resource('location', LocationController::class);

    Route::resource('uom', UomController::class);

    Route::resource('user', UserController::class);

    Route::resource('role', RoleController::class);

    Route::resource('userrole', UserRoleController::class);
});


require __DIR__ . '/auth.php';
//require __DIR__.'/../vendor/autoload.php';
