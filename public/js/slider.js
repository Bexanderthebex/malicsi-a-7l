$(document).ready(function () {
	$('.slider').slider({
    	height: 400,				// adjust height
    	full_width: true,
    	interval: 12000,			
    	indicators: true			// set to false to disable circle pagers
  	});

	// nav-arrows
	$('.next').click(function() {
	 	$('.slider').slider('next');
	});
	
	$('.prev').click(function() {
	 	$('.slider').slider('prev');
	})
});
