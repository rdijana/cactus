<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RegisterLoginController extends Controller
{
    public function register(RegistrationRequest $request){

        $first_name = $request->input('first_name');
//        dd($first_name);
        $last_name = $request->input('last_name');
        $email = $request->input('email');
        $username = $request->input('username');
        $password = $request->input('password');
//        return response($first_name);

        try{
            $user= new User();

            $user->first_name = $first_name;
            $user->last_name= $last_name;
            $user->email = $email;
            $user->username = $username;
            $user->password= md5($password);
            $user->role_id=1;
            $user->created_at=date('Y-m-d H:i:s');
            $user->active=1;
            $result = $user->save();
//            dd($result);

            if($result)
                $content=$request->ip()."\t".$request->url()."\t".$request->method()."\t".$user->id."\t"."Korisnik se uspešno registrovao"."\t".date('Y-m-d H:i:s')."nov";
                $user->log($content);
                return response()->json(["success"=>"Registrovali ste se!"],201);

        }catch (\Exception $e){
            return response()->json(["error"=>"Došlo je do greške,pokušajte kasnije"],500);
        }
    }
    public function login(Request $request){
        $email = $request->input('email');
        $password = $request->input('password');
        $pas=md5($password);
//        dd($email);
//        dd($password);
        try{
            $user=User::where([["email",$email],["password",$pas]])->first();;
//        dd($user->role_id);
            if ($user) {
//                dd($user);
                $userLog=new User();
                $isAdmin=$user->role_id==2;
                $user->isAdmin=$isAdmin;
                $request->session()->put('user', $user);
                $content=$request->ip()."\t".$request->url()."\t".$request->method()."\t".$user->id."\t"."Korisnik je uspešno ulogovan"."\t".date('Y-m-d H:i:s')."nov";
                $userLog->log($content);
                return response()->json(["isAdmin"=>$isAdmin],201);
            } else {
                return response()->json(["error"=>"Pogrešni kredencijali!"],404);
            }
        }
        catch(\Exception $e){
            return response()->json(["error"=>"Došlo je do greške,pokušajte kasnije"],500);
        }
        }
        public function logout(Request $request){
        $user=new User();
        $userId=session()->get('user')->id;
        //sklanjanje iz sesije i redirekt na formu
//            session()->flush();
            $request->session()->remove("user");
            $content=$request->ip()."\t".$request->url()."\t".$request->method()."\t".$userId."\t"."Korisnik se izlogovao."."\t".date('Y-m-d H:i:s')."nov";
            $user->log($content);
            return redirect(route("loginSee"));
        }

}
