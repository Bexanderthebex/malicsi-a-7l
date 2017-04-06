$(document).ready(function(){
	$("#signup").on('click', function(){
		$("#login-panel").css("display", "none");
		$("#signup-panel").css("display", "inline");
	});

	$("#backtologin").on('click', function(){
		$("#login-panel").css("display", "inline");
		$("#signup-panel").css("display", "none");
	});

	$('.datepicker').pickadate({
		format: 'yyyy-mm-dd',
		selectMonths: true,
		selectYear: 120
	})
});
