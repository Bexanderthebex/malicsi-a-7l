$(document).ready(function(){
	$("#signup").on('click', function(){
		$("#content-right").css("display", "none");
		$("#title-right").css("display", "");
		$("#content-left").css("display", "");
		$("#title-left").css("display", "none");
	});

	$("#signup-small").on('click', function(){
		$("#login-login").css("display", "none");
		$("#login-signup").css("display", "inline");
	});

	$("#backtologin").on('click', function(){
		$("#title-right").css("display", "none");
		$("#content-right").css("display", "");
		$("#content-left").css("display", "none");
		$("#title-left").css("display", "");
	});

	$("#backtologin-small").on('click', function(){
		$("#login-login").css("display", "inline");
		$("#login-signup").css("display", "none");
	});

	$('.datepicker').pickadate({
		format: 'yyyy-mm-dd',
		selectYears: 75,
		selectMonths: true
	});

	if ($(window).width() > 600){
	    $("#login-cards-small").css("display", "none");
	}else{
	    $("#login-cards-small").css("display", "inline");
	}

	$(window).resize(function() {
		if ($(window).width() > 600){
			console.log("bakit");
		    $("#login-cards-small").css("display", "none");
		}else{
			console.log("please lord");
		    $("#login-cards-small").css("display", "inline");
		}
	});

});
