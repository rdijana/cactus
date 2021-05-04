@extends("layouts.front")
@section("keywords") kaktus,gajenje,presađivanje,Danijela,blog @endsection
@section("description") Kaktus blog je lični blog Danijele Radovanović koja čitaocima daje savete o nezi,gajenju,presađivanju kaktusa. @endsection
@section("title") Kaktus | O meni @endsection
@section("content")

    <div class="container-fluid">

        <div class="row mt-5">
            <div class="col-12">
                <h1 class="text-center mt-5 mb-5 pb-5">O meni</h1>
            </div>
        </div>
        <div class="row d-flex justify-content-around">
            <div class="col-lg-5 col-md-5 col-sm-7 col-8 mx-0 pb-5">
                <img class="img-fluid" src="{{asset('assets/images/danijela.jpg')}}" alt="Danijela"/>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-7 col-8 mx-0 pb-5">
                <p text-align="center">Zovem se Danijela Radovanović i dolazim iz Loznice. Srednju školu i
                    studije molekularne biologije završila sam u Beogradu. Sada sam student doktorskih studija
                    iz iste oblasti na Medicinskom Univerzitetu u Beču.<br/> Kao biolog jako volim prirodu a samim tim
                    i biljke, imam dosta cveća a kaktusi su najbrojniji u toj družini. Privukli su moju pažnju i
                    interesovanje jer su neobični i jedinstveni. Prve kaktuse mi je poklonila strina koja je takođe
                    ljubitelj kaktusa i tu je negde i počela moja ljubav prema njima.<br/> Kaktusi su zaista raznovrsni i poseduju
                    mnoštvo boja i oblika a nešto što ih čini posebnim su njihove bodlje koje zapravo prekrivaju nežno stablo,
                    kao i cvet koji je jedinstven za svaki kaktus. Oni su takođe jako zahvalni za održavanje i ne zahtevaju mnogo
                    vremena što je jako dobro za ljude koji imaju posao i porodicu. Potrebno je malo pažnje i ljubavi i oni će vam to
                    vratiti prelepim cvetićima.<br/>
                    Takođe su jako lagani za presađivanje i razmnožavanje i od jednog kaktusa brzo možete dobiti nove.
                    Zbog toga iako sam zauzeta svojim poslom stižem da imam veliki broj kaktusa i da njihovom lepotom
                    ukrasim svoj prostor.<br/> Pazite ukoliko vam se svide jako je tesko zadržati se na samo nekoliko biljaka.</p>
            </div>
        </div>
    </div>

@endsection
