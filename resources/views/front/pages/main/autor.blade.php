@extends("layouts.front")
@section("keywords") kaktus,gajenje,presađivanje,nega,autor @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa. @endsection
@section("title") Kaktus | Autor @endsection
@section("content")
    <div class="container-fluid p-0 m-0" >
        <div class="row mt-5 mx-0 d-flex align-items-baseline">

            <div class="col-12 mt-5 p-0">

                <h2 class="text-center mb-5">O autoru</h2>
            </div>

        </div>
    </div>
    <div class="container-fluid p-0 mx-0 mt-5">
        <div class="row mx-0 d-flex justify-content-around">
            <div class="col-lg-4 col-md-5 col-sm-7 col-8 mx-0 pb-5">
                <img class="img-fluid" src="{{asset('assets/images/autor.jpg')}}" alt="Autor"/>
            </div>
            <div class="col-lg-4 col-12 ">
                <h2 class="text-center pb-3">O meni</h2>
                <p class="text-center">Zdravo,zovem se Dijana Radovanović
                    imam 21 godinu i živim u Beogradu.Trenutno pohađam
                    Visoku ICT školu, smer Internet tehnologije.Ovaj sajt je rađen kao projekat za školu.Pogledajte moje ostale projekte i pratite me na društvenim mrežama.
                </p>

                <ul id="linkBz">
                    <li class="text-center"><a href="https://rdijana.github.io/portfoliodijanaradovanovic/" class=" text-decoration-none black-text" target="_blank" >Porfolio</a></li>
                    <li class="text-center"><a href="https://www.facebook.com"target="_blank" class=" text-decoration-none black-text" >Facebook</a></li>
                    <li class="text-center"><a href="https://www.instagram.com" target="_blank" class=" text-decoration-none black-text" >Instagram</a></li>
                    <li class="text-center"><a href="https://www.linkedin.com" class=" text-decoration-none black-text" target="_blank">Linkedin</a></li>
                </ul>

            </div>
        </div>
    </div>
@endsection
