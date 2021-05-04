<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentStoreRequest;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
     public function commentInDb(CommentStoreRequest $request,$postId){
         if($request->has("content")){
             $user=new User();
             $comment=new Comment();
             $comment->content=$request->input("content");
             $comment->post_id=$postId;
             try{
                 $comment->save();
                 $content=$request->ip()."\t".$request->url()."\t".$request->method()."\t".session()->get('user')->id."\t"."Korisnik je ostavio komentar na post sa id: ".$postId."\t".date('Y-m-d H:i:s')."nov";
                 $user->log($content);
                 return redirect()->back()->with('success', "Komentar je dodat.");
             }catch (\Exception $e){
                 return redirect()->back()->with('error', "Došlo je do greške,pokušajte kasnije.");
             }
         }
     }
     public function edit(Request $request,$commentId){
         $comment=new Comment();
         try{
             $comment->content=$request->input("content");
             $comment->update($commentId);
             return response()->json(["success"=>"Komentar je izmenjen."],201);
         }catch(\Exception $e){
             return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
         }
     }
    public function show($commentId){
        $comment=new Comment();
        $one=$comment->find($commentId);
        return response()->json($one);
    }
     public function delete($commentId){
         $comment=new Comment();
         if($comment->find($commentId)){
             try{
                 if($comment->delete($commentId)){
                     return response()->json(["success"=>"Komentar je izbrisan."],201);
                 }
             }catch (\Exception $ex){
                 return response()->json(["error"=>"Greška,pokušajte kasnije"],500);
             }
         }
     }
}
