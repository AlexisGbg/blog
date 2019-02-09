function stp(post_id) {
	 var xhttp = new XMLHttpRequest();
 	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
      			document.getElementById("stp-count"+post_id).innerHTML = this.responseText;
			console.log("star counter updated")
    		}
  	};
  	xhttp.open("GET", post_id+"/star", true);
  	xhttp.send();
}
