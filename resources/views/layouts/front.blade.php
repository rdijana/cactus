<!DOCTYPE html>
<html>
<head>
    @include("front.fixed.head")
</head>
<body>
    @include("front.fixed.nav")
    @yield("content")
    @include("front.fixed.footer")
    @include("front.fixed.scripts")
</body>
</html>
