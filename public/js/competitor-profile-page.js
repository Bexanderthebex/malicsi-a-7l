$(document).ready(function(){
    $('body').css('overflow', '');
    
    $('ul.tabs').tabs();

    $('.tooltipped').tooltip();
    
    $('.modal').modal();

    $(document).ready(function(){
        $('.collapsible').collapsible();
    });

    $('#competitor-profile-edit').on('click', function() {
        $('#competitor-profile-edit-modal').openModal();
    });

    $('#competitor-profile-accept').on('click', function() {
        $('#competitor-profile-accept-modal').openModal();
    });

    $('#competitor-profile-decline').on('click', function() {
        $('#competitor-profile-decline-modal').openModal();
    });

    $('.datepicker').pickadate({
        format: 'yyyy-mm-dd'
    });
    $('.game-item').on({
        mouseover: function() {
            $(this).find('.game-desc').fadeIn(200);
        },
        mouseout: function() {
            $(this).find('.game-desc').stop().fadeOut(200);
        },
    });

    $('.game-desc').css('height', $(".competitor-game-img").height());
    $('.game-desc').css('width', $(".competitor-game-img").width());

    $('.chips').material_chip();

    $('.chips').on('chip.delete', function(e, chip){ alert('This member will be removed.'); });
});
