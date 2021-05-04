<nav id="sidebar">
    <div class="p-4 pt-3 mt-5">
        <a href="{{route("admin")}}" class="img logo rounded-circle px-3 mb-2"><img src="{{asset('assets/images/logo.png')}}" alt="Logo"/></a>
        <ul class="list-unstyled components pb-5">
            @foreach($menu as $link)
                <li class="nav-item">
                    <a class="nav-link"  href="{{route($link->route)}}">{{$link->name}}</a>
                </li>
            @endforeach
        </ul>

        @include("admin.fixed.footer")

    </div>
</nav>
