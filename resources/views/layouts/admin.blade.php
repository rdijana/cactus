<!DOCTYPE html>
<html>
@include("admin.fixed.head")
<body>

<div class="wrapper d-flex align-items-stretch">
    @include("admin.fixed.nav")
    <!-- Page Content  -->
    <div id="content" class="p-4 p-md-5">
        <div class="row  align-items-center">
            @yield("content")
        </div>
    </div>
</div>
@include("admin.fixed.scripts")
</body>
</html>
