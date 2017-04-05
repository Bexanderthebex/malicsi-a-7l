$(document).ready(function(){
    $('body').css('overflow', '');
    
    $('.desc').on({
        mouseover: function() {
            $(this).find('span').fadeIn(200);
        },
        mouseout: function() {
            $(this).find('span').stop().fadeOut(200);
        },
    });

    $('.slider5').bxSlider({
        slideWidth: 250,
        minSlides: 2,
        maxSlides: 2,
        moveSlides: 2,
        slideMargin: 6,
        auto: false
    });

    $('.slider4').bxSlider({
        // slideWidth: 200,
        minSlides: 0,
        maxSlides: 1,
        moveSlides: 2,
        slideMargin: 6,
        auto: true
    });

    $('span').css('height', $(".pic").height());
    $('span').css('width', $(".pic").width());

    $('.modal-trigger').on('click', function() {
        $('#modal1').openModal();
    });

    $('.modal').modal();
});
