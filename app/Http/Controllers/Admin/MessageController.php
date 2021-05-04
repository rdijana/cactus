<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends BackandController
{

    public function index()
    {
        return view("admin.pages.messages",$this->data);
    }
    public function getAllMessage(){
        return Message::all();
    }
    public function destroy($id)
    {
        $mess=Message::find($id);
//        dd($link);
        try{
            $mess->delete();
            return response()->json(["success"=>"Poruka je izbrisana."],201);
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška pri brisanju,pokušajte kasnije"],500);
        }

    }
}
