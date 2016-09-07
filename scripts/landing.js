var animatePoints = function(){
	var points = document.getElementsByClassName('point');
	
	//animate all class names with point class
	var revealPoint = function(index) {
		for (i=0; i < points.length; i++) {
			points[i].style.opacity = 1;
			points[i].style.transform = "scaleX(1) translateY(0)";
			points[i].style.msTransform = "scaleX(1) translateY(0)";
			points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
		}
	};

	revealPoint();

	window.onload = function() {
		window.addEventListener('scroll', function(event){
			console.log(event);
		});
	}
};