<div id="edit-form">
<div class="card my-4" id="insert-form">
    <h5 class="card-header">Ostavite komentar:</h5>
    <div class="card-body">
        <form action="{{ route("commentIn", ['postId' => $post->id]) }}" method="POST">
           @csrf
            <div class="form-group">
                <textarea name="content" id="content" class="form-control" rows="4" placeholder="Poruka" ></textarea>
            </div>
            <input type="submit" class="btn btn-outline-secondary" value="Pošalji"/>
        </form>
    </div>
</div>
    @if(session('success'))
        <div><p>
            {{ session('success') }}
            </p>
        </div>
    @endif
    @if(session('еrror'))
        <div>
            <p>
            {{ session('error') }}
            </p>
        </div>
    @endif
    @if ($errors->any())
        <div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
</div>
