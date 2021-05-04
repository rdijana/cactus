@extends("layouts.admin")
@section("keywords") kaktus,gajenje,presađivanje,nega,postovi @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa.@endsection
@section("title") Admin | Postovi @endsection
@section("content")
    <div class="container">
        <div class="row d-flex flex-column">
    <a href="#" class="mb-4" id="btnInsertPost">Dodaj post</a>
    <div id="insertModal">

    </div>
    <div id="tabela">
    </div>
    <div id="editModal">

    </div>
        </div>
    </div>
@endsection
