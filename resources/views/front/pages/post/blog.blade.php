@extends("layouts.front")
@section("keywords") kaktus,gajenje,presađivanje,nega,blog @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa, kao i mogućnost filtriranja postova. @endsection
@section("title") Kaktus | Blog @endsection
@section("content")

    <div class="container-fluid col-12 pt-5 mt-5">
{{--        <div class="row d-flex justify-content-center mt-3 pt-4">--}}
            <div class="col-12 py-5">
                <h2 class="text-center">Moj blog</h2>
            </div>
{{--            <div>--}}
                <div class="row d-flex justify-content-between flex-wrap m-0">
                <div class="col-3">
                <div class="col-md-10 col-sm-6 col-12 mt-3 ml-5" id="kategorije">
                    <ul class="list-group">
                        @foreach($categories as $category)
                            <li class="list-group-item">
                                <input type="checkbox" name="categories" class="categories" id="{{ $category->id }}" value="{{$category->id}}"/> {{ $category->name }}
                            </li>
                        @endforeach
                    </ul>
                </div>
                <div class="col-md-10 col-sm-6 col-12 mt-5 ml-5">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <input type="radio" id="asc"  value="asc" name="btnDate" class="btnDate"/> Datum rastuće
                        </li>
                        <li class="list-group-item">
                            <input type="radio" id="desc" value="desc" name="btnDate" class="btnDate"/> Datum opadajuće
                        </li>
                    </ul>
                </div>
                <div class="col-md-10 col-sm-6 col-12  mt-5 ml-5 pb-4">
                    <div id="search" class="search-container">
                        <div class="input-group flex-nowrap">
                            <div class="input-group-prepend">
                                <span><button type="button" class="btn btn-outline-secondary" id="btnSearch"><i class="fa fa-search" ></i></button></span>
                            </div>
                            <input type="text" class="form-control tbSearch" placeholder="Search"  name="search" aria-label="Search" aria-describedby="addon-wrapping">
                        </div>
                    </div>
                </div>
        </div>
        <div class="col-9">
            <div class="row d-flex justify-content-around mx-0" id="postovi">

{{--                //OVDE PETLJA ZA PRIKAZ PROIZVODA--}}


            </div>
            <div class="col-12 d-flex justify-content-center mt-5">
                <div id="paginacija" class="mb-5">

                </div>
            </div>
        </div></div></div>



@endsection
@section("script") <script src="{{asset('assets/js/script.js')}}"></script> @endsection
