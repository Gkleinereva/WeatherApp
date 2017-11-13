$(document).ready(function() {
	console.log("Hello World");
	getLocData();
});

function getLocData() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayData);
	}
}

function displayData(position) {
	console.log(position);
}