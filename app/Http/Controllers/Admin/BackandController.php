<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;

class BackandController extends Controller
{
    protected $data;
    public function __construct()
    {

        $this->data["menu"]=Menu::getMenuAdmin();
    }
        public function post(){
            return view("admin.pages.pocetna",$this->data);
        }

}
