<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8"/>
    <meta name="robots" content="index, follow"/>
    <meta name="keywords" content="@yield("keywords")"/>
    <meta name="description" content="@yield("description")"/>
    <meta name="author" content="Dijana Radovanović"/>

    @yield("meta")
    <link rel="shortcut icon" href="{{asset('assets/images/logo.ico')}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"/>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/lightbox.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/styles.css')}}">

    <title>@yield("title")</title>
</head>
