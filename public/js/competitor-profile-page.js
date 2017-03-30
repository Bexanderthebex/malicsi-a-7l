function nextSlide() {
	$(document).ready(function(){
		$('#carousel-next').carousel('next');
		$('#slider-next').slider('next');
	});	
}

function prevSlide() {
	$(document).ready(function(){
		$('#carousel-prev').carousel('prev');
		$('#slider-prev').slider('prev');
	});	
}

$(document).ready(function(){
	$('.slider').slider({
		indicators: false,
		height: 200
	});
	$('.carousel.carousel-slider').carousel({
		full_width: true
	});
});