/* Global variables */
var clicked = false



/*================*/
/* Event Handlers */
/*================*/

function mousemoveHandler(e) {
    e = e || window.event;

    eyeLookAt("robot-left-eye", e.pageX, e.pageY - window.scrollY);
	eyeLookAt("robot-right-eye", e.pageX, e.pageY - window.scrollY);
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

document.addEventListener('mousemove', mousemoveHandler);
document.addEventListener('click', clickHandler);
document.getElementById("robot-left-eye").addEventListener(
    "mouseover",
    function(){
        pupilContraction("robot-left-eye", 0.25)
    }
);
document.getElementById("robot-left-eye").addEventListener(
    "mouseout",
    function(){
        pupilContraction("robot-left-eye", 4)
    }
);
document.getElementById("robot-right-eye").addEventListener(
    "mouseover",
    function(){
        pupilContraction("robot-right-eye", 0.25)
    }
);
document.getElementById("robot-right-eye").addEventListener(
    "mouseout",
    function(){
        pupilContraction("robot-right-eye", 4)
    }
);


/*=====================*/
/* Animation Functions */
/*=====================*/

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
			if (zoom_factor >= 1) {
				current_pos = Math.min(current_pos + step, target_pos)
			} else {
				current_pos = Math.max(current_pos + step, target_pos)
			}
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

    // change the dom
	pupil.setAttribute("transform", "rotate(" + target_angle_sign * target_angle + ")");
	lid.setAttribute("transform", "rotate(" + target_angle_sign * target_angle + ")");
}

function pupilContraction(eye_id, contraction_factor){
	// INIT
	var eye = document.getElementById(eye_id);
	var pupil = eye.getElementsByClassName("pupil")[0];
	var pupil_radius = parseFloat(pupil.getAttribute("r")) -
					   parseFloat(pupil.getAttribute("stroke-width"))/2
	var iris_radius =  parseFloat(pupil.getAttribute("r")) +
					   parseFloat(pupil.getAttribute("stroke-width"))/2

	// new dimension
	var pupil_radius_new = pupil_radius * contraction_factor

	// translate new dimensions to parameters
	var stroke_width_new = iris_radius - pupil_radius_new
	var r_new = pupil_radius_new + stroke_width_new/2

	// change the dom
	pupil.setAttribute("r", r_new.toString())
	pupil.setAttribute("stroke-width", stroke_width_new.toString())
}