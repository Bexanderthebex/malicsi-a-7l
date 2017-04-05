$(document).ready(function(){
	$("#signup").on('click', function(){
		$("#login-panel").css("display", "none");
		$("#signup-panel").css("display", "block");
	})

	$('.datepicker').pickadate({
		format: 'yyyy-mm-dd'
	})
});