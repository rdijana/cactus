<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Famenu extends Model
{
    use HasFactory;
    public static function getFamenu(){
        return Famenu::all();
    }
}
