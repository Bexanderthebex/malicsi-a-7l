$(document).ready(function() {
    $(window).resize(function() {
        var bodyheight = $(this).height() - 60;

        $(document).on('click', 'a', function(event){
            event.preventDefault();

            $('html, body, #mainHolder, #main').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
        });
        var $root = $('html, body, #mainHolder, #main');
        $('a').click(function() {
            $root.animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
            return false;
        });

        var x = $(this).scrollTop();
        if (x <= bodyheight) {
            $('#toTop').hide();
        }

        $(document).scroll(function() {
          var y = $(this).scrollTop();
          if (y > bodyheight) {
            $('#toTop:hidden').stop(true, true).fadeIn();
          } else if ($('#toTop').css('display') == 'none'){
            $('#toTop').stop(true, true).fadeOut();
          } else {
            $('#toTop').stop(true, true).fadeOut();
          }
        });
    }).resize();
});