<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Model;
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
        public function updateStatus(Request $request)
        {
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $user->status = $request->input('status');
            $user->save();
    
            return response()->json(['status' => 'success']);
        }
        public function validatePassword(Request $request){
            try{
                $user=Auth::user();
                $isValid=Hash::check($request->password,$user->password);
                return response()->json([
                    'message'=>'password is validated  successfully',
                    'isValid'=>$isValid,
                ],200);
            }
            catch(\Exception $e){
                Log::info("an error occured with verification of password". $e->getMessage());
                return response()->json([
                    'message'=>'password validation failed',
                    
                ],500);
            }
        }
        public function updatePassword(Request $request){
            $validatedPassword=$request->validate([
                'password' => 'required|string|min:4|confirmed',
            ]);
            try{
                 /** @var \App\Models\User $user */
                $user=Auth::user();
                $user->password=Hash::make($validatedPassword['password']);
                $user->save();
                return response()->json([
                    'message'=>'password updated successfully',

                ],200);
            }
            catch(\Exception $e){
                Log::info('password could not be udpated' . $e->getMessage());
                return response()->json([
                    'message'=>"password could not be updated"
                ],500);
            }
        }
        public function deleteAuthenticatedUser(Request $request ){
            try{
                /** @var \App\Models\User $user */
                $user=Auth::user();
                $user->delete();
                return response()->json([
                    'message'=>"Account has been deleted successfully",

                ],200);

            }
            catch(\Exception $e){
                Log::info('Account could not be deleted ' .$e->getMessage());
                return response()->json([
                    'message'=>"Account could not be deleted"
                ],500);
            }
        }
    }
