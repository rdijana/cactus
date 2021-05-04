<div class="row px-0 mx-0 d-flex justify-content-center">
    <div class=" col-12 col-md-10">
        <form method="POST">
            @csrf
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" id="purpose" name='purpose' class="form-control" placeholder="Svrha poruke">
                        <p class="obavestenje"></p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="email" id="email" name='email'class="form-control" placeholder="Email">
                        <p class="obavestenje"></p>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <textarea name="message" id="message" class="form-control" rows="4"placeholder="Poruka" ></textarea>
                <p class="obavestenje"></p>
            </div>
            <button type="button" class="btn btn-outline-secondary" name='btnPosalji' id="btnPosalji">Pošalji</button>
        </form>
        <div id="poruka">

        </div>

    </div>
</div>
