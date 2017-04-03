$(document).ready(function () {
	$('.slider').slider({
    	height: 490,				// adjust height
    	full_width: false,
    	interval: 7000,			
    	indicators: true			// set to false to disable circle pagers
  	});

	// // nav-arrows
	// $('.next').click(function() {
	//  	$('.slider').slider('next');
	// });
	
	// $('.prev').click(function() {
	//  	$('.slider').slider('prev');
	// })
});
