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

    $('#create-game').on('click', function() {
        $('#create-game-modal').openModal();
    });

    $('#update-game').on('click', function() {
        $('#update-game-modal').openModal();
    });

    $('#delete-game').on('click', function() {
        $('#delete-game-modal').openModal();
    });

    $('#create-sports').on('click', function() {
        $('#create-sports-modal').openModal();
    });

    $('#update-sports').on('click', function() {
        $('#update-sports-modal').openModal();
    });

    $('#delete-sports').on('click', function() {
        $('#delete-sports-modal').openModal();
    });

    $('#create-match').on('click', function() {
        $('#create-match-modal').openModal();
    });

    $('#update-match').on('click', function() {
        $('#update-match-modal').openModal();
    });

    $('#delete-match').on('click', function() {
        $('#delete-match-modal').openModal();
    });

    $('#create-org').on('click', function() {
        $('#create-org-modal').openModal();
    });

    $('#update-org').on('click', function() {
        $('#update-org-modal').openModal();
    });

    $('#delete-org').on('click', function() {
        $('#delete-org-modal').openModal();
    });

    $('#invite-team').on('click', function() {
        $('#invite-modal').openModal();
    });
});
