<?php

namespace App\Http\Controllers;
use app\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function index(){
        
        
        try{
            $users=User::all();
            return response()->json([
                'users'=>$users,
                'message'=>'data fetched successfuly'

            ],200);

    }
    catch(\Exception $e){
        return response()->json([
            'message'=>"error could not fetch data!",
        ],500);
    }
    }
    public function destroy(User $user){
        try{
            $user->delete();
            return response()->json([
                'message'=>'User deleted successfuly.',
                'user'=>$user,
            ],200);
        }
        catch(\Exception $e){
            return response()->json([
                'message'=>'error could not delete user',
            ],500);
        }
    }
    public function store(Request $request){
            $validatedData=$request->validate([
                'name'=>"required|string|max:255",
                'email'=>"required|string|email|max:255|unique:users",
                'password'=>"required|string|min:4|confirmed",
                'picture'=>"file|image|mimes:png,jpg,jpeg,gif,svg|max:2048",
                'role'=>"required|string|in:admin,user|max:255",

            ]);
            try{
                if ($request->hasFile('picture')){
                    $imagePath=$request->file('picture')->store('user_pictures','public');
                   $validatedData['picture']=$imagePath;
                }
                $user=User::create([
                    'name'=>$validatedData['name'],
                    'email'=>$validatedData['email'],
                    'password'=>Hash::make($validatedData['password']),
                    'role'=>$validatedData['role'],
                    'picture'=>$validatedData['picture']

                ]);
                return response()->json([
                    'message'=>'user created successfuly',
                    'user'=>$user,

                ],201);

            }
            catch(\Exception $e){
                return response()->json([
                    'message'=>'error! could not create the user.'
                ],500);
            }


    }
    public function update(Request $request){
        $updatedData=$request->validate([
            'name'=>"required|string|max:255",
            'email'=>"required|string|email|max:255|unique:users",
            'password'=>"required|string|min:4|confirmed",
        ]);
        try{
            $user=$request->update([
                'name'=>$updatedData['name'],
                'email'=>$updatedData['email'],
                'password'=>Hash::make($updatedData['password']),
            ]);
            return response()->json([
                'message'=>'data updated successfuly',
                'user'=>$user,

            ],200);
           
        }
        catch(\Exception $e){
            return response()->json([
                'message'=>"couldn't update data"
            ],500);
        }
    }
    public function show(User $user)
    {
        return response()->json([
            'user' => $user,
        ]);
    }

}
