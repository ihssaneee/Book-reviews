<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $reviews=Review::with('user:id,name','book:id,title')->get();
        return response()->json([
            "message"=>"data fetched successfully",
            "reviews"=>$reviews,
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData=$request->validate([
            "user_id"=>"required|exists:users,id",
            "book_id"=>"required|exists:books,id",
            "rating"=>"required|numeric|min:1|max:5",
            "review_text"=>"sometimes|string|min:8|max:255|nullable",
        ]);
        try{
            $review=Review::create($validatedData);
            $review->load('user:id,name','book:id,title');
            return response()->json([
                "message"=>"Review created successfully.",
                "review"=>$review,
            ]
            ,201);
        }
        catch(\Exception $e){
            Log::info('an error happened'. $e->getMessage());
            return response()->json([
                "message"=>"review could not be created.",

            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
        try{
            $review->load('user:id,name','book:id,title')->get();
            return response()->json([
                'message'=>"Review fetched successfully.",
                'review'=>$review,
            ],200);
            }
            catch(\Exception $e){
                return response()->json([
                    'message'=>'review could not be fetched successfully.',
    
                ],500);
            }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
        try{
            $review->delete();
            return response()->json([
                'message'=>"review deleted successfully.",

            ],200);
        }
        catch(\Exception $e){
            return response()->json([
                'message'=>"review could not be deleted."
            ],500);
        }
    }
}
