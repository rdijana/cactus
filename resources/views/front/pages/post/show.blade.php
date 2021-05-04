@extends("layouts.front")
@section("keywords") kaktus,gajenje,presađivanje,nega,post @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa, kao i mogućnost komentarisanja posta. @endsection
@section("title") Kaktus | Post @endsection
@section("content")
 <div class="container">
        <div class="row mt-5 d-flex justify-content-center">
            <div class="col-lg-8 mt-5" id="post">
                <h1 class="mt-4">{{$post->title}}</h1>
                <p>Postavljen {{date("m-d-Y", strtotime($post->created_at))}} / Kategorija: {{$post->category->name}}</p>
                <hr>
                <img class="img-fluid rounded" src="{{asset('assets/images/'.$post->image)}}" alt="{{$post->title}}">
                <hr>
                <p>
                    {!!$post->content!!}
                </p>
                <hr>
                @include("front.partials.comment")
            @if(session()->has('user') && session()->get('user')->active == 1)
               @include("front.partials.commentForm")
            @else
                <div>
                    <h5>Obaveštenje: </h5>
                    <p>Mogućnost ostavljanja komentara imaju samo ulogovani i aktivni korisnici!</p>
                </div>
                @endif
            </div>
        </div>
    </div>
@endsection
@section("script") <script src="{{asset('assets/js/script.js')}}"></script> @endsection

