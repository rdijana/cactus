<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuStoreRequest;
use App\Http\Requests\MenuUpdateRequest;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends BackandController
{

    public function index()
    {
             return view("admin.pages.menu",$this->data);
    }
    public function getMenuAll(){
        return Menu::all();
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


    public function store(MenuStoreRequest $request)
    {
//        dd($request->all());
        $name=$request->input('name');
        $route=$request->input('route');
        $order=$request->input('order');
        $menu=new Menu();
        $menu->name=$name;
        $menu->route=$route;
        $menu->order=$order;
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
        return Menu::find($id);
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


    public function update(MenuUpdateRequest $request, $id)
    {
//        dd($request->all());
        $nameE=$request->input("nameE");
        $routeE=$request->input("routeE");
        $orderE=$request->input("orderE");
        $menuE=Menu::find($id);
        try{
            $menuE->name=$nameE;
            $menuE->route=$routeE;
            $menuE->order=$orderE;
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
        $link=Menu::find($id);
//        dd($link);
        try{
            $link->delete();
            return response()->json(["success"=>"Link je izbrisan."],201);
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška pri brisanju,pokušajte kasnije"],500);
        }
    }
}
