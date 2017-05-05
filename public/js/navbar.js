$(document).ready(function(){ $('.modal-trigger').leanModal(); });

$(document).ready(function(){
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

  $('.navbtns').on('click', function(){
    $('.navbtns').css('color', '#00719c');
    $(this).css('color', '#00b8ff');
    $('.modal').modal('close');
  });

    $('.button-collapse').sideNav({
        menuWidth: 250, // Default is 300
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
});