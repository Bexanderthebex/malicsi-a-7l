$(document).ready(function(){
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

  $('#admin-admins-btn').on('click', function(){
    $('#admin-adminscrud').css('display', 'inline');
    $('#admin-organizerscrud').css('display', 'none');
    $('#admin-userscrud').css('display', 'none');
    $('#admin-logsview').css('display', 'none');

    $('#admin-adminscrud').css('background', '#00719c');
    $('#admin-organizerscrud').css('background', 'transparent');
    $('#admin-userscrud').css('background', 'transparent');
    $('#admin-logsview').css('background', 'transparent');    
    // $('#admin-admins-functions').toggle();

  });

  $('#admin-organizers-btn').on('click', function(){
    // $('#admin-organizers-functions').toggle();
    $('#admin-adminscrud').css('display', 'none');
    $('#admin-organizerscrud').css('display', 'inline');
    $('#admin-userscrud').css('display', 'none');
    $('#admin-logsview').css('display', 'none');

    $('#admin-adminscrud').css('background', 'transparent');
    $('#admin-organizerscrud').css('background', '#00719c');
    $('#admin-userscrud').css('background', 'transparent');
    $('#admin-logsview').css('background', 'transparent');    
  });

  $('#admin-users-btn').on('click', function(){
    // $('#admin-users-functions').toggle();
    $('#admin-adminscrud').css('display', 'none');
    $('#admin-organizerscrud').css('display', 'none');
    $('#admin-userscrud').css('display', 'inline');
    $('#admin-logsview').css('display', 'none');

    $('#admin-adminscrud').css('background', 'transparent');
    $('#admin-organizerscrud').css('background', 'transparent');
    $('#admin-userscrud').css('background', '#00719c');
    $('#admin-logsview').css('background', 'transparent');    
  });

  $('#admin-logs-btn').on('click', function(){
    // $('#admin-logs-functions').toggle();
    $('#admin-adminscrud').css('display', 'none');
    $('#admin-organizerscrud').css('display', 'none');
    $('#admin-userscrud').css('display', 'none');
    $('#admin-logsview').css('display', 'inline');

    $('#admin-adminscrud').css('background', 'transparent');
    $('#admin-organizerscrud').css('background', 'transparent');
    $('#admin-userscrud').css('background', 'transparent');
    $('#admin-logsview').css('background', '#00719c');    
  });


});