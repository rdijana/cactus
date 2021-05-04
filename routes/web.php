<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\RegisterLoginController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\Admin\BackandController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\FamenuController;
use App\Http\Controllers\Admin\ShowController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/",[FrontendController::class,'pocetna'])->name("pocetna");
Route::get("/latest",[FrontendController::class,'latest'])->name("latest");
Route::get("/about",[FrontendController::class,'about'])->name("about");
Route::get("/autor",[FrontendController::class,'autor'])->name("autor");
Route::get("/blog",[FrontendController::class,"index"])->name("blog");
Route::get("/getData",[FrontendController::class,"getData"])->name("getData");
//Route::get("/kategorije",[FrontendController::class,"kategorije"]);
Route::get("/posts/fetch",[FrontendController::class,"getPosts"]);
Route::get("/posts/{id}",[FrontendController::class,'show']);
//Route::get("/postOne",[FrontendController::class,'postOne']);
Route::get("/contact",[FrontendController::class,'contact'])->name("contact");
Route::get("/login",[FrontendController::class,'login'])->name("loginSee");
Route::get("/register",[FrontendController::class,'reg'])->name("registracija");
Route::post("/contactIn",[FrontendController::class,"contactForm"]);



//LOGOVANJE REGISTRACIJA
Route::post("/registerUser", [RegisterLoginController::class,"register"])->name("registerUser");
Route::post("/loginUser", [RegisterLoginController::class,"login"])->name("loginUser");
Route::get("/logout",[RegisterLoginController::class,'logout'])->name("logout");

//KOMENTARI
Route::post("/comments/{postId}",[CommentsController::class,"commentInDb"])->name("commentIn");
Route::post("/comments/{commentId}/edit",[CommentsController::class,"edit"]);
Route::get("/comments/{commentId}/destroy",[CommentsController::class,"delete"]);
Route::get("/comments/{commentId}/show",[CommentsController::class,"show"]);

Route::get("/error",function(){
    return view('admin.pages.error');
})->name("error");

Route::middleware(['admin'])->group(function(){
//ADMIN
Route::get("/admin",[BackandController::class,'post'])->name("admin");

//POSTOVI
Route::get("/admin/posts", [PostController::class,"index"])->name("posts.index");
Route::get("/admin/posts/create", [PostController::class,"create"]);
Route::get("/admin/posts/getAll", [PostController::class,"getAll"]);
Route::post("/admin/posts", [PostController::class,"store"]);
Route::get("/admin/posts/{id}", [PostController::class,"show"]);
Route::put("/admin/posts/{id}/update", [PostController::class,"update"]);
Route::delete('/admin/posts/{id}', [PostController::class, 'destroy']);

//CATEGORIES
Route::get("/admin/categories",[CategoryController::class,"index"])->name('categories.index');
Route::get("/admin/categories/getAll",[CategoryController::class,"getCategories"]);
Route::post("/admin/categories", [CategoryController::class,"store"]);
Route::get("/admin/categories/{id}", [CategoryController::class,"show"]);
Route::put("/admin/categories/{id}/update", [CategoryController::class,"update"]);
Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy']);

//USERS
Route::get("/admin/users",[UserController::class,'index'])->name("users.index");
Route::get("/admin/users/getUsers",[UserController::class,'getUsers']);
Route::get("/admin/users/{id}",[UserController::class,'show']);
Route::put("/admin/users/{id}/update",[UserController::class,"update"]);
Route::delete("/admin/users/{id}",[UserController::class,'destroy']);

//ROLES
Route::get("/admin/roles",[RoleController::class,'index'])->name("roles.index");
Route::get("/admin/roles/getRoles",[RoleController::class,'getRoles']);
Route::post("/admin/roles",[RoleController::class,'store']);
Route::get("/admin/roles/{id}",[RoleController::class,"show"]);
Route::put("/admin/roles/{id}/update",[RoleController::class,'update']);
Route::delete("/admin/roles/{id}",[RoleController::class,'destroy']);

//MENI
Route::get("/admin/menus",[MenuController::class,"index"])->name("menus.index");
Route::get("/admin/menus/getMenuAll",[MenuController::class,'getMenuAll']);
Route::post("/admin/menus",[MenuController::class,'store']);
Route::get("/admin/menus/{id}",[MenuController::class,"show"]);
Route::put("/admin/menus/{id}/update",[MenuController::class,'update']);
Route::delete("/admin/menus/{id}",[MenuController::class,'destroy']);

//KOMENTARI
Route::get("/admin/comments",[CommentController::class,"index"])->name("comments.index");
Route::get("/admin/comments/getComments",[CommentController::class,"getComments"]);
Route::delete("/admin/comments/{id}",[CommentController::class,"destroy"]);

//PORUKE
Route::get("/admin/messages",[MessageController::class,"index"])->name("messages.index");
Route::get("/admin/messages/getAllMessage",[MessageController::class,"getAllMessage"]);
Route::delete("/admin/messages/{id}",[MessageController::class,"destroy"]);

//FA MENI
    Route::get("/admin/famenus",[FamenuController::class,"index"])->name("famenus.index");
    Route::get("/admin/famenus/getFamenuAll",[FamenuController::class,'getFamenuAll']);
    Route::post("/admin/famenus",[FamenuController::class,'store']);
    Route::get("/admin/famenus/{id}",[FamenuController::class,"show"]);
    Route::put("/admin/famenus/{id}/update",[FamenuController::class,'update']);
    Route::delete("/admin/famenus/{id}",[FamenuController::class,'destroy']);

    //Prikaz
    Route::get("/admin/shows",[ShowController::class,'index'])->name('shows.index');
    Route::get("/admin/logFile",[ShowController::class,'logFile']);
});
