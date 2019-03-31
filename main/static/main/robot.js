/* Global variables */
var clicked = false

/* Event Handler */
function mousemoveHandler(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;


    eyeLookAt("robot-left-eye", e.pageX, e.pageY);
	eyeLookAt("robot-right-eye", e.pageX, e.pageY);
	mouthLookAt("robot-mouth", e.pageX, 10);
}

function clickHandler(e) {
    e = e || window.event;

	clicked = !clicked
	if(clicked){
		eyeZoom("robot-left-eye", 3);
		eyeZoom("robot-right-eye", 3);
	} else {
		eyeZoom("robot-left-eye", 1/3);
		eyeZoom("robot-right-eye", 1/3);
	}
}

// attach handler to the click event of the document
if (document.attachEvent) {
	document.attachEvent('onmousemove', mousemoveHandler);
	document.addEventListener('click', clickHandler);
} else {
	document.addEventListener('mousemove', mousemoveHandler);
	document.addEventListener('click', clickHandler);
}



function eyeZoom(eye_id, zoom_factor) {
	// INIT
	var eye = document.getElementById(eye_id);
	var lid = eye.getElementsByClassName("lid")[0];
	var pupil = eye.getElementsByClassName("pupil")[0];
	var current_pos = parseInt(pupil.getAttribute("cx"));
	var target_pos = current_pos * zoom_factor
	var step = (target_pos - current_pos)/20
	// animation
	var id = setInterval(frame, 5);
	i = 0
	function frame() {
		if (current_pos == target_pos) {
		  clearInterval(id);
		} else {
		  current_pos = current_pos + step
		  lid_width_new = parseFloat(lid.getAttribute("width")) + step;
		  pupil.setAttribute("cx", current_pos.toString());
		  lid.setAttribute("width", lid_width_new.toString());
		}
	}
}

function eyeLookAt(eye_id, x_dom_coor, y_dom_coor) {
	// INIT
	var eye = document.getElementById(eye_id);
	var pupil = eye.getElementsByClassName("pupil")[0];
	var lid =   eye.getElementsByClassName("lid")[0];

	// Convert x and y into the eye coordinate system
	var pt = eye.createSVGPoint();
	pt.x = x_dom_coor;
	pt.y = y_dom_coor;
	var pt_new = pt.matrixTransform(eye.getScreenCTM().inverse());
	x = pt_new["x"]
	y = pt_new["y"]
	// Compute the angle
	var target_angle = Math.round(Math.acos(x/(Math.sqrt(Math.pow(x,2) + Math.pow(y, 2))))/(2*Math.PI)*360);
	var target_angle_sign = Math.sign(y);

	pupil.setAttribute("transform", "rotate(" + target_angle_sign * target_angle + ")");
	lid.setAttribute("transform", "rotate(" + target_angle_sign * target_angle + ")");
}


function mouthLookAt(mouth_id, x_dom_coor, shift_max) {
	// INIT
	var mouth = document.getElementById(mouth_id);
	var interior = mouth.getElementsByClassName("interior")[0];
	var outline =   mouth.getElementsByClassName("outline")[0];

	// Convert x and y into the mouth coordinate system
	var pt = mouth.createSVGPoint();
	pt.x = x_dom_coor;
	var pt_new = pt.matrixTransform(mouth.getScreenCTM().inverse());
	shift = shift_max * (1 / (1+Math.exp(-0.05*pt_new["x"])) - 1/2) - 40


	interior.setAttribute("x", shift.toString());
}


// HOVERING
// eyes
robot_left_eye = d3.select("#robot-left-eye")
robot_left_eye.on("mouseover", function() {
    robot_left_eye.select(".pupil")
		.transition()
		.attr("r", 15)
		.attr("stroke-width", 15)
		.attr("fill", "#b71f9e");
})
robot_left_eye.on("mouseout", function() {
    robot_left_eye.select(".pupil")
		.transition()
		.attr("r", 20)
		.attr("stroke-width", 5)
		.attr("fill", "#e07281");
})


robot_right_eye = d3.select("#robot-right-eye")
robot_right_eye.on("mouseover", function() {
    robot_right_eye.select(".pupil")
		.transition()
		.attr("r", 7.5)
		.attr("stroke-width", 10)
		.attr("fill", "#b71f9e");
})
robot_right_eye.on("mouseout", function() {
    robot_right_eye.select(".pupil")
		.transition()
		.attr("r", 10)
		.attr("stroke-width", 5)
		.attr("fill", "#e07281");
})