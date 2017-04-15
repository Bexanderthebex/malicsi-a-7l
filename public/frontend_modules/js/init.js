(function($){
	$(function(){
		$('button').on('click', function(){
			$(this).css('background', '#00719c');
		})

		$('.button-collapse').sideNav();
		$('.slider').slider();
		$(document).ready(function() {
			$('.modal').modal();
		});
		
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});		

		$(document).ready(function() {
			$('select').material_select();
		});

	}); // end of document ready
})(jQuery); // end of jQuery name space