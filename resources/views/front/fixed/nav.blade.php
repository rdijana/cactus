<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="{{route("pocetna")}}"><img src="{{asset('assets/images/logo.png')}}" alt="Cactus"/></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="meni">
               @foreach($menu as $link)
                    <li class="nav-item">
                        <a class="nav-link"  href="{{route($link->route)}}">{{$link->name}}</a>
                    </li>
                @endforeach
                   @if(session()->has('user'))
{{--                       @if(!session()->get('user')->isAdmin)--}}
{{--                           {{dd(session()->get('user'))}}--}}
                           <li class="nav-item"><a class="nav-link" href="{{ route("logout") }}">Odjava</a></li>
{{--                       @endif--}}
                   @else
                       <li class="nav-item"><a class="nav-link" href="{{ route("loginSee") }}">Logovanje</a></li>
                   @endif
{{--                <li>{{$menu}}</li>--}}
            </ul>
        </div>
    </div>
</nav>
