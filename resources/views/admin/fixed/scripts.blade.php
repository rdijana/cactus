<script type="text/javascript">
    const baseUrl = "{{url('/')}}";
    const token = '{{ csrf_token() }}';
    const publicFolder = "{{asset('/')}}";
    const path="{{\Request::path()}}";
</script>

<script src="{{asset('assets/js/jquery-3.5.1.min.js')}}"></script>
<script src="{{asset('assets/js/bootstrap.min.js')}}"></script>
<script src="{{asset('assets/js/script.js')}}"></script>


