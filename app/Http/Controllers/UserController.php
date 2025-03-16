<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
                'gender'=>"required|string|in:female,male|max:255",
                'country'=>'required|string|max:255',
                'password'=>"required|string|min:4|confirmed",
                'picture'=>"sometimes|file|image|mimes:png,jpg,jpeg,gif,svg|max:2048",
                'role'=>"required|string|in:admin,user|max:255",

            ]);
            try{
                if ($request->hasFile('picture')){
                    $imagePath=$request->file('picture')->store('user_pictures','public');
                   $validatedData['picture']=$imagePath;
                };
                if (isset($validatedData['password'])){
                        $validatedData['password']=Hash::make($validatedData['password']);
                };
                $user=User::create($validatedData);
                return response()->json([
                    'message'=>'user created successfuly',
                    'user'=>$user,

                ],201);

            }
            catch(\Exception $e){
                Log::error("error creating the user". $e->getMessage());
                return response()->json([
                    'message'=>'error! could not create the user.'
                ],500);
            }


    }
           public function update(Request $request, User $user){
                Log::info('Update user request data:', $request->all());
                $updatedData=$request->validate([
                    'name'=>"sometimes|string|max:255",
                    'email'=>[
                        "sometimes",
                        "string",
                        "email",
                        "max:255",
                        Rule::unique('users')->ignore ($user->id),
                    ],
                    'password'=>"sometimes|string|min:6|confirmed",
                    "picture"=>"sometimes|file|image|mimes:png,jpg,jpeg,svg,gif|max:2048",
                    'gender'=>"sometimes|string|in:female,male|max:255",
                    "country"=>"sometime|string|max:255",
                    "role"=>"sometimes|string|in:user,admin|max:255",
                ]);
                try{
                    if ($request->hasFile("picture")){
                        $imagePath=$request->file('picture')->store("user_pictures",'public');
                        $updatedData["picture"]=$imagePath;
                    }
                    if (isset($updatedData['password'])){
                        $updatedData['password']=Hash::make($updatedData['password']);
                    }
                    $user->update($updatedData);
                    
                    return response()->json([
                        'message'=>'data updated successfuly',
                        'user'=>$user,

                    ],200);
                }
                catch(\Exception $e){
                    log::error('error updating user' . $e->getMessage());
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
