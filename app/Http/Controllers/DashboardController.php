<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
class DashboardController extends Controller
{
    //
    public function userGrowth(){
        try{
            $userGrowthData=User::query()
            ->selectRaw("YEAR(created_at) as year,MONTH(created_at) as month,COUNT(*) as user_count")
            ->groupBy('year','month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function($item){
                return [
                    'year'=>$item->year,
                    'month'=> (int) $item->month,
                    'user_count'=> (int) $item->user_count,
                ];
            });
            return response()->json([
                'userGrowthData'=>$userGrowthData,
                'message'=>"user growth data fetched successfully."
            ],200);


        }
        catch(\Exception $e){
            Log::info("an error happened while fetching data:". $e->getMessage());
            return response()->json([
                'message'=>"an error happened! could not fetch user growth data.",

            ],500);
        }
    }
}
