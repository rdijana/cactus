<div>
    <h4>Komentari</h4>
@foreach($comments as $c)
{{--{{dd($comments)}}--}}
    <div id="com{{$c->id}}">
            <b>{{$c->first_name." ".$c->last_name}}</b><br/>
        <small>{{date('d-m-y @ h:i:s A',strtotime($c->created_at))}}</small>
        <p><span id="{{$c->id}}">{{ $c->content }}</span></p>

    <div id="obavestenje"></div>
        @if(session('user') )
            <div>
                    @if(session()->get('user')->id == $c->user_id && session()->get('user')->active == 1)
                        <button class="btn btn-outline-secondary delete" data-id="{{$c->id}}" >Delete</button>
                        <button class="btn btn-outline-secondary edit" data-id="{{$c->id}}" >Edit</button>
                    @endif
            </div>
                @endif

    </div>
        @endforeach
</div>
