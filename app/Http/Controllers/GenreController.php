<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Log;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $genres=Genre::all();
        return response()->json($genres,200);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
       $validatedData=$request->validate([
            'name'=>'required|string|max:255',
            'description'=>'required|string|max:1000',


        ]);
        try{
           Genre::create($validatedData);
            return response()->json([
                'message'=>'Genre addeed successfully.'
            ],201);
        }
        catch(\Exception $e){
            Log::error('Error creating genre:'. $e->getMessage());
            return response()->json([
                'message'=>'Database error occured.'
            ],500);

    }
}
        

    

    /**
     * Display the specified resource.
     */
    public function show(Genre $genre)
    {
        //
        return response()->json($genre,200);
    }

   
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        //
        $validatedData=$request->validate([
            'name' => 'required|string|max:255',
        'description' => 'required|string|max:1000',
        ]);
        try{
        $genre->update($validatedData);
        return response()->json([
            'message'=>'Genre updated successfully.',
        ],200);

    }
        catch(\Exception $e){
            log::error('Error updating genre'. $e->getMessage());
            return response()->json([
                'message'=>'could not update genre.'],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        //
        try{
            $genre->delete();
            return response()->json([
                'message'=>'Genre deleted successfully'
            ],200);
        }
        catch(\Exception $e){
            log::error('Error deleting genre.'. $e->getMessage());
            return response()->json([
                'message'=>'could not delete genre.'
            ],500);

        }
    }
}
