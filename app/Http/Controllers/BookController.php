<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

use function Pest\Laravel\json;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $books=Book::all();
            return response()->json([
                'data'=>$books,
                'message'=>'books fetched successfuly',
            ],200);
        }
        catch(\Exception $e){
            return response()->json([
                'message'=>'could not fetch books',
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
            'author'=>"required|string|max:255",
            'title'=>"required|string|max:255",
            'description'=>"required|string|min:10",
            'image'=>"required|image|mimes:png,jpg,jpeg,svg,gif|max:2048",
            'link'=>"required|url",
            'language'=>"required|string|max:255",
            'year'=>"required|integer|min:1900|max:2099",
        ]);
        try{
            //handle image upload
            if ($request->hasFile('image')){
                //store the image and get its path
                $imagePath= $request->file('image')->store('books_cover','public');
                //update the validated data with image path
                $validatedData['image']=$imagePath;
            }
            $book=Book::create($validatedData);
            return response()->json([
                'message'=>'book created successfuly',
                "data"=>$book
            ],201);
        }
        catch(\Exception $e){
            return response()->json([
                'message'=>'book could not be created',
            ],500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
        return response()->json([
            'data'=>$book,
            'message'=>"book fetched successfuly"
        ]);
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        //
        $updatedData=$request->validate([
        'author'      => 'sometimes|string|max:255',
        'title'       => 'sometimes|string|max:255',
        'description' => 'sometimes|string|min:10',
        'image'       => 'sometimes|image|mimes:png,jpg,jpeg,svg,gif|max:2048',
        'link'        => 'sometimes|url',
        'language'    => 'sometimes|string|max:255',
        'year'        => 'sometimes|integer|min:1900|max:2099',
        ]);
        try{
            if ($request->hasFile('image')){
                $imagePath=$request->file('image')->store('books_cover','public');
                $updatedData['image']=$imagePath;
            }
            $book->update($updatedData);
                return response()->json([
                    'message'=>'Book updated successfully',
                    'data'=>$book,
                ],200);  
        }
      
    
    catch(\Exception $e){
        return response()->json([
            'message'=>"could not update book",
        ],500);  
    }   
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
        try{
            $book->delete();
            return response()->json([
                'message'=>'book deleted successfuly',
            ],200);
        }
        catch(\Exception $e){
            return response()->json([
                'message'=>'book could not be deleted ',
            ],500);
        }
    }
}
