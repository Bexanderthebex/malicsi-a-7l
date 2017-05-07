$(document).ready(function() {
    $('.goToTop').hide();
     $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('.goToTop').fadeIn();
        } else {
            $('.goToTop').fadeOut();
        }
    });
    $('.goToTop').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
});