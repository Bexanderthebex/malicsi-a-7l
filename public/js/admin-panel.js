$(document).ready(function(){
  $('.tooltipped').tooltip({delay: 20});
  var sideOpen = true;

  //resize just happened, pixels changed
  if ( $(window).width() > 982) {
    sideOpen = true;
    $(".admin-fixed-sidebar").css("display", "block");
    $("#admin-sidenav-trigger").css("visibility", "hidden");
  } 
  else if ($(window).width() > 600){
    $("#admin-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
    $("#admin-sidenav-trigger").css("visibility", "visible");
  }else{
    $("#admin-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
    $("#admin-sidenav-trigger").css("visibility", "visible");
    // $(".admin-fixed-sidebar").css("display", "none");
  }

  $(window).resize(function() {
    if ( $(window).width() > 982) {
      sideOpen = true;
      $(".admin-fixed-sidebar").css("display", "block");
      $("#admin-sidenav-trigger").css("visibility", "hidden");
    } 
    else if ($(window).width() > 600){
      $("#admin-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
      $("#admin-sidenav-trigger").css("visibility", "visible");
    }else{
      $("#admin-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
      $("#admin-sidenav-trigger").css("visibility", "visible");
      // $(".admin-fixed-sidebar").css("display", "none");
    }
    
  });

  $("#admin-sidenav-trigger").on('click', function(){
    if(sideOpen){
      $(".admin-fixed-sidebar").css("display", "none");
      $("#admin-sidenav-trigger, #close-open-sidenav").css("display", "inline");
      $("#admin-sidenav-trigger").removeClass("offset-m6").removeClass("offset-s7");
      sideOpen = false;
    }else{
      $(".admin-fixed-sidebar").css("display", "block");
      $("#admin-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
      $("#admin-sidenav-trigger, #close-open-sidenav").css("display", "inline");
      sideOpen = true;
    }
  });


  // initializing all forms as disabled

  // $('.admin-form-edit').attr('disabled', 'disabled');

  $("#admin-admins-btn").mouseover(function() {
      $(this).css("background","#00719c");
  });

  $("#admin-organizers-btn, #admin-users-btn, #admin-logs-btn, #admin-spon-btn, #admin-orgs-btn").mouseover(function() {
      $(this).css("background","#00415a");
  }).mouseout(function() {
      $(this).css("background","transparent");
  });

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

  $('#admin-proceed-btn').on('click', function(){
    // showing off proper card on view panel
    $('#admin-verify-first').css('display', 'none');
    $('#admin-verify-second').css('display', 'block');
    
  });

  $('#admin-admins-btn').on('click', function(){
    // showing off proper card on view panel
    $('#admin-adminscrud').css('display', 'inline');
    $('#admin-organizerscrud').css('display', 'none');
    $('#admin-userscrud').css('display', 'none');
    $('#admin-logsview').css('display', 'none');
    $('#admin-sponsview').css('display', 'none');
    $('#admin-orgscrud').css('display', 'none');

    // changing hover property of unselected buttons
    $("#admin-organizers-btn, #admin-users-btn, #admin-logs-btn, #admin-spon-btn, #admin-orgs-btn").mouseover(function() {
        $(this).css("background","#00415a");
    }).mouseout(function() {
        $(this).css("background","transparent");
    });

    // setting own hover property to not change
    $("#admin-admins-btn").mouseover(function() {
      $(this).css("background","#00719c");
    }).mouseout(function() {
      $(this).css("background","#00719c");
    });

    // setting background property of unselected buttons
    $('#admin-admins-btn').css('background', '#00719c');
    $('#admin-organizers-btn').css('background', 'transparent');
    $('#admin-users-btn').css('background', 'transparent');
    $('#admin-logs-btn').css('background', 'transparent');
    $('#admin-spon-btn').css('background', 'transparent');
    $('#admin-orgs-btn').css('background', 'transparent');


  });

  $('#admin-organizers-btn').on('click', function(){
    $('#admin-adminscrud').css('display', 'none');
    $('#admin-organizerscrud').css('display', 'inline');
    $('#admin-userscrud').css('display', 'none');
    $('#admin-logsview').css('display', 'none');
    $('#admin-sponsview').css('display', 'none');
    $('#admin-orgscrud').css('display', 'none');

    // changing hover property of unselected buttons
    $("#admin-admins-btn, #admin-users-btn, #admin-logs-btn, #admin-spon-btn, #admin-orgs-btn").mouseover(function() {
        $(this).css("background","#00415a");
    }).mouseout(function() {
        $(this).css("background","transparent");
    });

    // setting own hover property to not change
    $("#admin-organizers-btn").mouseover(function() {
      $(this).css("background","#00719c");
    }).mouseout(function() {
      $(this).css("background","#00719c");
    });

    // setting background property of unselected buttons
    $('#admin-admins-btn').css('background', 'transparent');
    $('#admin-organizers-btn').css('background', '#00719c');
    $('#admin-users-btn').css('background', 'transparent');
    $('#admin-logs-btn').css('background', 'transparent');
    $('#admin-spon-btn').css('background', 'transparent');
    $('#admin-orgs-btn').css('background', 'transparent');


  });

  $('#admin-users-btn').on('click', function(){
    $('#admin-adminscrud').css('display', 'none');
    $('#admin-organizerscrud').css('display', 'none');
    $('#admin-userscrud').css('display', 'inline');
    $('#admin-logsview').css('display', 'none');
    $('#admin-sponsview').css('display', 'none');
    $('#admin-orgscrud').css('display', 'none');

    // changing hover property of unselected buttons
    $("#admin-organizers-btn, #admin-admins-btn, #admin-logs-btn, #admin-spon-btn, #admin-orgs-btn ").mouseover(function() {
        $(this).css("background","#00415a");
    }).mouseout(function() {
        $(this).css("background","transparent");
    });

    // setting own hover property to not change
    $("#admin-users-btn").mouseover(function() {
      $(this).css("background","#00719c");
    }).mouseout(function() {
      $(this).css("background","#00719c");
    });

    $('#admin-admins-btn').css('background', 'transparent');
    $('#admin-organizers-btn').css('background', 'transparent');
    $('#admin-users-btn').css('background', '#00719c');
    $('#admin-logs-btn').css('background', 'transparent');
    $('#admin-spon-btn').css('background', 'transparent');
    $('#admin-orgs-btn').css('background', 'transparent');


  });

  $('#admin-logs-btn').on('click', function(){
    $('#admin-adminscrud').css('display', 'none');
    $('#admin-organizerscrud').css('display', 'none');
    $('#admin-userscrud').css('display', 'none');
    $('#admin-logsview').css('display', 'inline');
    $('#admin-sponsview').css('display', 'none');
    $('#admin-orgscrud').css('display', 'none');

    $("#admin-organizers-btn, #admin-admins-btn, #admin-users-btn, #admin-spon-btn, #admin-orgs-btn").mouseover(function() {
        $(this).css("background","#00415a");
    }).mouseout(function() {
        $(this).css("background","transparent");
    });

    $("#admin-logs-btn").mouseover(function() {
      $(this).css("background","#00719c");
    }).mouseout(function() {
      $(this).css("background","#00719c");
    });

    $('#admin-admins-btn').css('background', 'transparent');
    $('#admin-organizers-btn').css('background', 'transparent');
    $('#admin-users-btn').css('background', 'transparent');
    $('#admin-logs-btn').css('background', '#00719c');
    $('#admin-spon-btn').css('background', 'transparent');
    $('#admin-orgs-btn').css('background', 'transparent');


  });

  $('#admin-spon-btn').on('click', function(){
    $('#admin-adminscrud').css('display', 'none');
    $('#admin-organizerscrud').css('display', 'none');
    $('#admin-userscrud').css('display', 'none');
    $('#admin-logsview').css('display', 'none');
    $('#admin-sponsview').css('display', 'inline');
    $('#admin-orgscrud').css('display', 'none');

    $("#admin-organizers-btn, #admin-admins-btn, #admin-logs-btn, #admin-users-btn, #admin-orgs-btn").mouseover(function() {
        $(this).css("background","#00415a");
    }).mouseout(function() {
        $(this).css("background","transparent");
    });

    $("#admin-spon-btn").mouseover(function() {
      $(this).css("background","#00719c");
    }).mouseout(function() {
      $(this).css("background","#00719c");
    });

    $('#admin-admins-btn').css('background', 'transparent');
    $('#admin-organizers-btn').css('background', 'transparent');
    $('#admin-users-btn').css('background', 'transparent');
    $('#admin-logs-btn').css('background', 'transparent');
    $('#admin-spon-btn').css('background', '#00719c');
    $('#admin-orgs-btn').css('background', 'transparent');

  });

  $('#admin-orgs-btn').on('click', function(){
    $('#admin-adminscrud').css('display', 'none');
    $('#admin-organizerscrud').css('display', 'none');
    $('#admin-userscrud').css('display', 'none');
    $('#admin-logsview').css('display', 'none');
    $('#admin-sponsview').css('display', 'none');
    $('#admin-orgscrud').css('display', 'inline');

    $("#admin-organizers-btn, #admin-admins-btn, #admin-logs-btn, #admin-users-btn, #admin-spon-btn").mouseover(function() {
        $(this).css("background","#00415a");
    }).mouseout(function() {
        $(this).css("background","transparent");
    });

    $("#admin-orgs-btn").mouseover(function() {
      $(this).css("background","#00719c");
    }).mouseout(function() {
      $(this).css("background","#00719c");
    });

    $('#admin-admins-btn').css('background', 'transparent');
    $('#admin-organizers-btn').css('background', 'transparent');
    $('#admin-users-btn').css('background', 'transparent');
    $('#admin-logs-btn').css('background', 'transparent');
    $('#admin-spon-btn').css('background', 'transparent');
    $('#admin-orgs-btn').css('background', '#00719c');

  });


  // $('.admin-form-edit').attr('disabled', 'disabled');
  $('.admin-form-edit').prop('disabled', true);

  $('#datepicker1').pickadate({
    format: 'yyyy-mm-dd',
    selectMonths: true,
    selectYears: true
  });

  $('#datepicker2').pickadate({
    format: 'yyyy-mm-dd',
    selectMonths: true,
    selectYears: true
  });
  $(".table-width").tableHeadFixer({"head" : false, "left" : 1});

});
