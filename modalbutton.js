(function ($) {
  
function closemodal() {
	$('div.modalwindow').fadeOut('200', function(){
    $('#new').fadeOut('500', function(){
       $("div.modalwindow").remove();
       $(this).remove();
     });
  });
}

function imageresize() {
            
  $('#modalimg').one('load',function(){ 
    var imgheight, imgwidth,
          windowheight = $(window).height(),
            window_width = $(window).width(),
              image = $(this);
                 
    image.removeAttr("width")
          .removeAttr("height")          
          .css({ width: "", height: "",visibility: "hidden" });

    image.show("100", function () {
      imgheight = image.height();          

      imgwidth = image.width();      
                  
      if (imgwidth > (window_width-150)) {
        image.css('max-width', (window_width-150) );
      }       
             
      if (imgheight > (windowheight-150)) {
        image.css('max-height', (windowheight-150) );
      }

      imgheight = image.height();          

      imgwidth = image.width();
        
      $('div.modalwindow').animate({
        "top": ((windowheight-imgheight)/2),
        "left": ((window_width-imgwidth)/2),
        "height": (imgheight+56),
        "width": (imgwidth+20)     
      }, 500, function(){

        image.css({
          visibility:"visible",
          display:"none"
        });  
        image.fadeIn(300);

        $('div.modalwindow').trigger('mouseenter');

      });  
    });     
  
    $('#modalimg').click(function(){
      $('#b-next').trigger('click');
    });     

  })
    .each(function(){
      if(this.complete) {$(this).trigger('load');}
    });

}

    var all_modal = $('.modalbutton'), //все элементы с модальными окнами
          all_modal_links = $('a.modalbutton'), //все картинки с модальными окнами обернутые в ссылку
           // counter = 0, current_num = 0, //обьявляем глобальный счетчик и активную картинку !!!TO-DO проверить
              links_count = (all_modal_links.length - 1); //общее кол-во ссылок

    all_modal.on('click', function(e){

        var pushed_link = $(this), //запоминаем, что нажали 
              bigimg = pushed_link.attr('href'), //ссылка на большое изображение
                 title = pushed_link.attr('title'), //тайтл, который выводим в заголовок модального окна
                  current_num = all_modal_links.index(pushed_link),//позиция нажатого элемента относительно всех ссылок
                      counter = current_num,
                        next, prev, //кнопки дальше и назад 
                          isnext, isprev, //переменные для определения предыдущей и следующей картинки в наборе;
                            alone_in_the_dark = false,
                              show_arrows = true,
                                overlay_window; //подложка закрывающая сайт;


        e.preventDefault();
        if (typeof(bigimg) === 'undefined') {bigimg = pushed_link.data('href'); show_arrows = false;}

        if (!title) {title = 'Изображение';}//Если нет title у ссылки то ставим в шапку Изображение
        /*Добавляем боди окно*/
        $('body').append('<div id="new" style="width: 100%; height: 100%; position: fixed; opacity: 0.3; top: 0px; left: 0px; background: #000; display: none;"></div>'+
                '<div class="modalwindow">'+
                    '<div class="modalhead">'+
                        '<div class="modalheadtext">'+
                            title+
                        '</div>'+                                    
                    '<button class="modalclose" title="Закрыть" id="mclose">Закрыть</button>'+                                    
                    '</div>'+
                    '<div class="modalcontent"><a id="b-next" href="#" class="img-next"></a><a id="b-prev" href="#" class="img-prev"></a>'+
                        '<img id="modalimg" style="display:none;" src="'+bigimg+'" alt="'+title+'"/>'+     
                    '</div>'+  
                '</div>');
          /*Выводим окно*/          

          overlay_window = $('#new');

          $('div.modalwindow').css({
            "top": (($(window).height()-300)/2),
            "left": (($(window).width()-300)/2),
            "height": 356,
            "width": 320     
          }); 

          overlay_window.fadeIn('200', function(){                        
            $('div.modalwindow').fadeIn('300');   
          });          

          imageresize();

          next = $('#b-next');
          prev = $('#b-prev');

          $('div.modalwindow').on('mouseenter', function(){            
            if ((!alone_in_the_dark) && (show_arrows)) {
              next.fadeIn();
              prev.fadeIn();
            }
           });

          $('div.modalwindow').on('mouseleave', function(){            
            next.fadeOut();
            prev.fadeOut();
           });

          isnext = (current_num === links_count) ? 0 : 1;
          isprev = (current_num === 0) ? 0 : 1;

          if ((isnext === 0) && (isprev === 0)){
            alone_in_the_dark = true;
            next.hide();
            prev.hide();
          }else{
            alone_in_the_dark = false;
          }

          overlay_window.on('click', function(){
            closemodal();
          });

          $('#mclose').on('click', function(){
            closemodal();     
          });

          next.on('click', function(e){

              var nextimg, nextimg_src;

              e.preventDefault();

              isnext = (counter === links_count) ? 0 : 1;

              if (isnext === 0) {
                nextimg = all_modal_links.eq(0);                
                counter = 0;
              }else{
                counter++;
                nextimg = all_modal_links.eq(counter);
              }
              
              nextimg_src = nextimg.attr('href');
                title = nextimg.attr('title');
                  pushed_link = nextimg;

              if (!title) {title = 'Изображение';}              
              
              $('#modalimg').remove();

              next.hide();
              prev.hide();

              prev.after('<img id="modalimg" style="display:none;" src="'+nextimg_src+'" alt="'+title+'"/>');              
              $('div.modalheadtext').html(title);
              imageresize();
          });

          prev.on('click', function(e){

              var previmg, previmg_src;
              
              e.preventDefault();              

              isprev = (counter === 0) ? 0 : 1;

              if (isprev === 0) {
                previmg = all_modal_links.eq(links_count);                
                counter = links_count;
              }else{
                counter--;
                previmg = all_modal_links.eq(counter);
              }

              previmg_src = previmg.attr('href');
                    title = previmg.attr('title');
                      pushed_link = previmg;

              if (!title) {title = 'Изображение';}              
              
              $('#modalimg').remove();
              
              next.hide();
              prev.hide();

              prev.after('<img id="modalimg" style="display: none;" src="'+previmg_src+'" alt="'+title+'"/>');
              $('div.modalheadtext').html(title);
              
              imageresize();
          });

        });
    
})(jQuery);
