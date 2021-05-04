<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\RoleUpdateRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class RoleController extends BackandController
{

    public function index()
    {
        return view("admin.pages.roles",$this->data);
    }
    public function getRoles(){
        return Role::all();
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


    public function store(RoleStoreRequest $request)
    {
//        dd($request->all());
        $name=$request->input('name');
        $rol=new Role();
        $rol->name=$name;
        try{
            if($rol->save()){

                return response()->json(["success"=>"Uloga je dodata."],201);
            }else{
                return response()->json(["error"=>"Greška,pokušajte kasnije"],500);

            }
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
        }
    }

    public function show($id)
    {
        return Role::find($id);
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


    public function update(RoleUpdateRequest $request, $id)
    {
//        dd($request->all());
        $nameE=$request->input("nameE");
        $role=Role::find($id);
        try{
            $role->name=$nameE;
            if($role->save()){
                return response()->json(["success"=>"Uloga je ažurirana."],201);
            }else{
                return response()->json(["error"=>"Greška,pokušajte kasnije"],500);

            }
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
        }
    }


    public function destroy($id)
    {
        $user=User::with("role")->where("role_id",$id)->first();
//        dd($user);
        if(isset($user)){
            return response()->json(["error"=>"Nije moguće izbrisati ulogu,postoji korisnik sa izabranom ulogom."],500);
        }else{
            $role=Role::find($id);
            try{
                $role->delete();
                return response()->json(["success"=>"Uloga je izbrisana."],201);
            }catch (\Exception $ex){
                return response()->json(["error"=>"Greška pri brisanju,pokušajte kasnije"],500);
            }
        }

    }
}
