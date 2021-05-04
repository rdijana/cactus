<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends BackandController
{

    public function index()
    {
            return view("admin.pages.posts",$this->data);
    }
    public function getAll(){
        return Post::with("category")->paginate(5);
    }
    public function create()
    {
       return Category::all();

    }

    public function store(PostRequest $request)
    {
        $title=$request->input("title");
        $description=$request->input("description");
        $content=$request->input("content");
        $category=$request->input("category");
        $picture=$request->file("picture");
        if($picture->isValid()){
            $newName=time().$picture->getClientOriginalName();
            $picture->move(public_path()."/assets/images",$newName);

            $post=new Post();
            $post->title=$title;
            $post->description=$description;
            $post->content=$content;
            $post->image=$newName;
            $post->category_id=$category;

           try{
               $post->save();
               if($post){
                   return response()->json(["success"=>"Post je dodat."],201);
               }else{
                   return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
               }

           }catch(\Exception $ex){
               return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
           }
        }else{
            return response()->json(["error"=>"Podaci nisu dobro uneti."],422);

        }

    }


    public function show($id)
    {
       return Post::with("category")->find($id);
    }

    public function edit($id)
    {
        //
    }


    public function update(PostUpdateRequest $request, $id)
    {
//              dd($request->all());
        $title=$request->input("title");
        $description=$request->input("description");
        $content=$request->input("content");
        $category=$request->input("category");
        $picture=$request->file("picture");

        $post=Post::find($id);
        $post->title=$title;
//        dd($post->title);
        $post->description=$description;
        $post->content=$content;
        $post->category_id=$category;
        if($picture && $picture->isValid()){
            $newName=time().$picture->getClientOriginalName();
            $picture->move(public_path()."/assets/images",$newName);
            $post->image=$newName;
        }

            try{
                $post->save();
                if($post){
                    return response()->json(["success"=>"Post je ažuriran."],201);
                }else{
                    return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
                }

            }catch(\Exception $ex){
                return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
            }


    }


    public function destroy($id)
    {
        $com = new Comment();
        $comment = $com->getPostCom($id);
//        dd($comment);
        if (isset($comment)) {
            return response()->json(["error" => "Nije moguće izbrisati post,postoji komentar."], 409);
        }else{
            $post = Post::find($id);
            try {
                $post->delete();
                return response()->json(["success" => "Post je izbrisan."], 201);
            } catch (\Exception $ex) {
                return response()->json(["error" => "Greška pri brisanju,pokušajte kasnije"], 500);
            }
        }
    }
}
