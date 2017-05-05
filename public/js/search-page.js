$(document).ready(function(){
    $('body').css('overflow', '');
    $('#search-filter-btn').on('click', function() {
        $('.dropdown-button').dropdown('open');
    })
    $('.tooltipped').tooltip();
});