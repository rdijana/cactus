<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Famenu;
use App\Models\Menu;
use App\Models\Message;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FrontendController extends Controller
{
    private $postModel;
    protected $data;
    public function __construct()
    {

        $this->postModel = new Post();
        $this->data["footer"]=Famenu::getFamenu();
        $this->data["menu"]=Menu::getMenu();
    }
    public function index(){
       $this->data["categories"]=Category::all();
        return view("front.pages.post.blog",$this->data);
    }
    public function getData(){
        return Post::with(["category"])->get();
    }
    public function about(){
        return view("front.pages.main.about",$this->data);
    }
    public function pocetna(){
        return view("front.pages.main.home",$this->data);
    }
    public function latest(){
        return Post::with("category")->orderBy("created_at","desc")->take(3)->get();
    }
    public function contact(){
        return view("front.pages.main.contact",$this->data);
    }
    public function login(){
        return view("front.pages.log_reg.login",$this->data);
    }
    public function reg(){
        return view("front.pages.log_reg.registracija",$this->data);
    }
    public function show($id){
        $this->data["post"]=Post::with("category")->find($id);
        $comments = new Comment();
        $this->data["comments"]= $comments->getPostComments($id);
        return view("front.pages.post.show",$this->data);
    }
    public function autor(){
        return view("front.pages.main.autor",$this->data);
    }
    public function getPosts(Request $request){
        $categories=$request->categories;
        $sortValue=$request->sortValue;
        $search=$request->search;
        $posts=$this->postModel->getPost($categories,$sortValue,$search);
//        dd( response()->json($posts));
        return response()->json($posts);

    }
   public function contactForm(MessageRequest $request){
        $email=$request->input("email");
        $purpose=$request->input("purpose");
        $message=$request->input("message");
//        dd($email,$purpose,$message);
       try{
           $contact=new Message();
           $contact->email=$email;
           $contact->purpose=$purpose;
           $contact->content=$message;
           $contact->read=1;
//           $data=array(
//               'purpose'=>$purpose,
//               'message'=>$message,
//               'email'=>$email
//           );
           $result = $contact->save();
//            dd($result);

           if($result)
//               Mail::to('dijanaradovanovic9999@gmail.com')->send(new \App\Mail\SendMail($data));
               return response()->json(["success"=>"Poruka je uspešno poslata!"],201);

       }catch (\Exception $e){
           return response()->json(["error"=>"Došlo je do greške,pokušajte kasnije"],500);
       }
   }
}
