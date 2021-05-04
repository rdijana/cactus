<footer class=" bg-dark">
    <div class="container">
        <div class="row d-flex justify-content-center mx-0 px-0">
            <div class="col-7">
                <p class="text-center mt-3 text-muted">Linkovi</p>
                <ul id="futer">
                    @foreach($footer as $f)
{{--                        {{dd($footer)}}--}}
                        <li class="text-decoration-none p-2"><a href="{{$f->path}}" class="text-decoration-none"><i class="{{$f->name}}"></i></a></li>
                    @endforeach
{{--                    <li class="text-decoration-none p-2"><a href="instagram.com" class="text-decoration-none"><i class="fab fa-instagram"></i></a></li>--}}
{{--                    <li class="text-decoration-none p-2"><a href="facebook.com" class="text-decoration-none"><i class="fab fa-facebook-square"></i></a></li>--}}
{{--                    <li class="text-decoration-none p-2"><a href="gmail.com" class="text-decoration-none"><i class="fas fa-envelope-open-text"></i></a></li>--}}
{{--                    <li class="text-decoration-none p-2"><a href="dokumentacija.pdf" class="text-decoration-none"><i class="fas fa-book"></i></a></li>--}}
{{--                    <li class="text-decoration-none p-2"><a href="sitemap.xml" class="text-decoration-none"><i class="fa fa-sitemap" aria-hidden="true"></i></a></li>--}}

                </ul>
                <p class="text-center text-muted">Copyright ©2021 All rights reserved</p>
            </div>
        </div>
    </div>
</footer>
