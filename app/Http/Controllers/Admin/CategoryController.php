<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class CategoryController extends BackandController
{

    public function index()
    {
        return view("admin.pages.categories",$this->data);
    }
   public function getCategories(){
        return Category::all();
   }

    public function create()
    {

    }

    public function store(CategoryStoreRequest $request)
    {
//        dd($request->all());
        $name=$request->input('name');
        $cat=new Category();
        $cat->name=$name;
        try{
            if($cat->save()){

                return response()->json(["success"=>"Kategorija je dodata."],201);
            }else{
                return response()->json(["error"=>"Greška,pokušajte kasnije"],500);

            }
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
        }
    }


    public function show($id)
    {
        return Category::find($id);
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


    public function update(CategoryUpdateRequest $request, $id)
    {
//        dd($request->all());
        $nameE=$request->input("nameE");
        $catUpdate=Category::find($id);
//        dd($catUpdate);
        try{
            $catUpdate->name=$nameE;
            if($catUpdate->save()){
                return response()->json(["success"=>"Kategorija je ažurirana."],201);
            }else{
                return response()->json(["error"=>"Greška,pokušajte kasnije"],500);

            }
        }catch (\Exception $ex){
            return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
        }
    }


    public function destroy($id)
    {
        $post=Post::with("category")->where("category_id",$id)->first();
        if(isset($post)){
            return response()->json(["error"=>"Nije moguće izbrisati kategoriju,postoji post sa izabranom kategorijom."],409);
        }else{
            $category=Category::find($id);
            try{
            $category->delete();
                return response()->json(["success"=>"Kategorija je izbrisana."],201);
            }catch (\Exception $ex){
                return response()->json(["error"=>"Greška pri brisanju,pokušajte kasnije"],500);
            }
        }

    }
}
