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

    /*************************************************************
        var chip = {
            tag: 'chip content',
            image: '', //optional
            id: 1, //optional
        };

        <div class="chips chips-autocomplete"></div>
        
        *************************************************

        var my_data = {
                "0":"Apple",
                "1":"Microsoft",
                "2":"Google"
        }

        var myConvertedData = {};

        $.each(my_data, function(index, value) {
            myConvertedData[value] = null;
        });

        $('.chips-autocomplete').material_chip({
            autocompleteData: myConvertedData
        });
    *************************************************************/

    $('.chips').material_chip();
    $('.chips-autocomplete').material_chip({
        autocompleteOptions: {
            data: {
                'Jane Doe': null,
                'Jean Doe': null,
                'Joan Doe': null
            },
            limit: Infinity,
            minLength: 1
        }
    });
});
