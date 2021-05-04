window.onload=function () {
    // console.log(path);
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': token
        }
    });
////////////////////////////////////POCETNA//////////////////////////////////
    if (path == "/") {
        console.log("pocetna");

        function getLatest() {
            // console.log("usao");
            $.ajax({
                url: baseUrl + `/latest`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    printAllPosts(data, true);
                    // console.log(data);
                },
                error: function (data) {
                    // console.log(data);
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                processData: true
            })
        }

        getLatest();
    }
    if (path == "blog") {
        console.log("blog");
        function getAll(sortValue,categories,search,id) {
            // console.log("usao u getAll");
            // console.log(sortValue);
            // console.log(categories);
            // console.log(search);
            // console.log(id);
            $.ajax({
                url: baseUrl + `/posts/fetch`,
                method: "GET",
                data: {
                     'sortValue':sortValue,
                    'categories':categories,
                    'search':search,
                    'page':id
                },
                dataType: "json",
                success: function (data) {
                    // console.log(data.data);
                    printAllPosts(data.data, false);
                    printPagination(data);
                    // console.log(data);
                },
                error: function (data) {
                    // console.log(data);
                }
            })
        }
        getAll();
        function printPagination(data){
            let x="";
            for(let p=1;p<=data.last_page;p++){

                x+=`<a href="#" class="linkovi btn btn-outline-secondary `
                if(p==data.current_page){
                    x+=` active`
                }
                x+=`" data-id="${p}">${p}</a>`
            }
            $("#paginacija").html(x);
        }
        $(document).on("click",".linkovi",sortAndFilterAndSearch);
        $(document).on("click",".linkovi",function (e){
            e.preventDefault();
        });

            $(".categories").click(sortAndFilterAndSearch);
            $(".btnDate").click(sortAndFilterAndSearch);
            $("#btnSearch").click(sortAndFilterAndSearch);
        function sortAndFilterAndSearch(){
            // console.log("pozvana");
            var search = $("input[name=search]").val()
            var sortValue = $("input[name=btnDate]:checked").val();
            var categories = [];
            $.each($("input[name='categories']:checked"), function () {
                categories.push($(this).val());
            });
            var id=$(this).attr("data-id");
            getAll(sortValue, categories, search,id);
        }
    }
    function printAllPosts(data, isLatest = false) {
        let postBlock = "";
        if (data == false) {
            // console.log("usao u if");
            postBlock += `<div class="col-md-9 col-sm-6 col-xs-12 m-3 p-2"><h3>Žao nam je,ne postoje postovi za tražene kriterijume.</h3></div>`;
        }
        for (let post of data) {

            postBlock += `<div class="col-md-3 col-sm-6 col-xs-12 okvir m-3 p-2">
            <a href="${publicFolder}assets/images/${post.image}" data-lightbox="ourgallery">

                <img src="${publicFolder}assets/images/${post.image}" class="img-fluid" alt="${post.title}"/>
            </a>
            <p class="text-center pt-2">${post.title}</p>
            <p class="text-center">Datum: `;
            postBlock += datum(post.created_at);
            postBlock += `  /
                Kategorija: ${post.category.name}
            </p>
            <p class="text-center">
                ${post.description}
            </p>
            <div class="col-12 d-flex justify-content-center">
            <a href="${baseUrl}/posts/${post.id}"  class="btn btn-outline-secondary">Vidi post</a>
            </div>
        </div>`;


        }
        isLatest ? $("#najnoviji").html(postBlock) : $("#postovi").html(postBlock);

    }
    function datum(datumUnet) {
        let datum = new Date(datumUnet);
        console.log(datumUnet);
        let dat=datum.getDate();
        return datum.getMonth()+1+"-"+dat+ "-" + datum.getFullYear();
    }
    if (path.indexOf('posts/') != -1) {
        function editComment(id) {
            console.log("usao");
            $.ajax({
                url: baseUrl + `/comments/${id}/show`,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    show(data);
                },
                error: function (data) {
// console.log(data);
                }
            })
        }

///////////////prikaz komentara u formi za edit/////////////
        function show(data) {
            //sakrivamo formu za insert
            $("#insert-form").hide();
            var url = window.location.href;
            console.log(url);
            let form = `<div class="card my-4" id="edit-form">
    <h5 class="card-header">Izmenite komentar:</h5>
    <div class="card-body">
            <div class="form-group">
                <textarea name="content" id="content" class="form-control" rows="4" placeholder="Poruka" >${data.content}</textarea>
                <p id="opis"></p>
            </div>
        <button class="btn btn-outline-secondary" data-id="${data.id}" id="editCom">Ažuriraj</button>
         <a href="${url}" class='btn btn-outline-secondary'>Otkaži</a>
    </div>
    <div id="poruka"></div>
</div>`;
            $("#edit-form").html(form);
        }

///////////////update komentara
        function updateComment(id) {
            // console.log("USaoo");
            let content = $("#content").val();
            var regCom=/^[\w\d\.\s\?]{5,60}$/;
            var greske=[];
            if (!regCom.test(content)) {
                $('#content').next().html("Komentar nije u dobrom formatu minimalan broj karaktera je 5,maksimalan 60.Može da sadrži slova,cifre,tačku,?.");
                $('#content').next().addClass("red");
                greske.push("Komentar nije u dobrom formatu.");
            } else {
                $('#content').next().html("");
                $('#content').next().removeClass("red");
            }
            if(greske.length){}else {
                $.ajax({
                    url: baseUrl + `/comments/${id}/edit`,
                    method: "POST",
                    data: {
                        content,
                        "_method": "POST",
                        "_token": token
                    },
                    dataType: "json",
                    success: function (data) {
                        resetFnc(id, content);
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }
        }
        function resetFnc(id,content){
            $(`#` + id).html(content);
            $("#poruka").html("<p>Komentar je ažuriran!</p>");
        }

        function deleteComment(id) {
            $.ajax({
                url: baseUrl + `/comments/${id}/destroy`,
                data: {
                    "_method": "DELETE",
                    '_token':token
                },
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    $(`#com` + id).html("<p>Komentar je izbrisan!</p>");
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }

        $(document).on("click", '.edit', function (e) {
            e.preventDefault();
            let id = $(this).attr("data-id");
            // console.log(id);
            editComment(id);
        })
        $(document).on("click", "#editCom", function (e) {
            e.preventDefault();
            let id = $(this).attr("data-id");
            // console.log(id);
            updateComment(id);
        })
        $(document).on("click", ".delete", function (e) {
            e.preventDefault();
            let id = $(this).attr("data-id");
            // console.log(id);
            deleteComment(id);
        })
    }

////////////////////////////REGISTRACIJA//////////////////////////////////////////
    if (window.location.href == baseUrl + "/register") {
        console.log("registracija");

        function registracija() {
            let first_name = $('#first_name').val();
            let last_name = $('#last_name').val();
            let email = $('#email').val();
            let username = $('#username').val();
            let password = $('#password').val();

            //REGULARNI
            var regIme = /^[A-ZŠĐĆŽČ][a-zšđčćž]{2,19}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,19})*$/;
            var regPrezime = /^[A-ZŠĐČĆŽ][a-zšđčćž]{2,29}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,29})*$/;
            var regKorisnickoIme = /^[\w\d\.\-\_\&]{5,60}$/;
            var regLozinka = /^[\d\w\.\_\-\*\/]{6,40}$/;
            var regEmail = /^[a-z][a-z\d\.\-\_]+\@[a-z\d]+(\.[a-z]{2,4})+$/;
            var greske = [];
            if (!regIme.test(first_name)) {
                $('#first_name').next().html("Ime nije u dobrom formatu.Mora da počne velikim slovom i minimalan broj karaktera je 3 maksimalan 20 po imenu.");
                $('#first_name').next().addClass("red");
                greske.push("Ime nije u dobrom formatu.");
            } else {
                $('#first_name').next().html("");
                $('#first_name').next().removeClass("red");
            }
            if (!regPrezime.test(last_name)) {
                $('#last_name').next().html("Prezime nije u dobrom formatu.Mora da počne velikim slovom i minimalan broj karaktera je 3 maksimalan 30 po prezimenu.");
                $('#last_name').next().addClass("red");
                greske.push("Prezime nije u dobrom formatu");
            } else {
                $('#last_name').next().html("");
                $('#last_name').next().removeClass("red");
            }
            if (!regKorisnickoIme.test(username)) {
                $('#username').next().html("Korisničko ime nije u dobrom formatu.Minimalan broj karaktera je 5.");
                $('#username').next().addClass("red");
                greske.push("Korisničko ime nije u dobrom formatu.");
            } else {
                $('#username').next().html("");
                $('#username').next().removeClass("red");
            }
            if (!regEmail.test(email)) {
                $("#email").next().html("Email nije u dobrom formatu.Primer dijana.radovanovic.10.18@ict.edu.rs");
                $("#email").next().addClass("red");
                greske.push("Email nije u dobrom formatu");
            } else {
                $("#email").next().html("");
                $("#email").next().removeClass("red");
            }
            if (!regLozinka.test(password)) {
                $("#password").next().html("Lozinka nije u dobrom formatu.Minimalan broj karaktera je 6.");
                $("#password").next().addClass("red");
                greske.push("Lozinka nije u dobrom formatu.");
            } else {
                $("#password").next().html("");
                $("#password").next().removeClass("red");
            }

            if (greske.length) {
            } else {

                $.ajax({
                    url: baseUrl + `/registerUser`,
                    method: "POST",
                    data: {
                        first_name,
                        last_name,
                        username,
                        email,
                        password,
                        _token: token
                    },
                    dataType: "json",
                    success: function (data) {
                        // console.log(data.success);
                        $("#success").html(data.success);
                        window.location.href = baseUrl + "/login";
                    },
                    error: function (data) {
                        $("#error").html(data.responseJSON.error);
                        // console.log(data.responseJSON.errors);
                        printErrors(data.responseJSON.errors);
                    }
                })
            }
        }
        function printErrors(errors) {
            let content = '<ul>';
            for(let error of Object.keys(errors)) {
                content += '<li>'+ errors[error][0] +'</li>';
            }
            content += '</ul>';
            $("#error").html(content);
        }

        $(document).on('click', '#btnRegistracija', function (e) {
            e.preventDefault();
            registracija();
        })
    }
