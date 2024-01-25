<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //Get all users and implement search functionality. The frontend is antd protable table
        $query = User::query();

        if ($request->has('mgr_gtpusers_empno')) {
            $query->where('mgr_gtpusers_empno', 'like', '%' . $request->mgr_gtpusers_empno . '%');
        }
        if ($request->has('mgr_gtpusers_fname')) {
            $query->where('mgr_gtpusers_fname', 'like', '%' . $request->mgr_gtpusers_fname . '%');
        }
        if ($request->has('mgr_gtpusers_lname')) {
            $query->where('mgr_gtpusers_lname', 'like', '%' . $request->mgr_gtpusers_lname . '%');
        }
        if ($request->has('mgr_gtpusers_email')) {
            $query->where('mgr_gtpusers_email', 'like', '%' . $request->mgr_gtpusers_email . '%');
        }


        return Inertia::render(
            'User/Index',
            [
                'users' => Inertia::lazy(fn () => $query->with('department')->paginate($request->pageSize)),
                'roles' => Role::all(),
                'department' => Department::all()
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render(
            'User/Create',
            [
                'roles' => Role::all(),
                'departments' => Department::all()
            ]
        );

        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //store new user in database
        //dd($request->mgr_gtpuserroles_role);
        $user = User::create($request->all());


        $user->roles()->attach($request->mgr_gtpuserroles_role);



        return redirect()->route('user.index')
            ->with('success', 'User created successfully!');
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
    public function edit(User $user)
    {
        //
        return Inertia::render(
            'User/Edit',
            [
                'user' => $user->load('roles', 'department'),
                'roles' => Role::all(),
                'userroles' => UserRole::all(),
                'departments' => Department::all()

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user, UserRole $userrole)
    {
        //update user in database

        $user->update($request->all());

        ///remove all roles for user and update inputted roles for user in userroles table 
        // Remove all roles for user
        $user->roles()->detach();

        // Update inputted roles for user in userroles table
        $user->roles()->attach($request->mgr_gtpuserroles_role);

        // check if password is dirty
        if ($user->isDirty('password')) {
            $user->password = bcrypt($request->password);
            $user->save();
        }

        return redirect()->route('user.index')->with('success', 'User details updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
