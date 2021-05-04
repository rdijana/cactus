<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FamenuStoreRequest;
use App\Http\Requests\FamenuUpdateRequest;
use App\Models\Famenu;
use Illuminate\Http\Request;

class FamenuController extends BackandController
{

    public function index()
    {
        return view("admin.pages.famenu",$this->data);
    }
    public function getFamenuAll(){
         return Famenu::all();
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


    public function store(FamenuStoreRequest $request)
    {
//        dd($request->all());
        $name=$request->input('name');
       $path=$request->input("path");
        $menu=new Famenu();
        $menu->name=$name;
        $menu->path=$path;
        try{
            if($menu->save()){

                return response()->json(["success"=>"Link za meni je dodat."],201);
            }else{
                return response()->json(["error"=>"Greška,pokušajte kasnije"],500);

            }
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
        }
    }


    public function show($id)
    {
        return Famenu::find($id);
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


    public function update(FamenuUpdateRequest $request, $id)
    {
//        dd($request->all());
        $nameE=$request->input("nameE");
        $pathE=$request->input("pathE");
        $menuE=Famenu::find($id);
        try{
            $menuE->name=$nameE;
            $menuE->path=$pathE;
            if($menuE->save()){
                return response()->json(["success"=>"Link za meni je ažuriran."],201);
            }else{
                return response()->json(["error"=>"Greška,pokušajte kasnije"],500);

            }
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
        }
    }


    public function destroy($id)
    {
        $link=Famenu::find($id);
//        dd($link);
        try{
            $link->delete();
            return response()->json(["success"=>"Link je izbrisan."],201);
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška pri brisanju,pokušajte kasnije"],500);
        }
    }
}
