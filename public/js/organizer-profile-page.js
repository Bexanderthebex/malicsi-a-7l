$(document).ready(function(){
    $('body').css('overflow', '');
    
    $('ul.tabs').tabs();

    // $('.slide').slick({
    //     infinite: true,
    //     slidesToShow: 2,
    //     slidesToScroll: 2,
    //     autoplay: true,
    //     rows: 2
    // });

    $('.tooltipped').tooltip();
    
    $('.modal').modal();

    $('#organizer-profile-edit').on('click', function() {
        $('#organizer-profile-edit-modal').openModal();
    });

    $('#organizer-profile-accept').on('click', function() {
        $('#organizer-profile-accept-modal').openModal();
    });

    $('#organizer-profile-decline').on('click', function() {
        $('#organizer-profile-decline-modal').openModal();
    });

    $('.datepicker').pickadate({
        format: 'yyyy-mm-dd'
    });
});
