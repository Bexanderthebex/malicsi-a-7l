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

    $('#visited-competitor-profile-edit').on('click', function() {
        $('#visited-competitor-profile-edit-modal').openModal();
    });

    $('#visited-competitor-profile-accept').on('click', function() {
        $('#visited-competitor-profile-accept-modal').openModal();
    });

    $('#visited-competitor-profile-decline').on('click', function() {
        $('#visited-competitor-profile-decline-modal').openModal();
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
    $('.game-desc').css('height', $(".visited-competitor-game-img").height());
    $('.game-desc').css('width', $(".visited-competitor-game-img").width());

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
