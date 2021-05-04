<div class="col-md-3 col-sm-6 col-xs-12 mt-5 okvir m-3 p-2">
    <a href="{{asset('assets/images/'.$post->image)}}" data-lightbox="ourgallery">

        <img src="{{asset('assets/images/'.$post->image)}}" class="img-fluid" alt="{{$post->title}}"/>
    </a>
    <p class="text-center">{{$post->title}}</p>
    <p class="text-center">Datum: {{date("m-d-Y", strtotime($post->created_at))}} / Kategorija: {{$post->category->name}}
    </p>
<p class="text-center">
{{--   Svetlost, u ovom postu ću vam ukratko objasniti bitnost prirodne svetlosti za uzgoj kaktusa.--}}
    {{$post->description}}
</p>
    <div class="col-12 d-flex justify-content-center">
        <a href="{{route('posts.show',["post"=>$post->id])}}" class="btn btn-outline-secondary">Vidi post</a>
    </div>
</div>
