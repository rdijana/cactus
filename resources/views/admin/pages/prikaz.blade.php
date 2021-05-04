@extends("layouts.admin")
@section("keywords") kaktus,gajenje,presađivanje,nega,uloge @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa.@endsection
@section("title") Admin | Prikaz @endsection
@section("content")
    <div class="container">
        <div class="row d-flex flex-column">
            <div class="d-flex justify-content-start">
    <div id="filter" class="mb-4">
        <label>Filtriraj po datumu:</label>
        <select id="filterLogDate" class="form-control">
            <option value="null">Izaberi</option>
            <option value="-15 minutes">Poslednjih 15 minuta</option>
            <option value="-30 minutes">Poslednjih 30 minuta</option>
            <option value="-1 hour">Poslednjih sat vremena</option>
            <option value="-1 day">Pre 1 dan</option>
        </select>
    </div>
            </div>

            <div id="tabelaPrikaz">

            </div>
        </div>
    </div>
@endsection