///////////////////////LOGOVANJE//////////////////////////////////////////
    if (window.location.href == baseUrl + "/login") {
        console.log("login");

        function login() {
// console.log("isap");
            let email = $('#tbEmail').val();
            let password = $('#tbPassword').val();

            //REGULARNI
            var regLozinka = /^[\d\w\.\_\-\*\/]{6,40}$/;
            var regEmail = /^[a-z][a-z\d\.\-\_]+\@[a-z\d]+(\.[a-z]{2,4})+$/;
            var greske = [];

            if (!regEmail.test(email)) {
                $("#tbEmail").next().html("Email nije u dobrom formatu.Primer dijana.radovanovic.10.18@ict.edu.rs");
                $("#tbEmail").next().addClass("red");
                greske.push("Email nije u dobrom formatu");
            } else {
                $("#tbEmail").next().html("");
                $("#tbEmail").next().removeClass("red");
            }
            if (!regLozinka.test(password)) {
                $("#tbPassword").next().html("Lozinka nije u dobrom formatu.Minimalan broj karaktera je 6.");
                $("#tbPassword").next().addClass("red");
                greske.push("Lozinka nije u dobrom formatu.");
            } else {
                $("#tbPassword").next().html("");
                $("#tbPassword").next().removeClass("red");
            }

            if (greske.length) {
            } else {

                $.ajax({
                    url: baseUrl + `/loginUser`,
                    method: "POST",
                    data: {
                        email: email,
                        password: password,
                        _token: token
                    },
                    dataType: "json",
                    success: function (data) {
                        let isAdmin = data.isAdmin;
                        // console.log(isAdmin);
                        if (isAdmin) {
                            window.location.href = baseUrl + "/admin";
                        } else {
                            window.location.href = baseUrl + "/blog";
                        }
                    },
                    error: function (data) {
                        // console.log(data.responseJSON.error);
                        $("#errorLog").html(data.responseJSON.error);
                    }
                })
            }
        }

        $(document).on('click', '#btnLogin', function (e) {
            e.preventDefault();
            login();
        })
    }
