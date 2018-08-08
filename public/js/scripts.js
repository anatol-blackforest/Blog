(function ($) {
    'use strict';

    jQuery(document).ready(function () {

        
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
        
        
        $( document ).ready(function() {
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
                    if (trigger) sendAjaxForm('result_form', 'addform', '/add');
                }
            );
        
            // аякс подгрузка сообщений при клике на главную

            $("a.posts").click(function(e) {
                e.preventDefault()
                $.ajax({url: "/posts/", success: function(result){

                    var htmlPosts = ""
                    var htmlCats = ""
                    
                    result.posts.forEach((item, i) => {
                        htmlPosts += `<div class="col-md-12 blog-post">
                            <div class="post-title">
                                <h1><a href='/posts/${item._id}'>${item.title}</a></h1>
                            </div>  
                            <div class="post-info">
                                <span>Date: ${new Date(item.createdAt).toLocaleString()} by Admin</span>
                            </div> 
                            <div class="post-info">
                                <span>Category: ${item.category}</span>
                            </div>  
                            <p>${item.postbody.slice(0,100)}...</p>         
                            <a href='/posts/${item._id}' class="button button-style button-anim fa fa-long-arrow-right">Read More</a>
                        </div>`
                    })

                    result.categories.forEach((item, i) => {
                        htmlCats += `<span><a href="/category/${item.name}">${item.name}</a></span>, `
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
                                        <h1><a href='/posts/${item._id}'>${item.title}</a></h1>
                                    </div>  
                                    <div class="post-info">
                                        <span>Date: ${new Date(item.createdAt).toLocaleString()} by Admin</span>
                                    </div> 
                                    <div class="post-info">
                                        <span>Category: ${item.category}</span>
                                    </div>  
                                    <p>${item.postbody.slice(0,100)}...</p>         
                                    <a href='/posts/${item._id}' class="button button-style button-anim fa fa-long-arrow-right">Read More</a>
                                </div>`
                            })
                            $('#bloglist').html(html)
                            $("#load-more-post").hide()
                        }
                    })
                }

            })
            
            // аякс подгрузка конкретного сообщения по клике в списке

            $('#bloglist').click(function(e) {
                e.preventDefault()
                
                if (e.target.nodeName === "A"){
                    var url = $(e.target).attr("href");
                    var html = ""
                    $.ajax({
                        url, 
                        success: function(result){
                            var html =`<div class="col-md-12 blog-post">
                                <div class="post-title">
                                    <h1>${result.title}</h1>
                                </div>  
                                <div class="post-info">
                                    <span>Date: ${new Date(result.createdAt).toLocaleString()} by Admin</span>
                                    <span>Category: ${result.category}</span>
                                </div> 
                                <p>${result.postbody}</p>         

                                <div class="post-info">
                                    <ul class="knowledge">
                                        <!-- <li class="bg-color-4" data-id="${result._id}" id="edit">Edit</li> -->
                                        <li class="bg-color-5" data-id="${result._id}" id="delete">Delete</li>
                                    </ul>
                                </div> 
                                
                            </div>`
                            
                            $('#bloglist').html(html)
                            $("#load-more-post").hide()
                        }
                    });
                }else if(e.target.id === "delete"){
                    //удаление поста
                    var htmlPost = ""
                    var htmlCats = ""
                    var id = e.target.dataset.id
                    $.ajax({
                        type: "DELETE",
                        url: `/delete/${id}`, 
                        success: function(result){
                            
                            htmlPost =`<div class="col-md-12 blog-post">
                                <div class="post-title">
                                    <h1>${result.deleted.title} deleted!</h1>
                                </div>  
                            </div>`
                            result.categories.forEach((item, i) => {
                                htmlCats += `<span><a href="/category/${item.name}">${item.name}</a></span>, `
                            })
                            $('#bloglist').html(htmlPost)
                            $('#cats').html(htmlCats)

                            $("#load-more-post").hide()
                        }
                    });
                }
            })


        });

        //добавление поста
        function sendAjaxForm(result_form, addform, url) {
            var htmlPost = ""
            var htmlCats = ""
            $.ajax({
                url:     url, //url страницы 
                type:     "POST", //метод отправки
                dataType: "html", //формат данных
                data: $("#"+addform).serialize(),  // Сериализуем объект
                success: function(response) { //Данные отправлены успешно
                    var result = $.parseJSON(response);
                    $('#addformblock').hide()
                    htmlPost = `<div class="col-md-12 blog-post">
                        <div class="post-title">
                             <h1>${result.post.title}</h1>
                        </div>  
                        <div class="post-info">
                            <span>Date: ${result.post.createdAt}</span>
                        </div> 
                        <div class="post-info">
                            <span>Category: ${result.post.category}</span>
                        </div>  
                        <p>${result.post.postbody}</p>         
                        <a href='/posts/${result.id}' class="button button-style button-anim fa fa-long-arrow-right">Read More</a>
                    </div>`

                    result.categories.forEach((item, i) => {
                        htmlCats += `<span><a href="/category/${item.name}">${item.name}</a></span>, `
                    })

                    $('#bloglist').html(htmlPost)
                    $('#cats').html(htmlCats)
                },
                error: function() { // Данные не отправлены
                    $('#result_form').html('Ошибка. Данные не отправлены.');
                }
             });
        }

	   
       /* Load More Post */	
       
          $("#load-more-post").on('click', function (e) {
             e.preventDefault();
             $.ajax({url: `/page/${activePage}`, success: function(result){
                var htmlPosts = ""
                result.posts.forEach((item, i) => {
                    htmlPosts += `<div class="col-md-12 blog-post">
                        <div class="post-title">
                            <h1>${item.title}</h1>
                        </div>  
                        <div class="post-info">
                            <span>Date: ${new Date(item.createdAt).toLocaleString()} by Admin</span>
                        </div> 
                        <div class="post-info">
                            <span>Category: ${item.category}</span>
                        </div>  
                        <p>${item.postbody.slice(0,100)}...</p>         
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