@extends("layouts.front")
@section("keywords") kaktus,gajenje,presađivanje,nega,početna @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa. @endsection
@section("title") Kaktus | Početna @endsection
@section("content")
    <div class="container-fluid">
{{--        //POCETNA SLIKA--}}
        <div class="row">
            <div class="col-12" id="slikaPoc">

            </div>
        </div>
{{--        //TEKST O KAKTUSIMA--}}
        <div class="row">
            <div class="col-12">
                <h1 class="text-center mt-5 mb-5 pb-5">O kaktusima</h1>
            </div>
        </div>
        <div class="row d-flex justify-content-around">
            <div class="col-lg-5 col-md-5 col-sm-7 col-8 mx-0 pb-5">
                <img class="img-fluid" src="{{asset('assets/images/pocetna2.jpg')}}" alt="Kaktusi"/>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-7 col-8 mx-0 pb-5">
                <p text-align="center">Opis kaktusa - Naziv kaktus potiče od grčke reči kaktos, koja znači bodljikava biljka.
                    <br/>Kaktuse nalazimo neobičnih oblika, veličina, površina i sa raznim bojama cvetova. Mnogi imaju izmenjeno lišće i neobične oblike kojima sprečavaju gubitak vode. Neki su izbrazdani ili razdeljeni i mogu imati ukrasne bodlje, čekinje ili dlake.
                    <br/>Poreklo - Jugozapadne SAD, centralna i Južna Amerika i južna Kanada.    Familija - Cactaceae                                                            Vrste - Postoje dve grupe kaktusa - pustinjski (obično sa prekriveni bodljama), i šumski ili kišno-šumski koji rastu u džungli (najčešće bez bodlji, pretežno epifiti). Postoje oko 200 rodova i više hiljada vrsta. Kaktusi su uglavnom male biljke, ali ima i onih koji rastu do 3m visine. To su cvetnice i njihovi oblici mogu biti sferični, gomilasti, pljosnati ili stubasti.Kaktusi su sukulenti (biljke koje skladiste vodu). Sukulenti su šira grupa od kaktusa, tako da su svi kaktusi sukulenti, a samo su neki sukulenti kaktusi.                   Zašto oni skladište vodu?
                    U prirodnim staništima kiše su retke, tako da su prilagođeni da prežive duge sušne periode.
                    <br/>Zato je pravilo br. 1: Kaktusima neće biti nimalo prijatno ako ih uopšte ne zalivate, ali će sigurno stradati ako ih zalivate mnogo (kao što to činite sa ostalim sobnim biljkama).</p>
            </div>

        </div>
        <div class="row">
            <div class="col-12">
                <h1 class="text-center mt-5 mb-5 pb-5">Najnoviji postovi</h1>
            </div>
        </div>
        <div class="row d-flex justify-content-around" id="najnoviji">
{{--            //OVDE PETLJA ZA ISPIS 3 NAJNOVIJA--}}
{{--            @foreach($posts as $post)--}}
{{--            @component("front.partials.block",["post"=>$post])@endcomponent--}}
{{--            @endforeach--}}
        </div>

    </div>
@endsection
@section("script") <script src="{{asset('assets/js/script.js')}}"></script> @endsection