//////////////////////////////////////KONTAKT/////////////////////////////
    if (window.location.href == baseUrl + '/contact') {
        console.log("kontak");

        function contact() {
// console.log("usaoo");
            let email = $('#email').val();
            let purpose = $('#purpose').val();
            let message = $('#message').val();

            //REGULARNI

            var regEmail = /^[a-z][a-z\d\.\-\_]+\@[a-z\d]+(\.[a-z]{2,4})+$/;
            var regPurpose = /^[\d\wžšđčćŽĐŠČĆ\-\.]{5,50}(\s[\d\wžšđčćŽĐŠČĆ\-\.]{1,50})*$/;
            var greske = [];

            if (!regEmail.test(email)) {
                $("#email").next().html("Email nije u dobrom formatu.Primer dijana.radovanovic.10.18@ict.edu.rs");
                $("#email").next().addClass("red");
                greske.push("Email nije u dobrom formatu");
            } else {
                $("#email").next().html("");
                $("#email").next().removeClass("red");
            }
            if (!regPurpose.test(purpose)) {
                $("#purpose").next().html("Svrha poruke nije u dobrom formatu.Može imati minimalno 5 karaktera.Može sadržati cifre,slova,tačku,i crtu.");
                $("#purpose").next().addClass("red");
                greske.push("Svrha nije u dobrom formatu.");
            } else {
                $("#purpose").next().html("");
                $("#purpose").next().removeClass("red");
            }
            if (message == "") {
                greske.push("Poruka je obavezan podatak");
                $("#message").next().html("Poruka je obavezan podatak.");
                $("#message").next().addClass("red");
            } else {
                $("#message").next().html("");
                $("#message").next().removeClass("red");
            }

            if (greske.length) {
            } else {

                $.ajax({
                    url: baseUrl + `/contactIn`,
                    method: "POST",
                    data: {
                        email,
                        purpose,
                        message,
                        _token: token
                    },
                    dataType: "json",
                    success: function (data) {
                        $("#poruka").html(data.success);
                        $('#email').val("");
                        $('#purpose').val("");
                        $('#message').val("");
                    },
                    error: function (data) {
                        // console.log(data.responseJSON.error);
                        printErrors(data.responseJSON.errors);
                        $("#poruka").html(data.responseJSON.error);

                    }
                })
            }
        }
        function printErrors(errors) {
            let content = '<ul>';
            for(let error of Object.keys(errors)) {
                content += '<li>'+ errors[error][0] +'</li>';
            }
            content += '</ul>';
            $("#poruka").html(content);
        }

        $(document).on('click', '#btnPosalji', function (e) {
            e.preventDefault();
            contact();
        })
    }
    // console.log(path);

    if (path == "admin/posts") {
        console.log("admin");
        var form_data = new FormData();
        var allCategories = [];
        var currentId = "";

        ///////podaci za insert
        function setDataForInsert() {
            form_data.set("title", $("#title").val());
            form_data.set("description", $("#description").val());
            form_data.set("content", $("#contentI").val());
            form_data.set("category", $("#ddlCategories").val());
            form_data.set("picture", $("#picture").prop('files')[0] ? $("#picture").prop('files')[0] : null);
            form_data.set("_token", token);
        }

        function setDataForUpdate() {
            form_data.set("title", $("#titleE").val());
            form_data.set("description", $("#descriptionE").val());
            form_data.set("content", $("#contentE").val());
            form_data.set("category", $("#ddlCategoriesEdit").val());
            if ($('#pictureE').prop('files')[0])
                form_data.set('picture', $('#pictureE').prop('files')[0])
            else
                form_data.delete('picture');
            form_data.set("_token", token);
        }

        ////postovi
        function getPosts(id) {
            $.ajax({
                url: baseUrl + `/admin/posts/getAll`,
                method: "GET",
                data: {
                    "page":id
                },
                dataType: "json",
                success: function (data) {
                    printForAdmin(data.data);
                    printPaginationAdmin(data);
                    // console.log(data);
                },
                error: function (data) {
                    // console.log(data);
                }
            })
        }

        function printPaginationAdmin(data){
            let x="";
            for(let p=1;p<=data.last_page;p++){

                x+=`<a href="#" class="strana btn btn-outline-secondary `
                if(p==data.current_page){
                    x+=` active`
                }
                x+=`" data-id="${p}">${p}</a>`
            }
            $("#paginacijaAdmin").html(x);
        }
        getPosts();
        $(document).on("click",".strana",function (e){
            e.preventDefault();
            var id=$(this).attr("data-id");
            getPosts(id);
        })


        function printForAdmin(data) {
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Naslov</th>
      <th scope="col">Opis</th>
      <th scope="col">Slika</th>
      <th scope="col">Kategorija</th>
      <th scope="col">Ažuriraj</th>
      <th scope="col">Izbriši</th>
    </tr>
  </thead>
  <tbody>`;
            for (post of data) {
                x += `
 <tr>
       <td>${post.title}</td>
      <td>${post.description}</td>
      <td><img src="${publicFolder}assets/images/${post.image}" class="img-fluid" width="100px" height="100px" alt="${post.title}"/></td>
      <td>${post.category.name}</td>
       <td><img src="${publicFolder}assets/images/edit-icon.gif" class="edit" data-toggle="modal" data-target="#exampleModal" data-id="${post.id}"/> </td>
       <td><img src="${publicFolder}assets/images/hr.gif" class="delete" data-id="${post.id}"/> </td>
    </tr>
                `;
            }
            x += `</tbody>
</table>
<div id="paginacijaAdmin" class="d-flex justify-content-center"></div>`;
            $("#tabela").html(x);
        }

        ///////////////insert
        function insertPost() {
            let title = $("#title").val();
            // console.log(title);
            let description = $("#description").val();
            let content = $("#contentI").val();
            let category = $("#ddlCategories").val();
            // console.log(category);
            let regTitle = /^[\wŠĐČĆŽšđčćž\d\/\-\s]{5,50}$/;
            var greske = [];
            if (!regTitle.test(title)) {
                $('#title').next().html("Naslov nije u dobrom formatu.Minimalan broj karaktera je 5,maksimalan 50.");
                $('#title').next().addClass("red");
                greske.push("Naslov nije u dobrom formatu.");
            } else {
                $('#title').next().html("");
                $('#title').next().removeClass("red");
            }
            description = description.split(" ");
            if (description.length < 5) {
                $('#description').next().html("Opis nije u dobrom formatu.Mora sadržati minimalno 5 reči.");
                $('#description').next().addClass("red");
                greske.push("Opis nije u dobrom formatu.");
            } else {
                $('#description').next().html("");
                $('#description').next().removeClass("red");
            }
            content = content.split(" ");
            if (content.length < 10) {
                $('#contentI').next().html("Sadržaj nije u dobrom formatu.Mora sadržati minimalno 10 reči.");
                $('#contentI').next().addClass("red");
                greske.push("Sadržaj nije u dobrom formatu.");
            } else {
                $('#contentI').next().html("");
                $('#contentI').next().removeClass("red");
            }
            if (category == 0) {
                $('.categories').next().html("Izaberite kategoriju.");
                $('.categories').next().addClass("red");
                greske.push("Izaberite kategoriju.");
            } else {
                $('.categories').next().html("");
                $('.categories').next().removeClass("red");
            }
            if (!$("#picture").prop('files')[0]) {
                $('#picture').next().html("Unesite sliku.");
                $('#picture').next().addClass("red");
                greske.push("Unesite sliku.");
            } else {
                $('#picture').next().html("");
                $('#picture').next().removeClass("red");
            }

            if (greske.length) {

            } else {
                setDataForInsert();
                $.ajax({
                    url: baseUrl + '/admin/posts',
                    method: 'POST',
                    data: form_data,
                    success: function (data) {
                        $("#modalContentInsert").modal('hide');
                        getPosts();
                    },
                    error: function (data) {
                        // console.log(data);
                        printErrors(data.responseJSON.errors,false);
                        $("#error").html(data.responseJSON.error);
                    },
                    dataType: 'json',
                    contentType: false,
                    processData: false
                })
            }
        }
        function printErrors(errors,isEdit=false) {
            let content = '<ul>';
            for(let error of Object.keys(errors)) {
                content += '<li>'+ errors[error][0] +'</li>';
            }
            content += '</ul>';
            isEdit ? $("#errorE").html(content) : $("#error").html(content);
        }
        ////kategorije
        function getCategories() {
            $.ajax({
                url: baseUrl + '/admin/posts/create',
                method: 'GET',
                data: {},
                success: function (data) {
                    allCategories = data;
                    // console.log(allCategories);
                    printCategories();
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }

        function printCategories(categoryIdForEdit = null) {
            let ddl = categoryIdForEdit == null ? "ddlCategories" : "ddlCategoriesEdit";
            let x = `<label>Kategorije</label>
<select id="${ddl}" class="form-control"> <option value="0">Izaberite</option>`;
            for (let c of allCategories) {
                x += `<option ${c.id == categoryIdForEdit ? 'selected' : ''} value=${c.id}>${c.name}</option>`;
            }
            x += "</select>";
            categoryIdForEdit == null ? $(".categories").html(x) : $(".categoriesEdit").html(x);
        }

        getCategories();

        ////////modal forma za insert
        function modalForInsert() {
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentInsert">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Dodaj post</span> </h5>
                    </button>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data">
                         <div class="control-group">
                        <label class='control-label' for='title'>Naslov</label>
                        <div class="form-group">
                            <input type="text" name="title" id="title" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                         <div class="control-group">
                        <label class='control-label' for='description'>Opis</label>
                        <div class="form-group">
                             <textarea name="description" id="description" class="form-control"></textarea><p class="opis"></p>
                        </div>
                        </div>
                    <div class="control-group">
                        <label class='control-label' for='contentI'>Sadržaj</label>
                        <div class="form-group">
                              <textarea name="contentI" id="contentI" class="form-control"></textarea><p class="opis"></p>
                        </div>
                        </div>
                   <div class="categories"></div>
                   <p class="opis"></p><br/>
                    <label>Slika:</label>
                                <input type="file" id="picture" name="picture" class="form-control" /><p class="opis"></p><br/>
                                <button id="btnInsert" class="btn btn-primary">Unos</button>
                                <button id="btnCancel" class="btn btn-primary">Otkaži</button>

                   </form>
                     <div id="error"></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#insertModal").html(form);
            $("#modalContentInsert").modal('show');
            printCategories();
        }

        ///////dohvatanje jednog posta
        function editPost(id) {
            // console.log(id);
            $.ajax({
                url: baseUrl + `/admin/posts/${id}`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    printFormForUpdatePost(data);
                },
                error: function (data) {
                    console.log(data);
                }
            })

        }

        function updatePost(id) {
            let title = $("#titleE").val();
            // console.log(title);
            let description = $("#descriptionE").val();
            let content = $("#contentE").val();
            let category = $("#ddlCategoriesEdit").val();
            // console.log(category);
            let regTitle = /^[\wŠĐČĆŽšđčćž\d\/\-\s]{5,50}$/;
            var greske = [];
            if (!regTitle.test(title)) {
                $('#titleE').next().html("Naslov nije u dobrom formatu.Minimalan broj karaktera je 5,maksimalan 50.");
                $('#titleE').next().addClass("red");
                greske.push("Naslov nije u dobrom formatu.");
            } else {
                $('#titleE').next().html("");
                $('#titleE').next().removeClass("red");
            }
            description = description.split(" ");
            if (description.length < 5) {
                $('#descriptionE').next().html("Opis nije u dobrom formatu.Mora sadržati minimalno 5 reči.");
                $('#descriptionE').next().addClass("red");
                greske.push("Opis nije u dobrom formatu.");
            } else {
                $('#descriptionE').next().html("");
                $('#descriptionE').next().removeClass("red");
            }
            content = content.split(" ");
            if (content.length < 10) {
                $('#contentE').next().html("Sadržaj nije u dobrom formatu.Mora sadržati minimalno 10 reči.");
                $('#contentE').next().addClass("red");
                greske.push("Sadržaj nije u dobrom formatu.");
            } else {
                $('#contentE').next().html("");
                $('#contentE').next().removeClass("red");
            }
            if (category == 0) {
                $('.categoriesEdit').next().html("Izaberite kategoriju.");
                $('.categoriesEdit').next().addClass("red");
                greske.push("Izaberite kategoriju.");
            } else {
                $('.categoriesEdit').next().html("");
                $('.categoriesEdit').next().removeClass("red");
            }
            if (greske.length) {

            } else {
                setDataForUpdate();
                form_data.set("_method", 'PUT');
                $.ajax({
                    url: baseUrl + `/admin/posts/${id}/update`,
                    method: 'POST',
                    data: form_data,
                    success: function (data) {
                        getPosts();
                        form_data.delete("_method");
                        $("#modalContentUpdate").modal('hide');
                    },
                    error: function (data) {
                        form_data.delete("_method");
                        printErrors(data.responseJSON.errors,true);
                        $("#error").html(data.responseJSON.error);
                    },
                    dataType: 'json',
                    contentType: false,
                    processData: false
                });

            }
        }

        function printFormForUpdatePost(data) {
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentUpdate">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Ažuriraj post</span> </h5>
                    </button>
                </div>

                <div class="modal-body">
                    <form enctype="multipart/form-data">
                     <div class="control-group">
                        <label class='control-label' for='titleE'>Naslov</label>
                        <div class="form-group">
                            <input type="text" name="titleE" id="titleE" class="form-control" value="${data.title}"/><p class="opis"></p>
                        </div>
                        </div>
                        <div class="control-group">
                        <label class='control-label' for='descriptionE'>Naslov</label>
                        <div class="form-group">
                            <textarea name="descriptionE" id="descriptionE" class="form-control">${data.description}</textarea><p class="opis"></p>
                        </div>
                        </div>
                        <div class="control-group">
                        <label class='control-label' for='contentE'>Naslov</label>
                        <div class="form-group">
                             <textarea name="contentE" id="contentE" class="form-control"">${data.content}</textarea><p class="opis"></p>
                        </div>
                        </div>
                    <div class="categoriesEdit"></div><p class="opis"></p>
                    <img src="${publicFolder}assets/images/${post.image}" class="img-fluid" alt="${post.title}"/>
                     <label>Slika:</label>
                                <input type="file" id="pictureE" name="pictureE" class="form-control" /><p class="opis"></p><br/>
                                 <button id="btnUpdate" class="btn btn-primary">Ažuriraj</button>
                                <button id="btnCancelUpdate" class="btn btn-primary">Otkaži</button>
                   </form>
                   <div id="errorE"></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#editModal").html(form);
            $("#modalContentUpdate").modal('show');
            printCategories(data.category.id);
        }

        function deletePost(id) {
            $.ajax({
                url: baseUrl + `/admin/posts/${id}`,
                method: 'DELETE',
                data: {
                    id: id,
                    _token: token
                },
                success: function (data) {
                    getPosts();
                },
                error: function (data) {
                    // console.log(data);
                    alert(data.responseJSON.error);
                }
            });
        }

        //edit modal dogadjaj
        $(document).on("click", '.edit', function () {
            console.log("kliknuo");
            // e.preventDefault();
            let id = $(this).attr("data-id");
            // console.log(id);
            currentId = id;
            editPost(id);
        })
        ////////////////////insert modal dogadjaj
        $(document).on("click", '#btnInsertPost', function (e) {
            console.log("kliknuo");
            e.preventDefault();
            modalForInsert();
        })
        /////////////////////insert posta dogadjaj
        $(document).on("click", '#btnInsert', function (e) {
            console.log("kliknuoInsert");
            e.preventDefault();
            insertPost();
        })
        $(document).on("click", '#btnCancel', function (e) {
            console.log("kliknuoCancel");
            e.preventDefault();
            $("#modalContentInsert").modal('hide');
        })
        $(document).on("click", '#btnUpdate', function (e) {
            e.preventDefault();
            updatePost(currentId);
        })
        $(document).on("click", '#btnCancelUpdate', function (e) {
            e.preventDefault();
            $("#modalContentUpdate").modal('hide');
        })
        $(document).on("click", '.delete', function (e) {
            e.preventDefault();
            let id = $(this).attr("data-id");
            deletePost(id);
        })
    }
    if(path=="admin/categories"){
        console.log("categories");
        var currentCategoryId="";
        function insertCategory(){
        let name=$("#name").val();
        // console.log(name);
        let reg=/^[\wŠĐČĆŽšđčćž\d\/\-\s]{5,50}$/;
            var greske = [];
            if (!reg.test(name)) {
                $('#name').next().html("Ime kategorije nije u dobrom formatu.Minimalan broj karaktera je 5,maksimalan 50.");
                $('#name').next().addClass("red");
                greske.push("Ime kategorije nije u dobrom formatu.");
            } else {
                $('#name').next().html("");
                $('#name').next().removeClass("red");
            }
            if (greske.length) {
            } else {
                $.ajax({
                    url:baseUrl+'/admin/categories',
                    method:'POST',
                    data:{
                        name:name,
                        _token:token
                    },
                    success:function(data){
                        getCategories();
                        $("#modalContentInsertC").modal('hide');
                    },
                    error:function (data){
                        printErrors(data.responseJSON.errors,false)
                        $("#error").html(data.responseJSON.error);
                    }

                })

            }
        }
        function printErrors(errors,isEdit=false) {
            let content = '<ul>';
            for(let error of Object.keys(errors)) {
                content += '<li>'+ errors[error][0] +'</li>';
            }
            content += '</ul>';
            isEdit ? $("#errorE").html(content) : $("#error").html(content);
        }
        function editCategory(id){
            $.ajax({
                url: baseUrl + `/admin/categories/${id}`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    formForUpdateCategory(data);
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }
        function updateCategory(id){
            let nameE=$("#nameE").val();
            // console.log(name);
            let reg=/^[\wŠĐČĆŽšđčćž\d\/\-\s]{5,50}$/;
            var greske = [];
            if (!reg.test(nameE)) {
                $('#nameE').next().html("Ime kategorije nije u dobrom formatu.Minimalan broj karaktera je 5,maksimalan 50.");
                $('#nameE').next().addClass("red");
                greske.push("Ime kategorije nije u dobrom formatu.");
            } else {
                $('#nameE').next().html("");
                $('#nameE').next().removeClass("red");
            }
            if (greske.length) {
            } else {
                $.ajax({
                    url:baseUrl+`/admin/categories/${id}/update`,
                    method:'POST',
                    data:{
                        nameE:nameE,
                        "_method":"PUT",
                        "_token":token
                    },
                    success: function (data) {
                        getCategories();
                        $("#modalContentUpdateC").modal('hide');
                        delete("_method");
                    },
                    error: function (data) {
                        delete("_method");
                        printErrors(data.responseJSON.errors,true);
                        $("#errorE").html(data.responseJSON.error);
                    }

                })

            }
        }
        function deleteCategory(id){
            $.ajax({
                url: baseUrl + `/admin/categories/${id}`,
                method: 'DELETE',
                data: {
                    id: id,
                    _token: token
                },
                success: function (data) {
                    getCategories();
                },
                error: function (data) {
                    // console.log(data);
                    alert(data.responseJSON.error);
                }
            });
        }
        function formForUpdateCategory(data){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentUpdateC">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Ažuriraj kategoriju</span> </h5>
                    </button>
                </div>

                <div class="modal-body">
                    <form>
                    <div class="control-group">
                        <label class='control-label' for='nameE'>Naziv</label>
                        <div class="form-group">
                        <input type="text" name="nameE" id="nameE" class="form-control" value="${data.name}"/><p class="opis"></p>
                        </div>
                        </div>
                    <button id="btnUpdateC" class="btn btn-primary">Ažuriraj</button>
                     <button id="cancelUpd" class="btn btn-primary">Otkaži</button>
                   </form>
                   <div><p id="errorE"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#editCategory").html(form);
            $("#modalContentUpdateC").modal('show');
        }
        function getCategories(){
             $.ajax({
                 url:baseUrl+'/admin/categories/getAll',
                 method:'GET',
                 data: {},
                 dataType: "json",
                 success:function (data){
                     printAllCategories(data);
                     // console.log(data);
                 },
                 error:function (data){
                     console.log(data);
                 }
             })
        }
        getCategories();
        function printAllCategories(data){
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Naziv</th>
      <th scope="col">Ažuriraj</th>
      <th scope="col">Izbriši</th>
    </tr>
  </thead>
  <tbody>`;
            for (category of data) {
                x += `
 <tr>
       <td>${category.name}</td>
        <td><img src="${publicFolder}assets/images/edit-icon.gif" class="editCategory" data-toggle="modal" data-target="#exampleModal" data-id="${category.id}"/> </td>
       <td><img src="${publicFolder}assets/images/hr.gif" class="deleteCategory" data-id="${category.id}"/> </td>

    </tr>
                `;
            }
            x += `</tbody>
</table>`;
            $("#tabelaCat").html(x);
        }
        function modalForInsertCategory(){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentInsertC">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Dodaj kategoriju</span> </h5>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="control-group">
                        <label class='control-label' for='name'>Naziv</label>
                        <div class="form-group">
                        <input type="text" name="name" id="name" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                   <button id="btnInsertC" class="btn btn-primary">Unos</button>
                   <button id="btnCancelC" class="btn btn-primary">Otkaži</button>
                    </form>
                     <div><p id="error"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#insertCategory").html(form);
            $("#modalContentInsertC").modal('show');
        }
        $(document).on("click", '#btnInsertCategory', function (e) {
            console.log("kliknuo");
            e.preventDefault();
            modalForInsertCategory();
        })
        $(document).on("click", '#btnCancelC', function (e) {
            console.log("kliknuoCancel");
            e.preventDefault();
            $("#modalContentInsertC").modal('hide');
        })
        $(document).on("click", '#btnInsertC', function (e) {
            console.log("kliknuoInsert");
            e.preventDefault();
            insertCategory();
        })
        $(document).on("click", '.editCategory', function () {
            console.log("kliknuo");
            // e.preventDefault();
            let id = $(this).attr("data-id");
            // console.log(id);
            currentCategoryId = id;
            editCategory(id);
        })
        $(document).on("click", '#cancelUpd', function (e) {
            console.log("kliknuoCancel");
            e.preventDefault();
            $("#modalContentUpdateC").modal('hide');
        })
        $(document).on("click","#btnUpdateC",function (e){
            e.preventDefault();
            updateCategory(currentCategoryId);
        })
        $(document).on("click",".deleteCategory",function (e){
            e.preventDefault();
            let id=$(this).attr("data-id");
            deleteCategory(id);
        })
    }
    if(path=='admin/users'){
        console.log("users");
        var allRoles=[];
        var userId='';
        function getUsers(){
            $.ajax({
                url: baseUrl + `/admin/users/getUsers`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    printUsers(data);
                    // console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }
        getUsers();
        function editUser(id){
            $.ajax({
                url: baseUrl + `/admin/users/${id}`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    printFormForUpdateUser(data);
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }
        function updateUser(id){
            let first_name = $('#first_name').val();
            let last_name = $('#last_name').val();
            let email = $('#email').val();
            let username = $('#username').val();
            let active=$("#active").val();
            let role=$("#ddlRoles").val();
            let password=$("#password").val();

            //REGULARNI
            var regIme = /^[A-ZŠĐĆŽČ][a-zšđčćž]{2,19}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,19})*$/;
            var regPrezime = /^[A-ZŠĐČĆŽ][a-zšđčćž]{2,29}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,29})*$/;
            var regKorisnickoIme = /^[\w\d\.\-\_\&]{5,60}$/;
            var regLozinka = /^[\d\w\.\_\-\*\/]{6,40}$/;
            var regEmail = /^[a-z][a-z\d\.\-\_]+\@[a-z\d]+(\.[a-z]{2,4})+$/;
            var regActive=/^[0-1]{1}$/;
            var greske = [];
            if (!regIme.test(first_name)) {
                $('#first_name').next().html("Ime nije u dobrom formatu.Mora da počne velikim slovom i minimalan broj karaktera je 3 maksimalan 20 po imenu.");
                $('#first_name').next().addClass("red");
                greske.push("Ime nije u dobrom formatu.");
            } else {
                $('#first_name').next().html("");
                $('#first_name').next().removeClass("red");
            }
            if (!regPrezime.test(last_name)) {
                $('#last_name').next().html("Prezime nije u dobrom formatu.Mora da počne velikim slovom i minimalan broj karaktera je 3 maksimalan 30 po prezimenu.");
                $('#last_name').next().addClass("red");
                greske.push("Prezime nije u dobrom formatu");
            } else {
                $('#last_name').next().html("");
                $('#last_name').next().removeClass("red");
            }
            if (!regKorisnickoIme.test(username)) {
                $('#username').next().html("Korisničko ime nije u dobrom formatu.Minimalan broj karaktera je 5.");
                $('#username').next().addClass("red");
                greske.push("Korisničko ime nije u dobrom formatu.");
            } else {
                $('#username').next().html("");
                $('#username').next().removeClass("red");
            }
            if (!regEmail.test(email)) {
                $("#email").next().html("Email nije u dobrom formatu.Primer dijana.radovanovic.10.18@ict.edu.rs");
                $("#email").next().addClass("red");
                greske.push("Email nije u dobrom formatu");
            } else {
                $("#email").next().html("");
                $("#email").next().removeClass("red");
            }
            if (!regActive.test(active)) {
                $("#active").next().html("Polje može imati samo jednu cifru 0 ili 1.");
                $("#active").next().addClass("red");
                greske.push("Active nije u dobrom formatu");
            } else {
                $("#active").next().html("");
                $("#active").next().removeClass("red");
            }
            if (!regLozinka.test(password)) {
                $("#password").next().html("Lozinka nije u dobrom formatu.Minimalan broj karaktera je 6.");
                $("#password").next().addClass("red");
                greske.push("Lozinka nije u dobrom formatu.");
            } else {
                $("#password").next().html("");
                $("#password").next().removeClass("red");
            }
            if (role=="0") {
                $("#roles").next().html("Uloga mora biti izabrana.");
                $("#roles").next().addClass("red");
                greske.push("Uloga mora biti izabrana.");
            } else {
                $("#roles").next().html("");
                $("#roles").next().removeClass("red");
            }
            // console.log(role);
            if (greske.length) {

            } else {
                $.ajax({
                    url: baseUrl + `/admin/users/${id}/update`,
                    method: 'POST',
                    data: {
                        first_name:first_name,
                        last_name:last_name,
                        username:username,
                        email:email,
                        active:active,
                        role:role,
                        password:password,
                        _token:token,
                        _method:"PUT"
                    },
                    success: function (data) {
                             getUsers();
                        $("#modalContentUser").modal('hide');
                        delete("_method");
                    },
                    error: function (data) {
                        delete("_method");
                        printErrors(data.responseJSON.errors);
                        $("#error").html(data.responseJSON.error);
                    }
                });

            }
        }
        function printErrors(errors) {
            let content = '<ul>';
            for(let error of Object.keys(errors)) {
                content += '<li>'+ errors[error][0] +'</li>';
            }
            content += '</ul>';
            $("#error").html(content);
        }
        function printFormForUpdateUser(data){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentUser">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Ažuriraj korisnika</span> </h5>
                    </button>
                </div>

                <div class="modal-body">
                    <form>
                        <div class="control-group">
                        <label class='control-label' for='first_name'>Ime</label>
                        <div class="form-group">
                            <input type="text"class="form-control" id="first_name" name="first_name" value="${data.first_name}"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class='control-label' for='last_name'>Prezime</label>
                        <div class="form-group">
                            <input type="text"class="form-control" id="last_name" name="last_name" value="${data.last_name}"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class='control-label' for='username'>Korisničko ime</label>
                        <div class="form-group">
                            <input type="text"class="form-control" id="username" name="username" value="${data.username}">
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class='control-label' for='email'>Email</label>
                        <div class="form-group">
                            <input type="text"class="form-control" id="email" name="email" value="${data.email}"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                     <div class="control-group">
                        <label class='control-label' for='password'>Lozinka</label>
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" name="password" value="${data.password}"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class='control-label' for='active'>Aktivan</label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="active" name="active" value="${data.active}"/>
                            <p class='uputstvo'></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="form-group" id="roles">


                        </div>
                        <p class='uputstvo'></p>
                    </div>

                                 <button id="btnUpdateUser" class="btn btn-primary">Ažuriraj</button>
                                <button id="btnCancelUser" class="btn btn-primary">Otkaži</button>
                   </form>
                   <div><p id="error"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#editUser").html(form);
            $("#modalContentUser").modal('show');
            printRolesForForm(data.role.id);
        }
        function deleteUser(id){
            $.ajax({
                url: baseUrl + `/admin/users/${id}`,
                method: 'DELETE',
                data: {
                    id: id,
                    _token: token
                },
                success: function (data) {
                    getUsers();
                },
                error: function (data) {
                    // console.log(data);
                    alert(data.responseJSON.error);
                }
            });
        }
        function printUsers(data){
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Korisnik</th>
      <th scope="col">Korisničko ime</th>
      <th scope="col">Email</th>
      <th scope="col">Aktivan</th>
       <th scope="col">Uloga</th>
      <th scope="col">Ažuriraj</th>
      <th scope="col">Izbriši</th>
    </tr>
  </thead>
  <tbody>`;
            for (user of data) {
                x += `<tr>
       <td>${user.first_name} ${user.last_name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
       <td>${user.active}</td>
      <td>${user.role.name}</td>
       <td><img src="${publicFolder}assets/images/edit-icon.gif" class="editUser" data-toggle="modal" data-target="#exampleModal" data-id="${user.id}"/> </td>
       <td><img src="${publicFolder}assets/images/hr.gif" class="deleteUser" data-id="${user.id}"/> </td>
       </tr>`;
            }
            x += `</tbody></table>`;
            $("#tabelaUsers").html(x);
        }
        function getRolesForForm(){
            $.ajax({
                url: baseUrl + `/admin/roles/getRoles`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    allRoles=data;
                    printRolesForForm();
                    // console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }
        getRolesForForm();
        function printRolesForForm(idRole=null){
            let x = `<label>Uloge</label>
<select id="ddlRoles" class="form-control"> <option value="0">Izaberite</option>`;
            for (let role of allRoles) {
                x += `<option ${role.id == idRole ? 'selected' : ''} value=${role.id}>${role.name}</option>`;
            }
            x += "</select>";
           $("#roles").html(x);
        }
        $(document).on("click",".editUser",function(e){
            e.preventDefault();
            let id = $(this).attr("data-id");
            // console.log(id);
            userId = id;
            editUser(id);

        })
        $(document).on("click","#btnCancelUser",function (e){
            e.preventDefault();
            $("#modalContentUser").modal('hide');
        })
        $(document).on("click","#btnUpdateUser",function(e){
            e.preventDefault();
            // console.log(userId);
            updateUser(userId);
        })
        $(document).on("click",".deleteUser",function(e){
            e.preventDefault();
            let id=$(this).attr("data-id");
            deleteUser(id);
        })
    }
    if(path=="admin/roles"){
        console.log("roles");
        var currentRole="";
        function getAllRoles(){
            $.ajax({
                url:baseUrl+'/admin/roles/getRoles',
                method:'GET',
                data: {},
                dataType: "json",
                success:function (data){
                    printAllRoles(data);
                    // console.log(data);
                },
                error:function (data){
                    console.log(data);
                }
            })
        }
        getAllRoles();
        function printAllRoles(data){
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Naziv</th>
      <th scope="col">Ažuriraj</th>
      <th scope="col">Izbriši</th>
    </tr>
  </thead>
  <tbody>`;
            for (role of data) {
                x += `
 <tr>
       <td>${role.name}</td>
       <td><img src="${publicFolder}assets/images/edit-icon.gif" class="editRole" data-toggle="modal" data-target="#exampleModal" data-id="${role.id}"/> </td>
       <td><img src="${publicFolder}assets/images/hr.gif" class="deleteRole" data-id="${role.id}"/> </td>
    </tr>
                `;
            }
            x += `</tbody>
</table>`;
            $("#tabelaUloga").html(x);
        }
        function modalInsertRole(){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentInsertRole">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Dodaj ulogu</span> </h5>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                     <div class="control-group">
                        <label class='control-label' for='name'>Naziv</label>
                        <div class="form-group">
                         <input type="text" name="name" id="name" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                   <button id="btnInsertR" class="btn btn-primary">Unos</button>
                   <button id="btnCancelR" class="btn btn-primary">Otkaži</button>
                    </form>
                     <div><p id="error"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#insertRole").html(form);
            $("#modalContentInsertRole").modal('show');
        }
        function insertRole(){
            let name=$("#name").val();
            // console.log(name);
            let reg=/^[\wŠĐČĆŽšđčćž\d\s]{3,50}$/;
            var greske = [];
            if (!reg.test(name)) {
                $('#name').next().html("Ime uloge nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#name').next().addClass("red");
                greske.push("Ime uloge nije u dobrom formatu.");
            } else {
                $('#name').next().html("");
                $('#name').next().removeClass("red");
            }
            if (greske.length) {
            } else {
                $.ajax({
                    url:baseUrl+'/admin/roles',
                    method:'POST',
                    data:{
                        name:name,
                        _token:token
                    },
                    success:function(data){
                        getAllRoles();
                        $("#modalContentInsertRole").modal('hide');
                    },
                    error:function (data){
                        printErrors(data.responseJSON.errors,false);
                        $("#error").html(data.responseJSON.error);
                    }

                })

            }
        }
        function printErrors(errors,isEdit=false) {
            let content = '<ul>';
            for(let error of Object.keys(errors)) {
                content += '<li>'+ errors[error][0] +'</li>';
            }
            content += '</ul>';
            isEdit ? $("#errorE").html(content) : $("#error").html(content);
        }
        function editRole(id){
            $.ajax({
                url: baseUrl + `/admin/roles/${id}`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    formForUpdateRole(data);
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }
        function formForUpdateRole(data){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentUpdateRole">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Ažuriraj ulogu</span> </h5>
                    </button>
                </div>

                <div class="modal-body">
                    <form>
                     <div class="control-group">
                        <label class='control-label' for='nameE'>Naziv</label>
                        <div class="form-group">
                         <input type="text" name="nameE" id="nameE" value="${data.name}" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                                 <button id="btnUpdateR" class="btn btn-primary">Ažuriraj</button>
                                <button id="cancelRole" class="btn btn-primary">Otkaži</button>
                   </form>
                   <div><p id="errorE"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#editRole").html(form);
            $("#modalContentUpdateRole").modal('show');
        }
        function updateRole(id){
            let nameE=$("#nameE").val();
            // console.log(role);
            let reg=/^[\wŠĐČĆŽšđčćž\d\s]{3,50}$/;
            var greske = [];
            if (!reg.test(nameE)) {
                $('#nameE').next().html("Ime uloge nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#nameE').next().addClass("red");
                greske.push("Ime uloge nije u dobrom formatu.");
            } else {
                $('#nameE').next().html("");
                $('#nameE').next().removeClass("red");
            }
            if (greske.length) {
            } else {
                $.ajax({
                    url:baseUrl+`/admin/roles/${id}/update`,
                    method:'POST',
                    data:{
                        nameE:nameE,
                        "_method":"PUT",
                        "_token":token
                    },
                    success: function (data) {
                        getAllRoles();
                        $("#modalContentUpdateRole").modal('hide');
                        delete("_method");
                    },
                    error: function (data) {
                        delete("_method");
                        printErrors(data.responseJSON.errors,true);
                        $("#error").html(data.responseJSON.error);
                    }

                })

            }
        }
        function deleteRole(id){
            $.ajax({
                url: baseUrl + `/admin/roles/${id}`,
                method: 'DELETE',
                data: {
                    id: id,
                    _token: token
                },
                success: function (data) {
                    getAllRoles();
                },
                error: function (data) {
                    // console.log(data);
                    alert(data.responseJSON.error);
                }
            });
        }
        $(document).on("click","#btnInsertRole",function(e){
            e.preventDefault();
            modalInsertRole();
        })
        $(document).on("click","#btnInsertR",function (e){
            e.preventDefault();
            insertRole();
        })
        $(document).on("click","#btnCancelR",function(e){
            e.preventDefault();
            $("#modalContentInsertRole").modal('hide');
        })
        $(document).on("click",".editRole",function(e){
            let id = $(this).attr("data-id");
            // console.log(id);
            currentRole = id;
            editRole(id);
        })
        $(document).on("click","#cancelRole",function (e){
            e.preventDefault();
            $("#modalContentUpdateRole").modal('hide');
        })
        $(document).on("click","#btnUpdateR",function(e){
            e.preventDefault();
            updateRole(currentRole);
        })
        $(document).on("click",".deleteRole",function(e){
          e.preventDefault();
          let id=$(this).attr('data-id');
          deleteRole(id);
        })
    }
    if(path=="admin/menus"){
        console.log("menu");
        var currentMenu="";
        function getAllMenu(){
            $.ajax({
                url:baseUrl+'/admin/menus/getMenuAll',
                method:'GET',
                data: {},
                dataType: "json",
                success:function (data){
                    printMenu(data);
                    // console.log(data);
                },
                error:function (data){
                    console.log(data);
                }
            })
        }
        getAllMenu();
        function printMenu(data){
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Naziv</th>
      <th scope="col">Ruta</th>
      <th scope="col">Raspored</th>
      <th scope="col">Ažuriraj</th>
      <th scope="col">Izbriši</th>
    </tr>
  </thead>
  <tbody>`;
            for (menu of data) {
                x += `
 <tr>
       <td>${menu.name}</td>
       <td>${menu.route}</td>
       <td>${menu.order}</td>
       <td><img src="${publicFolder}assets/images/edit-icon.gif" class="editMenu" data-toggle="modal" data-target="#exampleModal" data-id="${menu.id}"/> </td>
       <td><img src="${publicFolder}assets/images/hr.gif" class="deleteMenu" data-id="${menu.id}"/> </td>
    </tr>
                `;
            }
            x += `</tbody>
</table>`;
            $("#tabelaMeni").html(x);
        }
        function modalInsertLink(){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentInsertLink">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Dodaj link u meni</span> </h5>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                     <div class="control-group">
                        <label class='control-label' for='name'>Naziv</label>
                        <div class="form-group">
                         <input type="text" name="name" id="name" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                        <div class="control-group">
                        <label class='control-label' for='route'>Ruta</label>
                        <div class="form-group">
                         <input type="text" name="route" id="route" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                        <div class="control-group">
                        <label class='control-label' for='order'>Raspored</label>
                        <div class="form-group">
                         <input type="text" name="order" id="order" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                   <button id="btnInsertL" class="btn btn-primary">Unos</button>
                   <button id="btnCancelL" class="btn btn-primary">Otkaži</button>
                    </form>
                     <div><p id="error"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#insertLink").html(form);
            $("#modalContentInsertLink").modal('show');
        }
        function insertLink(){
            let name=$("#name").val();
            let route=$("#route").val();
            let order=$("#order").val();
            console.log(order);
            let reg=/^[\wŠĐČĆŽšđčćž\d\s]{3,50}$/;
            let regRoute=/^[\wŠĐČĆŽšđčćž\d\.\/\s]{3,50}$/;
            let regOrder=/^[0123456789]{1,}$/;
            var greske = [];
            if (!reg.test(name)) {
                $('#name').next().html("Ime linka nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#name').next().addClass("red");
                greske.push("Ime linka nije u dobrom formatu.");
            } else {
                $('#name').next().html("");
                $('#name').next().removeClass("red");
            }
            if (!regRoute.test(route)) {
                $('#route').next().html("Naziv rute nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#route').next().addClass("red");
                greske.push("Naziv rute nije u dobrom formatu.");
            } else {
                $('#route').next().html("");
                $('#route').next().removeClass("red");
            }
            if (!regOrder.test(order)) {
                $('#order').next().html("Raspored može da sadrži samo cifre.");
                $('#order').next().addClass("red");
                greske.push("Raspored nije u dobrom formatu.");
            } else {
                $('#order').next().html("");
                $('#order').next().removeClass("red");
            }
            if (greske.length) {
            } else {
                $.ajax({
                    url:baseUrl+'/admin/menus',
                    method:'POST',
                    data:{
                        name:name,
                        route:route,
                        order:order,
                        _token:token
                    },
                    success:function(data){
                        getAllMenu();
                        $("#modalContentInsertLink").modal('hide');
                    },
                    error:function (data){
                        printErrors(data.responseJSON.errors,false);
                        $("#error").html(data.responseJSON.error);
                    }

                })

            }
        }
        function printErrors(errors,isEdit=false) {
            let content = '<ul>';
            for(let error of Object.keys(errors)) {
                content += '<li>'+ errors[error][0] +'</li>';
            }
            content += '</ul>';
            isEdit ? $("#errorE").html(content) : $("#error").html(content);
        }
        function getOne(id){
            $.ajax({
                url: baseUrl + `/admin/menus/${id}`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    modalForMenuUpdate(data);
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }
        function modalForMenuUpdate(data){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentUpdateLink">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Ažuriraj link u meniju</span> </h5>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                     <div class="control-group">
                        <label class='control-label' for='nameE'>Naziv</label>
                        <div class="form-group">
                         <input type="text" name="nameE" id="nameE" class="form-control" value="${data.name}"/><p class="opis"></p>
                        </div>
                        </div>
                        <div class="control-group">
                        <label class='control-label' for='routeE'>Ruta</label>
                        <div class="form-group">
                         <input type="text" name="routeE" id="routeE" value="${data.route}" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                        <div class="control-group">
                        <label class='control-label' for='order'>Raspored</label>
                        <div class="form-group">
                         <input type="text" name="orderE" id="orderE" value="${data.order}" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                   <button id="updateLink" class="btn btn-primary">Unos</button>
                   <button id="cancelModal" class="btn btn-primary">Otkaži</button>
                    </form>
                     <div><p id="errorE"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#editLink").html(form);
            $("#modalContentUpdateLink").modal('show');
        }
        function updateLink(id){
            let nameE=$("#nameE").val();
            let routeE=$("#routeE").val();
            let orderE=$("#orderE").val();
            console.log(orderE);
            let reg=/^[\wŠĐČĆŽšđčćž\d\s]{3,50}$/;
            let regRoute=/^[\wŠĐČĆŽšđčćž\d\.\/\s]{3,50}$/;
            let regOrder=/^[0123456789]{1,}$/;
            var greske = [];
            if (!reg.test(nameE)) {
                $('#nameE').next().html("Ime linka nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#nameE').next().addClass("red");
                greske.push("Ime linka nije u dobrom formatu.");
            } else {
                $('#nameE').next().html("");
                $('#nameE').next().removeClass("red");
            }
            if (!regRoute.test(routeE)) {
                $('#routeE').next().html("Naziv rute nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#routeE').next().addClass("red");
                greske.push("Naziv rute nije u dobrom formatu.");
            } else {
                $('#routeE').next().html("");
                $('#routeE').next().removeClass("red");
            }
            if (!regOrder.test(orderE)) {
                $('#orderE').next().html("Raspored može da sadrži samo cifre.");
                $('#orderE').next().addClass("red");
                greske.push("Raspored nije u dobrom formatu.");
            } else {
                $('#orderE').next().html("");
                $('#orderE').next().removeClass("red");
            }
            if (greske.length) {
            } else {
                $.ajax({
                    url:baseUrl+`/admin/menus/${id}/update`,
                    method:'POST',
                    data:{
                        nameE:nameE,
                        routeE:routeE,
                        orderE:orderE,
                        "_method":"PUT",
                        "_token":token
                    },
                    success: function (data) {
                        getAllMenu();
                        $("#modalContentUpdateLink").modal('hide');
                        delete("_method");
                    },
                    error: function (data) {
                        delete("_method");
                        printErrors(data.responseJSON.errors,true);
                        $("#error").html(data.responseJSON.error);
                    }

                })

            }
        }
        function deleteLink(id){
            $.ajax({
                url: baseUrl + `/admin/menus/${id}`,
                method: 'DELETE',
                data: {
                    id: id,
                    _token: token
                },
                success: function (data) {
                    getAllMenu();
                },
                error: function (data) {
                    // console.log(data);
                    alert(data.responseJSON.error);
                }
            });
        }
        $(document).on("click","#btnInsertLink",function(e){
            e.preventDefault();
            modalInsertLink();
        })
        $(document).on("click","#btnCancelL",function(e){
            e.preventDefault();
            $("#modalContentInsertLink").modal('hide');
        })
        $(document).on("click","#btnInsertL",function(e){
            e.preventDefault();
            insertLink();
        })
        $(document).on("click",".editMenu",function(e){
            e.preventDefault();
            let id=$(this).attr("data-id");
            currentMenu=id;
            getOne(id);
        })
        $(document).on("click","#cancelModal",function(e){
            e.preventDefault();
            $("#modalContentUpdateLink").modal('hide');
        })
        $(document).on("click","#updateLink",function(e){
            e.preventDefault();
            updateLink(currentMenu);
        })
        $(document).on("click",".deleteMenu",function(e){
            e.preventDefault();
            let id=$(this).attr("data-id");
            deleteLink(id);
        })
    }
    if(path=="admin/comments"){
      function getAllComments(){
          $.ajax({
              url:baseUrl+'/admin/comments/getComments',
              method:'GET',
              data: {},
              dataType: "json",
              success:function (data){
                  printComments(data);
                  // console.log(data);
              },
              error:function (data){
                  console.log(data);
              }
          })
      }
      getAllComments();
        function printComments(data){
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Sadržaj</th>
      <th scope="col">Korisnik</th>
      <th scope="col">Post</th>
      <th scope="col">Izbriši</th>
    </tr>
  </thead>
  <tbody>`;
            for (com of data) {
                x += `
 <tr>
       <td>${com.content}</td>
       <td>${com.first_name} ${com.last_name}</td>
       <td>${com.title}</td>
       <td><img src="${publicFolder}assets/images/hr.gif" class="deleteComment" data-id="${com.id}"/> </td>
    </tr>
                `;
            }
            x += `</tbody>
</table>`;
            $("#tabelaComment").html(x);
        }
        function deleteCom(id){
            $.ajax({
                url: baseUrl + `/admin/comments/${id}`,
                method: 'DELETE',
                data: {
                    id: id,
                    _token: token
                },
                success: function (data) {
                    getAllComments();
                },
                error: function (data) {
                    // console.log(data);
                    alert(data.responseJSON.error);
                }
            });
        }
        $(document).on("click",".deleteComment",function (e){
            console.log("klik");
            e.preventDefault();
            let id=$(this).attr("data-id");
            deleteCom(id);
        })
    }
    if(path=="admin/messages"){
        function getAllMessages(){
            $.ajax({
                url:baseUrl+'/admin/messages/getAllMessage',
                method:'GET',
                data: {},
                dataType: "json",
                success:function (data){
                    printMessages(data);
                    // console.log(data);
                },
                error:function (data){
                    console.log(data);
                }
            })
        }
        getAllMessages();
        function printMessages(data){
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Svrha</th>
      <th scope="col">Email</th>
      <th scope="col">Poruka</th>
      <th scope="col">Izbriši</th>
    </tr>
  </thead>
  <tbody>`;
            for (mess of data) {
                x += `
 <tr>
       <td>${mess.purpose}</td>
       <td>${mess.email}</td>
       <td>${mess.content}</td>
       <td><img src="${publicFolder}assets/images/hr.gif" class="deleteMessage" data-id="${mess.id}"/> </td>
    </tr>
                `;
            }
            x += `</tbody>
</table>`;
            $("#tabelaPoruke").html(x);
        }
        function deleteMess(id){
            $.ajax({
                url: baseUrl + `/admin/messages/${id}`,
                method: 'DELETE',
                data: {
                    id: id,
                    _token: token
                },
                success: function (data) {
                    getAllMessages();
                },
                error: function (data) {
                    // console.log(data);
                    alert(data.responseJSON.error);
                }
            });
        }
        $(document).on("click",".deleteMessage",function (e){
            console.log("klik");
            e.preventDefault();
            let id=$(this).attr("data-id");
            deleteMess(id);
        })
    }
    if(path=="admin/famenus"){
        console.log("famenus");
        var currentIdFa="";
        function getAllFamenu(){
            $.ajax({
                url:baseUrl+'/admin/famenus/getFamenuAll',
                method:'GET',
                data: {},
                dataType: "json",
                success:function (data){
                    printFaMenu(data);
                    // console.log(data);
                },
                error:function (data){
                    console.log(data);
                }
            })
        }
        getAllFamenu();
        function printFaMenu(data){
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Naziv</th>
      <th scope="col">Putanja</th>
      <th scope="col">Ažuriraj</th>
      <th scope="col">Izbriši</th>
    </tr>
  </thead>
  <tbody>`;
            for (menu of data) {
                x += `
 <tr>
       <td>${menu.name}</td>
       <td>${menu.path}</td>
       <td><img src="${publicFolder}assets/images/edit-icon.gif" class="editFamenu" data-toggle="modal" data-target="#exampleModal" data-id="${menu.id}"/> </td>
       <td><img src="${publicFolder}assets/images/hr.gif" class="deleteFamenu" data-id="${menu.id}"/> </td>
    </tr>
                `;
            }
            x += `</tbody>
</table>`;
            $("#tabelaFamenu").html(x);
        }
        function modalInsertPath(){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentInsertPath">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Dodaj link u meni</span> </h5>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                     <div class="control-group">
                        <label class='control-label' for='name'>Naziv</label>
                        <div class="form-group">
                         <input type="text" name="name" id="name" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                        <div class="control-group">
                        <label class='control-label' for='path'>Putanja</label>
                        <div class="form-group">
                         <input type="text" name="path" id="path" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                   <button id="btnInsertF" class="btn btn-primary">Unos</button>
                   <button id="btnCancelF" class="btn btn-primary">Otkaži</button>
                    </form>
                     <div><p id="error"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#insertFamenu").html(form);
            $("#modalContentInsertPath").modal('show');
        }
        function insertFa(){
            let name=$("#name").val();
            let path=$("#path").val();
            let reg=/^[\wŠĐČĆŽšđčćž\d\.\-\/\s]{3,50}$/;
            let regPath=/^[\wŠĐČĆŽšđčćž\d\.\/]{3,50}$/;
            var greske = [];
            if (!reg.test(name)) {
                $('#name').next().html("Ime linka nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#name').next().addClass("red");
                greske.push("Ime linka nije u dobrom formatu.");
            } else {
                $('#name').next().html("");
                $('#name').next().removeClass("red");
            }
            if (!regPath.test(path)) {
                $('#path').next().html("Naziv putanje nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#path').next().addClass("red");
                greske.push("Naziv putanje nije u dobrom formatu.");
            } else {
                $('#path').next().html("");
                $('#path').next().removeClass("red");
            }
            if (greske.length) {
            } else {
                $.ajax({
                    url:baseUrl+'/admin/famenus',
                    method:'POST',
                    data:{
                        name:name,
                       path:path,
                        _token:token
                    },
                    success:function(data){
                        getAllFamenu();
                        $("#modalContentInsertPath").modal('hide');
                    },
                    error:function (data){
                        printErrors(data.responseJSON.errors,false);
                        $("#error").html(data.responseJSON.error);
                    }

                })

            }
        }
        function printErrors(errors,isEdit=false) {
            let content = '<ul>';
            for(let error of Object.keys(errors)) {
                content += '<li>'+ errors[error][0] +'</li>';
            }
            content += '</ul>';
            isEdit ? $("#errorE").html(content) : $("#error").html(content);
        }
        function getOne(id){
            $.ajax({
                url: baseUrl + `/admin/famenus/${id}`,
                method: "GET",
                data: {},
                dataType: "json",
                success: function (data) {
                    // console.log(data);
                    modalForFamenuUpdate(data);
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }
        function modalForFamenuUpdate(data){
            let form = `
                <div class="modal" tabindex="-1" role="dialog" id="modalContentUpdatePath">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="modifyTest">Ažuriraj link u meniju</span> </h5>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                     <div class="control-group">
                        <label class='control-label' for='nameE'>Naziv</label>
                        <div class="form-group">
                         <input type="text" name="nameE" id="nameE" class="form-control" value="${data.name}"/><p class="opis"></p>
                        </div>
                        </div>
                        <div class="control-group">
                        <label class='control-label' for='path'>Putanja</label>
                        <div class="form-group">
                         <input type="text" name="pathE" id="pathE" value="${data.path}" class="form-control"/><p class="opis"></p>
                        </div>
                        </div>
                   <button id="updateFa" class="btn btn-primary">Unos</button>
                   <button id="cancelModalFa" class="btn btn-primary">Otkaži</button>
                    </form>
                     <div><p id="errorE"></p></div>
                </div>
            </div>
        </div>
    </div>`;

            $("#editFamnenu").html(form);
            $("#modalContentUpdatePath").modal('show');
        }
        function updateFa(id){
            let nameE=$("#nameE").val();
            let pathE=$("#pathE").val();
            let reg=/^[\wŠĐČĆŽšđčćž\d\.\-\/\s]{3,50}$/;
            let regPath=/^[\wŠĐČĆŽšđčćž\d\.\/]{3,50}$/;
            var greske = [];
            if (!reg.test(nameE)) {
                $('#nameE').next().html("Ime linka nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#nameE').next().addClass("red");
                greske.push("Ime linka nije u dobrom formatu.");
            } else {
                $('#nameE').next().html("");
                $('#nameE').next().removeClass("red");
            }
            if (!regPath.test(pathE)) {
                $('#pathE').next().html("Naziv putanje nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.");
                $('#pathE').next().addClass("red");
                greske.push("Naziv putanje nije u dobrom formatu.");
            } else {
                $('#pathE').next().html("");
                $('#pathE').next().removeClass("red");
            }
            if (greske.length) {
            } else {
                $.ajax({
                    url:baseUrl+`/admin/famenus/${id}/update`,
                    method:'POST',
                    data:{
                        nameE:nameE,
                       pathE:pathE,
                        "_method":"PUT",
                        "_token":token
                    },
                    success: function (data) {
                        getAllFamenu();
                        $("#modalContentUpdatePath").modal('hide');
                        delete("_method");
                    },
                    error: function (data) {
                        delete("_method");
                        printErrors(data.responseJSON.errors,true);
                        $("#error").html(data.responseJSON.error);
                    }

                })

            }
        }
        function deleteFa(id){
            $.ajax({
                url: baseUrl + `/admin/famenus/${id}`,
                method: 'DELETE',
                data: {
                    id: id,
                    _token: token
                },
                success: function (data) {
                    getAllFamenu();
                },
                error: function (data) {
                    // console.log(data);
                    alert(data.responseJSON.error);
                }
            });
        }
        $(document).on("click","#btnInsertFamenu",function(e){
            e.preventDefault();
            modalInsertPath();
        })
        $(document).on("click","#btnCancelF",function(e){
            e.preventDefault();
            $("#modalContentInsertPath").modal('hide');
        })
        $(document).on("click","#btnInsertF",function(e){
            e.preventDefault();
            insertFa();
        })
        $(document).on("click",".editFamenu",function(e){
            e.preventDefault();
            let id=$(this).attr("data-id");
            currentIdFa=id;
            getOne(id);
        })
        $(document).on("click","#cancelModalFa",function(e){
            e.preventDefault();
            $("#modalContentUpdatePath").modal('hide');
        })
        $(document).on("click","#updateFa",function(e){
            e.preventDefault();
            updateFa(currentIdFa);
        })
        $(document).on("click",".deleteFamenu",function(e){
            e.preventDefault();
            let id=$(this).attr("data-id");
            deleteFa(id);
        })
    }
    if(path=="admin/shows"){
        console.log("prikaz");
        function getLog(date){
            console.log(date);
            $.ajax({
                url:baseUrl+`/admin/logFile`,
                method:'GET',
                data: {
                    date
                },
                dataType: "json",
                success:function (log){
                    // var podaci=log.log[0];
                    // console.log(podaci.split("\t"));
                    // console.log(log.log[0]);
                    printLog(log.log);
                },
                error:function (data){
                    console.log(data);
                }
            })
        }
        getLog();
       $("#filterLogDate").change(function(){
           var date=$("#filterLogDate").val();
           getLog(date);
       });
        function printLog(data){
            let x = `<table class="table">
  <thead>
    <tr>
      <th scope="col">Ip adresa</th>
      <th scope="col">Url</th>
      <th scope="col">Metod</th>
      <th scope="col">Korisnik</th>
      <th scope="col">Poruka</th>
      <th scope="col">Datum</th>
    </tr>
  </thead>
  <tbody>`;
            for(let i=0;i<data.length;i++){
                var podaci=data[i].split("\t");
                x += `
 <tr>
       <td>${podaci[0]}</td>
       <td>${podaci[1]}</td>
       <td>${podaci[2]}</td>
       <td>${podaci[3]}</td>
       <td>${podaci[4]}</td>
       <td>${podaci[5]}</td>
    </tr>
                `;
            }
            x += `</tbody>
</table>`;
            $("#tabelaPrikaz").html(x);
        }
    }
}

