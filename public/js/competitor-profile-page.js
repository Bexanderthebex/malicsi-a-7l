$(document).ready(function(){
	$('.modal-trigger').on('click', function() {
        $('#edit-profile-modal').openModal();
    });
    $('.modal').modal();
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
    $('.datepicker').pickdate({
    	selectMonths: true,
    	selectYears: 20
    })
	$('.chips').material_chip();
});