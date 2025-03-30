<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use \Carbon\CarbonPeriod;
use App\Models\Book;
use App\Models\Review;
class DashboardController extends Controller
{
    //
    public function userGrowth(){
        try{
            $startDate = User::orderBy('created_at')->first()->getRawOriginal('created_at');

            if (!$startDate) {
                $startDate = now()->startOfYear();
            } else {
                $startDate = Carbon::parse($startDate)->startOfMonth();
            }
            $endDate=now()->endOfMonth();
            $interval=CarbonInterval::month();
            $periods=new CarbonPeriod($startDate,$endDate,$interval);
            $allMonthsData=[];

            $userGrowthData=User::query()
            ->selectRaw("YEAR(created_at) as year,MONTH(created_at) as month,COUNT(*) as user_count")
            ->groupBy('year','month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->keyBy(function($item){
                return sprintf('%04d-%02d',$item->year,$item->month);
            });
            foreach($periods as $period){
                $year=$period->year;
                $month=$period->month;

                $key=sprintf('%04d-%02d',$year,$month);
                $userCount=(int) $userGrowthData->has($key)?$userGrowthData->get($key)->user_count:0;

                $allMonthsData[]=[
                    'year'=>$year,
                    'month'=>$month,
                    'user_count'=>$userCount,
                ];
            }
           
            return response()->json([
                'userGrowthData'=>$allMonthsData,
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
    public function popularBooks(){
        try{
        $popularBooksData=Review::query()
        ->join('books',"reviews.book_id","=","books.id")
        ->selectraw('books.title, count(*) as reviews_count')
     
        ->groupBy('books.id','books.title')
        ->orderBy('reviews_count','desc')
        ->limit(10)
        ->get()
        ->map(function($item){
           return [
                "book_title"=>$item->title,
                'reviews_count'=>(int) $item->reviews_count
           ];
        }
    );
        return response()->json([
            "message"=>"popular books count data fetched successully.",
            "popularBooksCount"=>$popularBooksData
        ],200);
}
    catch(\Exception $e){
        Log::info('error that caused failure of fetching popular books data'. $e->getMessage());
        return response()->json([
            'message'=>"could not fetch popular books data ",

        ],500);
    }
    }
    public function popularCountries(){
       try{
        $usersCount=User::query()->count();
        $usersByCountry=User::query()
        ->selectRaw("country,count(*) as users_count")
        ->groupBy('country')
        ->orderBy('users_count','desc')
        ->get()
        ->map(function($item) use ($usersCount){
            return [
                'country'=>$item->country,
                'users_percent'=>($item->users_count/$usersCount)*100,
            ];
        });
        return response()->json([
            'message'=>'users by country data fetched successfully',
            'usersByCountry'=>$usersByCountry,
        ],200);
       }
       catch(\Exception $e){
            Log::info('users by country data could not be fetched.'. $e->getMessage());
            return response()->json([
                'message'=>'users by country data count not be fetched',

            ],500);
       }
    }
}
