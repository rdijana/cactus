@extends("layouts.admin")
@section("keywords") kaktus,gajenje,presađivanje,nega,admin @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa.@endsection
@section("title") Admin | Početna @endsection
@section("content")
<div class="container">
    <div class="row d-flex flex-column">
        <h3 class="text-center">Dobrodošli u admin panel,
            @if(session()->get('user')->isAdmin) {{session()->get('user')->first_name." ".session()->get('user')->last_name}} @endif</h3>
        <h5 class="text-center">Klikom na link možete otići na korinički deo sajta  <a href="{{route("pocetna")}}">Početna</a></h5>
    </div>
</div>
@endsection
