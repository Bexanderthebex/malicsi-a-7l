$(document).ready(function(){
	$("#signup").on('click', function(){
		$("#content-right").css("display", "none");
		$("#title-right").css("display", "");
		$("#content-left").css("display", "");
		$("#title-left").css("display", "none");
	});

	$("#backtologin").on('click', function(){
		$("#title-right").css("display", "none");
		$("#content-right").css("display", "");
		$("#content-left").css("display", "none");
		$("#title-left").css("display", "");
	});

	$('.datepicker').pickadate({
		format: 'yyyy-mm-dd',
		selectYears: 75,
		selectMonths: true
	});

});
