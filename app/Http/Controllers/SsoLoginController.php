<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SsoLoginController extends Controller
{
    public function login(Request $request, $token)
    {
        $res = Http::
            //igonore https certificate verification
            withoutVerifying()->get(
                //Get SSO URL from .env file
                env('SSO_URL') . $token
            );

        if ($res->status() !== 200) {
            return redirect()->route('login');
        }

        $user = User::where('mgr_gtpusers_email', $res['email'])->first();

        if ($user) {
            auth()->login($user);
            return redirect()->route('dashboard');
        } else {
            return redirect()->route('login');
        }
    }
}
