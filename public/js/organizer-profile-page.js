$(document).ready(function(){
    $('ul.tabs').tabs();

    $('.slide').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        rows: 2
    });
    
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
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('.tooltipped').tooltip();
});
