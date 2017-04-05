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
    $('#admin-admins-functions').toggle();
  });

  $('#admin-organizers-btn').on('click', function(){
    $('#admin-organizers-functions').toggle();
  });

  $('#admin-users-btn').on('click', function(){
    $('#admin-users-functions').toggle();
  });

  $('#admin-logs-btn').on('click', function(){
    $('#admin-logs-functions').toggle();
  });
});