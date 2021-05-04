@extends("layouts.front")
@section("keywords") kaktus,gajenje,presađivanje,nega,registracija @endsection
@section("description") Kaktus blog je lični blog koji čitaocima daje savete o gajenju,presađivanje,nezi kaktusa, kao i mogućnost registracije korisnika. @endsection
@section("title") Kaktus | Registracija @endsection
@section("content")
    <div class="container mb-5">
        <div class="row mt-5 pt-5 align-items-center">
            <div class="col-md-6 mx-auto ">
                <h2 class="text-center mb-5">Registracija</h2>
                <form class='form-horizontal'  method="POST">
                    @csrf
                    <div class="control-group">
                        <label class='control-label' for='first_name'>Ime</label>
                        <div class="form-group">
                            <input type="text"class="form-control" id="first_name" name="first_name"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class='control-label' for='last_name'>Prezime</label>
                        <div class="form-group">
                            <input type="text"class="form-control" id="last_name" name="last_name"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class='control-label' for='username'>Korisničko ime</label>
                        <div class="form-group">
                            <input type="text"class="form-control" id="username" name="username">
                            <p class='uputstvo'>
                            </p>

                        </div>
                    </div>
                    <div class="control-group">
                        <label class='control-label' for='email'>Email</label>
                        <div class="form-group">
                            <input type="text"class="form-control" id="email" name="email"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class='control-label' for='password'>Lozinka</label>
                        <div class="form-group">
                            <input type="password"class="form-control" id="password" name="password"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>

                    <div class="control-group">
                        <div class="controls">
                            <button class="btn btn-outline-secondary" type='button' id="btnRegistracija">Registruj se</button>
                        </div>
                    </div>
                </form>
                <div><p id="success"></p></div>
                <div id="error"></div>
            </div>
        </div>
    </div>
@endsection
@section("script") <script src="{{asset('assets/js/script.js')}}"></script> @endsection
