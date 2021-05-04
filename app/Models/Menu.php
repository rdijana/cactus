<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
    public static function getMenu(){
        return Menu::orderBy("order")->where("order","<",6)->get();
    }
    public static function getMenuAdmin(){
        return Menu::orderBy("order")->where("order",">",5)->get();
    }
}
