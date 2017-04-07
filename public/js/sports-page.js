$(document).ready(function(){
    $('.tooltipped').tooltip();
    
    $('.modal').modal();

    $('#sports-ranking-view-all').on('click', function() {
        $('#rankings-view-all-modal').openModal();
    });

    $('.sports-match').on('click', function() {
        $('#match-edit-modal').openModal();
    });

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        format: 'yyyy-mm-dd'
    });

    $('.timepicker').pickatime({
        default: 'now',
        twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
        donetext: 'OK',
        autoclose: false,
        vibrate: true // vibrate the device when dragging clock hand
    });

    // make match player row editable
    // still not working
    $('.match-actions').on('click', function() {
        $('.match-actions').parent().find('.match-player').prop('contenteditable', true);
    });


    $('.set-winner').on('click', function(){
        $(this).css("color", "#00719c");
    });


});
