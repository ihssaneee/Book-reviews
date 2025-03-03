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
        try{
            $genres=Genre::all();
            return response()->json([
                'genres'=>$genres,
                'message'=>"genres fetched successfuly."
            ],200);
        }
        catch(\Exception $e){
            log::error('could not fetch the genres',$e);
            return response()->json([
                'message'=>'error happened while fetching genres.'
            ],500);
        }
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
          $genre= Genre::create($validatedData);
            return response()->json([
                'message'=>'Genre addeed successfully.',
                'genre'=>$genre,
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
        return response()->json([
            'message'=>"genre fetchedd correctly!",
            'genre'=>$genre,
        ]);
    }

   
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        //
        $validatedData=$request->validate([
            'name' => 'string|max:255',
        'description' => 'string|max:1000',
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
