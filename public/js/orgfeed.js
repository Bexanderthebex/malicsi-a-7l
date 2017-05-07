$(document).ready(function(){
  $('.tooltipped').tooltip({delay: 20});
  var osideOpen = true;

  //resize just happened, pixels changed
  if ( $(window).width() > 982) {
    osideOpen = true;
    $("#orgfeed-sidebar").css("display", "block");
    $("#orgfeed-sidenav-trigger").css("visibility", "hidden");
  } 
  else if ($(window).width() > 600){
    if(osideOpen){
      $("#orgfeed-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
      $("#orgfeed-sidenav-trigger").css("visibility", "visible");
    }
  }else{
    if(osideOpen){
      $("#orgfeed-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
      $("#orgfeed-sidenav-trigger").css("visibility", "visible");
    }
    // $("#orgfeed-sidebar").css("display", "none");
  }

  $(window).resize(function() {
    if ( $(window).width() > 982) {
      osideOpen = true;      
      $("#orgfeed-sidebar").css("display", "block");
      $("#orgfeed-sidenav-trigger").css("visibility", "hidden");
    } 
    else if ($(window).width() > 600){
      if(osideOpen){
        $("#orgfeed-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
        $("#orgfeed-sidenav-trigger").css("visibility", "visible");
      }
    }else{
      if(osideOpen){
        $("#orgfeed-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
        $("#orgfeed-sidenav-trigger").css("visibility", "visible");
      }
      // $("#orgfeed-sidebar").css("display", "none");
    }
    
  });

  $("#orgfeed-sidenav-trigger").on('click', function(){
    if(osideOpen){
      $("#orgfeed-sidebar").css("display", "none");
      $("#orgfeed-sidenav-trigger, #orgfeed-close-open-sidenav").css("display", "inline");
      $("#orgfeed-sidenav-trigger").removeClass("offset-m6").removeClass("offset-s7");
      osideOpen = false;
    }else{
      $("#orgfeed-sidebar").css("display", "block");
      $("#orgfeed-sidenav-trigger").addClass("offset-m6").addClass("offset-s7");
      $("#orgfeed-sidenav-trigger, #orgfeed-close-open-sidenav").css("display", "inline");
      osideOpen = true;
    }
  });
});
