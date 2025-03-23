<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    //
    protected $fillable=[
        'author','title','description','image','link','genre_id','language','year'
    ];
    public function getImageAttribute($value){
        if ($value){
            return asset('storage/'. $value);
        }
    }
    public function genre(){
        return $this->belongsTo(Genre::class);
    }
    public function review(){
        return $this->hasMany(Review::class);
    }
}
