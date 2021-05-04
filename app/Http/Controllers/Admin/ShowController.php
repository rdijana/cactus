<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ShowController extends BackandController
{
    public function index(){
        return view("admin.pages.prikaz",$this->data);
    }
    public function logFile(Request $request){
//        dd($request->all());
        $content = null;
        $date=null;
        if($request->filled('date')){
//            return "ima";
            $date=strtotime($request->input("date"));
        }
        if(Storage::disk('local')->exists('log.txt')){
            $content = Storage::get('log.txt');
            $content = explode("nov",$content);
            array_pop($content);
            if($date){
                $filtered=[];
                foreach ($content as $log){
                    $logs=explode("\t",$log);
                    if($date<strtotime($logs[count($logs)-1])){
//                        dd(strtotime($logs[count($logs)-1]));
                        $filtered[]=$log;
                    }
                }
                $content= $filtered;
            }
        }
        return response()->json(['log'=>$content],201);
    }
}
