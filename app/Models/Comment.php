<?php

namespace App\Models;


class Comment
{
    public $content;
    public $post_id;
    private $table = 'comments';

    //Iz sesije uzimamo id korisnika koji unosi komentar
    public function save()
    {
        return \DB::table($this->table)
            ->insert([
                'user_id' => session()->get('user')->id,
                'post_id' => $this->post_id,
                'content' => $this->content,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ]);
    }

    public function update($id)
    {
        return \DB::table($this->table)
            ->where('id', $id)
            ->update([
                'content' => $this->content,
                'updated_at' => date("Y-m-d H:i:s")
            ]);
    }

    public function getPostComments($postId)
    {
        return \DB::table($this->table)
            ->select('comments.*', 'users.username','users.first_name','users.last_name')
            ->join("users", "comments.user_id", "=", "users.id")
            ->where('post_id', $postId)
            ->get();
    }
    public function getPostCom($postId){
        return \DB::table($this->table)
            ->select('comments.content')
            ->join("posts", "comments.post_id", "=", "posts.id")
            ->where('post_id', $postId)
            ->first();
    }
    public function getUserCom($userId){
        return \DB::table($this->table)
            ->select('comments.content')
            ->join("users", "comments.user_id", "=", "users.id")
            ->where('user_id', $userId)
            ->first();
    }
    public function delete($id)
    {

            return \DB::table($this->table)->delete($id);

    }
    public function getAll(){
        return \DB::table($this->table)
            ->select('comments.*','users.first_name','users.last_name',"posts.title")
            ->join("users", "comments.user_id", "=", "users.id")
            ->join("posts","comments.post_id","=","posts.id")
            ->get();
    }

    public function find($id)
    {
        return \DB::table($this->table)
            ->where('id', $id)->get()->first();
    }

}
