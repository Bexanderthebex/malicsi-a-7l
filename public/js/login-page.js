$(document).ready(function(){
	$("#signup-panel").on('click', function(){
		console.log("ayaw pumasok");
		$("#login-panel").css("display", "none");
		$("#signup-panel").css("none", "display");
	})
});