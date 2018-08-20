(function ($) {
    'use strict';

    jQuery(document).ready(function () {

    var tagRemover = function (string) {
        return string.replace(/(<([^>]+)>)/ig,"");
    }
        
        
       /* Preloader */
		
        $(window).load(function () {
            $('.preloader').delay(800).fadeOut('slow');
         });
		 		
		
       /* Smooth Scroll */

        $('a.smoth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });
		
        let activePage = 0
        
        $(window).on('click', function(e){
            if (e.target.nodeName === "A" && e.target.id !== "load-more-post"){
                activePage = 0
            }
            if (e.target.nodeName === "A"){
                $('#addform input[type="text"], #addform textarea').each(function(){
                    $(this).css('border','2px solid transparent');//Сделаем бордер серым
                });    
            }
        })
		
       /* Scroll To Top */
		
        $(window).scroll(function(){
        if ($(this).scrollTop() >= 500) {
            $('.scroll-to-top').fadeIn();
         } else {
            $('.scroll-to-top').fadeOut();
         }
         });
	
	
        $('.scroll-to-top').click(function(){
          $('html, body').animate({scrollTop : 0},800);
          return false;
          });
		  
		  
		  
       /* Tooltip */
	   
        $('[data-toggle="tooltip"]').tooltip();



       /* Popover */
	   
        $('[data-toggle="popover"]').popover();		  
		  
		  
	   
       /* Ajaxchimp for Subscribe Form */
		
        $('#mc-form').ajaxChimp();
        
        $('#addpost').click(function(e) {
            e.preventDefault()
            $('#addformblock').toggle()
            $(this).text($(this).text() == '+ Add post' ? '- Add post' : '+ Add post');
        })
        
        // CRUD

        $( document ).ready(function() {


            //авторизация
            $("#loginform").on('submit', function(e){
                e.preventDefault()
                $.ajax({
                    url:     "/login/", //url страницы 
                    type:     "POST", //метод отправки
                    dataType: "html", //формат данных
                    data: $("#loginform").serialize(),  // Сериализуем объект
                    success: function(response) { //Данные отправлены успешно
                        // var result = $.parseJSON(response);
                        console.log(response)
                    },
                    error: function(response) { // Данные не отправлены
                        console.log(response)
                    }
                });
            })

            //добавление поста
            $("#addform").submit(
                function(e){
                    e.preventDefault()
                    var trigger = true
                    $('#addform input[type="text"], #addform textarea').each(function(){
                        if(!$(this).val() || $(this).val() == ''){
                           $(this).css('border-color','red');//Сделаем бордер красным
                           trigger = false
                        }
                    });
                    
                    if (trigger) { 
                        var htmlPost = ""
                        var htmlCats = ""
                        $.ajax({
                            url:     "/posts", //url страницы 
                            type:     "POST", //метод отправки
                            dataType: "html", //формат данных
                            data: $("#addform").serialize(),  // Сериализуем объект
                            success: function(response) { //Данные отправлены успешно
                                var result = $.parseJSON(response);
                                $('#addformblock').hide()
                                htmlPost = `<div class="col-md-12 blog-post">
                                    <div class="post-title">
                                        <h1>${tagRemover(result.post.title)}</h1>
                                    </div>  
                                    <div class="post-info">
                                        <span>Date: ${result.post.createdAt}</span>
                                    </div> 
                                    <div class="post-info">
                                        <span>Category: ${tagRemover(result.post.category)}</span>
                                    </div>  
                                    <p>${tagRemover(result.post.postbody)}</p>         
                                </div>`

                                result.categories.forEach((item, i) => {
                                    htmlCats += `<span><a href="/category/${tagRemover(item.name)}">${tagRemover(item.name)}</a></span>, `
                                })

                                $("#addform").trigger('reset')
                                $('#bloglist').html(htmlPost)
                                $("#load-more-post").hide()
                                $('#cats').html(htmlCats)
                            },
                            error: function() { // Данные не отправлены
                                $('#result_form').html('Ошибка. Данные не отправлены.');
                            }
                        });

                    }
                }
            );


            //регистрация
            $("#register").click(function(e){
                e.preventDefault()

                var html =`<div class="col-md-12 blog-post">
                    <div class="post-title">
                        <h1>Register</h1>
                    </div> 

                    <form name="registerform" id="registerform">

                        <div class="col-sm-12">
                            <p>Name:</p>
                            <p><input type="text" id="name" name="name" class="form-control" placeholder="Name"></p>
                        </div>
                        <div class="col-sm-12">
                            <p>Password:</p>
                            <p><input type="password" id="password" name="password" class="form-control" placeholder="Password"></p>
                        </div>
                        <div class="text-center">      
                            <button type="submit" id="registerbutton" class="load-more-button">Submit</button>
                        </div>

                    </form>
                </div>`

                $('#bloglist').html(html)
                $("#load-more-post").hide()
            })

            $("#bloglist").click(function(e){
                e.preventDefault()

                //обработка фомы регистрации
                if (e.target.id === "registerbutton"){
                    $.ajax({
                        url:     "/register", //url страницы 
                        type:     "POST", //метод отправки
                        dataType: "html", //формат данных
                        data: $("#registerform").serialize(),  // Сериализуем объект
                        success: function(response) { //Данные отправлены успешно
                            var result = $.parseJSON(response);
                            $('#bloglist h1').text(result.hint);
                        },
                        error: function(response) { // Данные не отправлены
                            var result = $.parseJSON(response.responseText);
                            $('#bloglist h1').text(result.hint);
                        }
                    });
                }

                // аякс подгрузка конкретного сообщения по клике в списке
                if (e.target.nodeName === "A"){
                    var url = $(e.target).attr("href");
                    var html = ""
                    $.ajax({
                        url, 
                        success: function(result){
                            console.log(result)
                            var html =`<div class="col-md-12 blog-post">
                                
                            <div class="post-title">
                                <h1>${tagRemover(result.title)}</h1>
                            </div> 

                            <div id="postblock">     
                                <div class="post-info">
                                    <span>Date: ${new Date(result.createdAt).toLocaleString()} by Admin</span>
                                </div> 
                                <div class="post-info">
                                    <span>Category: ${tagRemover(result.category)}</span>
                                </div>  
                                <p>${tagRemover(result.postbody)}</p>    
                            </div>  
                            
                            <form name="editform"  style="display: none" id="editform">

                                <div class="col-sm-12">
                                    <p>Title:</p>
                                    <p><input type="text" id="title" name="title" class="form-control" placeholder="Title" value="${tagRemover(result.title)}"></p>
                                </div>
                                <div class="col-sm-12">
                                    <div class="textarea-message form-group">
                                        <p>Post:</p>
                                        <textarea id="postbody" name="postbody" class="textarea-message form-control" placeholder="Your post" rows="5">${tagRemover(result.postbody)}</textarea>
                                    </div>
                                </div>
                                <div class="text-center">      
                                    <button type="submit" data-id="${result._id}" id="editsubmitbutton" class="load-more-button">Edit</button>
                                </div>
               
                            </form>

                            <div>
                                <ul class="knowledge">
                                    <li class="bg-color-4" data-id="${result._id}" id="edit">Edit</li>
                                    <li class="bg-color-5" data-id="${result._id}" id="delete">Delete</li>
                                </ul>
                            </div> 

                        </div>`
                            
                            $('#bloglist').html(html)
                            $("#load-more-post").hide()
                        }
                    });
                }

                if(e.target.id === "edit"){
                    $("#editform").toggle()
                    $("#postblock").toggle()
                }

                //редактирование поста
                if (e.target.id === "editsubmitbutton"){
                    var form = $(e.target).closest("#editform")
                    $.ajax({
                        type: "PUT",
                        url: `/posts/${e.target.dataset.id}`, 
                        dataType: "html", //формат данных
                        data: form.serialize(),  // Сериализуем объект
                        success: function(response){

                            var result = $.parseJSON(response);
                            $('#addformblock').hide()
                            var html = `<div class="col-md-12 blog-post">
                                <div class="post-title">
                                        <h1>${tagRemover(result.title)}</h1>
                                </div>  
                                <div class="post-info">
                                    <span>Date: ${result.createdAt}</span>
                                </div> 
                                <div class="post-info">
                                    <span>Category: ${tagRemover(result.category)}</span>
                                </div>  
                                <p>${tagRemover(result.postbody)}</p>         
                            </div>`
                            
                            $('#bloglist').html(html)
                            $("#load-more-post").hide()
                            $("#editform").hide()
                        }
                    });
                }
                 
                //удаление поста
                if(e.target.id === "delete"){
                    var htmlPost = ""
                    var htmlCats = ""
                    var id = e.target.dataset.id
                    $.ajax({
                        type: "DELETE",
                        url: `/posts/${id}`, 
                        success: function(result){
                            
                            htmlPost =`<div class="col-md-12 blog-post">
                                <div class="post-title">
                                    <h1>${tagRemover(result.deleted.title)} deleted!</h1>
                                </div>  
                            </div>`
                            result.categories.forEach((item, i) => {
                                htmlCats += `<span><a href="/category/${tagRemover(item.name)}">${tagRemover(item.name)}</a></span>, `
                            })
                            $('#bloglist').html(htmlPost)
                            $('#cats').html(htmlCats)
                            $("#load-more-post").hide()
                        }
                    });
                } 

            });

        
            // аякс подгрузка сообщений при клике на главную

            $("a.posts").click(function(e) {
                e.preventDefault()
                $.ajax({url: "/posts/", success: function(result){

                    var htmlPosts = ""
                    var htmlCats = ""

                    result.posts.forEach((item, i) => {
                        htmlPosts += `<div class="col-md-12 blog-post">
                            <div class="post-title">
                                <h1><a href='/posts/${item._id}'>${tagRemover(item.title)}</a></h1>
                            </div>  
                            <div class="post-info">
                                <span>Date: ${new Date(item.createdAt).toLocaleString()} by Admin</span>
                            </div> 
                            <div class="post-info">
                                <span>Category: ${tagRemover(item.category)}</span>
                            </div>  
                            <p>${tagRemover(item.postbody).slice(0,100)}...</p>      
                            <a href='/posts/${item._id}' class="button button-style button-anim fa fa-long-arrow-right">Read More</a>
                        </div>`
                    })
                    
                    result.categories.forEach((item, i) => {
                        htmlCats += `<span><a href="/category/${tagRemover(item.name)}">${tagRemover(item.name)}</a></span>, `
                    })

                    $('#bloglist').html(htmlPosts)
                    $('#cats').html(htmlCats)
                    $("#load-more-post").show()
                }});

            })

            // аякс подгрузка сообщений из определенной категории при клике на нее в боковухе

            $("#cats").click(function(e) {
                e.preventDefault()
                if (e.target.nodeName === "A"){
                    var val = $(e.target).html();
                    $.ajax({
                        url: `/category/${val}`, 
                        success: function(result){
                            var html = result.name
                            result.postes.forEach((item, i) => {
                                html += `<div class="col-md-12 blog-post">
                                    <div class="post-title">
                                        <h1><a href='/posts/${item._id}'>${tagRemover(item.title)}</a></h1>
                                    </div>  
                                    <div class="post-info">
                                        <span>Date: ${new Date(item.createdAt).toLocaleString()} by Admin</span>
                                    </div> 
                                    <div class="post-info">
                                        <span>Category: ${tagRemover(item.category)}</span>
                                    </div>  
                                    <p>${tagRemover(item.postbody).slice(0,100)}...</p>         
                                    <a href='/posts/${item._id}' class="button button-style button-anim fa fa-long-arrow-right">Read More</a>
                                </div>`
                            })
                            $('#bloglist').html(html)
                            $("#load-more-post").hide()
                        }
                    })
                }

            })

        });

	   
       /* Load More Post */	
       
          $("#load-more-post").on('click', function (e) {
             e.preventDefault();
             $.ajax({url: `/page/${activePage}`, success: function(result){
                var htmlPosts = ""
                result.posts.forEach((item, i) => {
                    htmlPosts += `<div class="col-md-12 blog-post">
                        <div class="post-title">
                            <h1>${tagRemover(item.title)}</h1>
                        </div>  
                        <div class="post-info">
                            <span>Date: ${new Date(item.createdAt).toLocaleString()} by Admin</span>
                        </div> 
                        <div class="post-info">
                            <span>Category: ${tagRemover(item.category)}</span>
                        </div>  
                        <p>${tagRemover(item.postbody).slice(0,100)}...</p>        
                        <a href='/posts/${item._id}' class="button button-style button-anim fa fa-long-arrow-right">Read More</a>
                    </div>`
                })
                activePage += result.activePage
                $('#bloglist').append(htmlPosts)
            }});

           });
			 

		
		
       /* End Box (Popup When Scroll Down) */
	   
        $("#scroll-down-popup").endpage_box({
           animation: "flyInLeft",
           from: "70%",
           to: "100%"
          });
              
		   
            });

   })(jQuery);