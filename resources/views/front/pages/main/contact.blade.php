@extends("layouts.front")
@section("keywords") kaktus,gajenje,presađivanje,nega,kontakt @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa, kao i mogućnost kontaktiranja administratora sajta. @endsection
@section("title") Kaktus | Kontakt @endsection
@section("content")
    <div class="container-fluid pt-5 mt-5"  >
        <h2 class="text-center pt-3 m-5">Kontakt</h2>
    </div>
    <div class="container-fluid mx-0 mb-5 pt-5">
        <div class="row mx-0 d-flex justify-content-around flex-wrap ">
            <div class="col-lg-4 col-12 text-center mb-4">
                <h2 class="mb-4 pt-4">Informacije</h2>
                <!--            <p></p>-->

                <p>Telefon:064/000/000</p>
                <p>Instagram: <a href="instagram.com" class="text-decoration-none">dany_radov</a> </p>
                <p class="mb-4">E-mail: <a href="gmail.com" class="text-decoration-none">daki&#64;gmail&#46;com</a></p>

                <p>Facebook: <a href="facebook.com" class="text-decoration-none">Danijela Radovanović</a> </p>
            </div>
            <div class="col-lg-7 col-12 mx-0 mb-4">
                <div class="row mb-0 px-0 mx-0">
                    <div class="col-12">
                        <h2 class="text-center mb-4 pt-2">Kontakt forma</h2>
                    </div>
                </div>
               @include("front.partials.contact_form")
            </div>
        </div>
    </div>
@endsection
@section("script") <script src="{{asset('assets/js/script.js')}}"></script> @endsection
