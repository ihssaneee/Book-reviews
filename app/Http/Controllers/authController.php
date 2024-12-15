<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    //
    // public function showLoginForm(){
    //     return view('auth.login');
    // }
    // public function showSignUpForm(){
    //     return view('auth.signUp');
    // }
    public function signup(Request $request)
    {
        $credentials=$request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:4|confirmed',
        ]);

       
        // Create a new user with the validated data
        $user = User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password']),
        ]);

        // Automatically log the user in
        Auth::login($user);

        // Regenerate the session ID to prevent session fixation
        $request->session()->regenerate();

        // Return a JSON response with user info and session data
        return response()->json([
            'message' => 'User signed up successfully!',
            'user' => Auth::user(),
        ]);
    }
  
    public function login(Request $request){
        $credentials=$request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string'
            ]);
            //attempt to authenticate the user
            if (!Auth::attempt($credentials)){
                throw ValidationException::withMessages([
                    'email'=>['the provided credentials are incorrect!'],
                ]);
                
            }
        
            //invalidate the session
            $request->session()->regenerate();
            return response()->json([
                'message'=>'Login successful!',
                'user'=>Auth::user()
            ]);
        }
    public function logout(Request $request){
        Auth()->guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message'=>'Logout Successful!'
        ],200);
    }

        public function user() {
            $user = Auth::user();
           
            return response()->json([
                'user' => $user,
            ], 200);
        }
    }
