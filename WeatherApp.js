//Global flag to track the current temperature units
var celcius = true;

//Grabs/displays Location data as soon as the page is loaded
$(document).ready(function() {
	//call the changeUnits function whenever one of the units is clicked
	$(".unit").click(function() {
		changeUnits();
	});
	
	getLocData();
});

//Grabs user location data, then calls displayData to show it in the browser
function getLocData() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayData);
	}
}

//Parses geolocation data and passes lat/long coordinates to function that calls FCC API
function displayData(position) {
	getWeatherData(position.coords.longitude, position.coords.latitude);
}

//Calls FCC API with lat/long coordinates, then calls updateHTML to display weather
function getWeatherData(long,lat) {
	$.ajax({
		url: "https://fcc-weather-api.glitch.me/api/current",
		dataType: "json",
		type: "GET",
		data: {
			lon: long,
			lat: lat
		},
		success: function(weatherData) {
			updateWeatherData(weatherData);
		}
	});
}

//parses FCC return values and updates HTML elements
function updateWeatherData(weatherData) {
	$("#location").html(weatherData.name);
	$("#condition").html(weatherData.weather[0].main);
	$("#temp").html(weatherData.main.temp + " ");
	$("#low").html(weatherData.main.temp_min + " ");
	$("#high").html(weatherData.main.temp_max + " ");
	$("img").attr("src", weatherData.weather[0].icon);

	//now we're going to update our CSS to do the animation
	$("div").addClass("textClass");
	addImageCSS();
}

function changeUnits () {
	if (celcius == true) {
		$("#temp").html(cToF($("#temp").html()));
		$("#low").html(cToF($("#low").html()));
		$("#high").html(cToF($("#high").html()));
		$(".unit").html("&#8457");
	}
	else {
		$("#temp").html(fToC($("#temp").html()));
		$("#low").html(fToC($("#low").html()));
		$("#high").html(fToC($("#high").html()));
		$(".unit").html("&#8451");
	}
}

function cToF(cel) {
	celcius = false;
	return (cel*9.0/5.0 + 32.0).toFixed(2);
}

function fToC(fahr) {
	celcius = true;
	return ((fahr - 32.0)*5.0/9.0).toFixed(2);
}

//adds necessary CSS to the image to animate it
function addImageCSS() {
	$("img").css("left", $(window).width()-300);
	var sizeChange = "@keyframes sizeChange {";
	sizeChange += "100% {left: 0px}";
	document.styleSheets[0].insertRule(sizeChange);

	//adds imageClass to the image after we've added the animation rule
	$("img").addClass("imageClass");
}