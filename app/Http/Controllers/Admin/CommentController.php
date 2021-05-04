<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends BackandController
{
    public function index()
    {
        return view("admin.pages.comments",$this->data);
    }
    public function getComments(){
        $comments=new Comment();
        return $comments->getAll();
    }

    public function destroy($id)
    {
        $comment=new Comment();
        if($comment->find($id)) {
            try {
                if ($comment->delete($id)) {
                    return response()->json(["success" => "Komentar je izbrisan."], 201);
                }
            } catch (\Exception $ex) {
                return response()->json(["error" => "Greška,pokušajte kasnije"], 500);
            }
        }
    }
}
