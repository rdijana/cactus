<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class User extends Model
{
    use HasFactory;
    public function role(){
       return $this->belongsTo(Role::class);
    }
    public function log($content){
        if(Storage::disk('local')->exists('log.txt')){
            Storage::append('log.txt',$content);
        }else{
            Storage::disk('local')->put('log.txt',$content);
        }
    }
}
