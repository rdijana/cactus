<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    public function category(){
       return $this->belongsTo(Category::class);
    }

    public function getPost($categories,$sortValue,$search){
        $query1=Post::with("category");
        if(is_array($categories)){
            $query1->whereHas("category",function ($query) use($categories){
                return $query->whereIn("category_id",$categories);
            });
            }
        if($sortValue){
//            return "Usao u sort";
//            return $sort;
          $query1->orderBy("created_at",$sortValue);
        }
        if($search){
//            return $search;
            $query1->whereHas("category",function ($query) use($search){
                return $query->where("title",'like','%'.$search.'%');
            });
        }
//        return "Nije usaio";
        return $query1->paginate(3);
    }
}
