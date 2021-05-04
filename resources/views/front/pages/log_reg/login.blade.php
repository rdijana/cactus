@extends("layouts.front")
@section("keywords") kaktus,gajenje,presađivanje,nega,logovanje @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa, kao i mogućnost logovanja korisnika. @endsection
@section("title") Kaktus | Logovanje @endsection
@section("content")
    <div class="container col-12 mb-5 pb-5">
        <div class="row mb-5 pb-5 mt-5 d-flex justify-content-center">
            <div class="col-lg-4">
                <h2 class="text-center pb-5 mt-5">Logovanje</h2>
                <form method='POST'>
{{--                    action="{{route("loginUser")}}--}}
                    @csrf
                    <div class="form-group mb-4">
                        <input type="text" name="tbEmail" id="tbEmail" placeholder='Email' class='form-control'>
                        <p class='uputstvo'></p>
                    </div>
                    <div class="form-group mb-4">
                        <input type="password" name="tbPassword" id="tbPassword" placeholder='Lozinka' class='form-control'>
                        <p class='uputstvo'></p>
                    </div>
                    <button id='btnLogin' class="btn btn-outline-secondary">Ulogujte se</button>

                </form>
                <div><p id="errorLog"></p></div>
                <br/>
                <p class="text-left">Nemate nalog? Možete se registrovati putem linka: <a href="{{route("registracija")}}">Registracija</a></p>
            </div>
        </div>
    </div>
@endsection
@section("script") <script src="{{asset('assets/js/script.js')}}"></script> @endsection
