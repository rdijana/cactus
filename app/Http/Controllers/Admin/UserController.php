<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BackandController
{

    public function index()
    {
        return view("admin.pages.users",$this->data);
    }
    public function getUsers(){
        return User::with("role")->get();
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }


    public function show($id)
    {
        return User::with("role")->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }


    public function update(UserUpdateRequest $request, $id)
    {
//        dd($request->all());

        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $email = $request->input('email');
        $username = $request->input('username');
        $active = $request->input('active');
        $role = $request->input('role');
        $password=$request->input("password");
        try{
            $user= User::find($id);

            $user->first_name = $first_name;
            $user->last_name= $last_name;
            $user->email = $email;
            $user->username = $username;
            $user->role_id=$role;
            $user->active=$active;
            $user->password=md5($password);
            $result = $user->save();
            if($result)
                return response()->json(["success"=>"Korisnik je ažuriran!"],201);
        }catch (\Exception $e){
            return response()->json(["error"=>"Došlo je do greške,pokušajte kasnije"],500);
        }
    }


    public function destroy($id)
    {
        $com = new Comment();
        $comment = $com->getUserCom($id);
//        dd($comment);
        if (isset($comment)) {
            return response()->json(["error" => "Nije moguće izbrisati korisnika,postoji komentar."], 409);
        }else{
        $user=User::find($id);
//        dd($post);
        try{
            $user->delete();
            return response()->json(["success"=>"Korisnik je izbrisan."],201);
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška pri brisanju,pokušajte kasnije"],500);
        }
    }
    }
}
