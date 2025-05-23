<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReviewController;
use App\Http\Middleware\Admin;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\DashboardController;



Route::get('/', function () {
    return view('welcome');
});

//authentication
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup',[AuthController::class,'signup']);
//current authenticated user 

//managing books
Route::middleware(['auth:sanctum'])->group(function(){
    Route::resource('reviews',ReviewController::class);
    Route::post('/logout',[AuthController::class,'logout']);
    //current authenticated user 
    Route::get('/user',[AuthController::class,'user']);
    Route::put('/user/status',[AuthController::class,'updateStatus']);
    Route::delete('/user/delete',[AuthController::class,'deleteAuthenticatedUser']);
    //validate password
    Route::post('/validate-password',[AuthController::class,'validatePassword']);
    Route::put('/update-password',[AuthController::class,'updatePassword']);
    
    
});

Route::middleware(['auth:sanctum','Admin'])->group(function(){
    Route::resource('books',BookController::class);
    Route::resource('genres',GenreController::class);
    Route::resource('users',UserController::class);
    Route::resource('reviews',ReviewController::class);
    //end points for admin dashboard
    Route::get('dashoard/user-growth',[DashboardController::class,'userGrowth']);
    Route::get('dashboard/popular-books-data',[DashboardController::class,'popularBooks']);
    Route::get('dashboard/users-by-country',[DashboardController::class,'popularCountries']);
    
    
});

