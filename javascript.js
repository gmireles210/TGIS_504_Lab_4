/*THIS POPUP IS DRIVING ME CRAZY WITH THE AMOUNT I RELOAD (NOT LOCAL) SO I BLOCKED IT OUT. function(){
alert('Mario Time!');
}*/

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmZlcnJpIiwiYSI6ImNqbzA4amwzdzBiOWszdnFmbjRwcDAwbnAifQ.WGVeV7RnIWMf3DSZTXdwlQ';


var light   = L.tileLayer(mbUrl, {id: 'mapbox.light', maxZoom:18, attribution: mbAttr}),
	dark  = L.tileLayer(mbUrl, {id: 'mapbox.dark', maxZoom:18, attribution: mbAttr});

var map = L.map('map', {
	layers:[light]}).fitWorld(); 
var baseLayers = {
		"light": light,
		"dark": dark
	};
L.control.layers(baseLayers).addTo(map);

var currentTime = new Date().getHours()

if (7 <= currentTime && currentTime < 19){
	map.removeLayer(dark);
	map.addLayer(light);
}
else{
	map.removeLayer(light);
	map.addLayer(dark);
}

function onLocationFound(e) {
  var latlong = e.latlng
  var radius = e.accuracy / 2; 

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + "m" + " of this point. <br>" + latlong).openPopup();
  
  L.circle(e.latlng, radius).addTo(map); 

  if (radius < 30) {
      L.circle(e.latlng, radius, {color: 'blue'}).addTo(map);
  }
  else{
      L.circle(e.latlng, radius, {color: 'red'}).addTo(map);
  } 
}

function onLocationError(e) {
  alert(e.message);
}
//this function runs if the location is not found when the locate method is called. It produces an alert window that reports the error

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({
  setView: true, 
  maxZoom: 18, 
  timeout: 15000, 
  watch: false, 
}); 

var x = document.getElementById("demo");
//here we're basically testing to see if the browswer supports the Geolocation API or if it's an older browser that does not
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
	//if the browswer does support the Geolocation API, the code above enables one of two things to happen: showPosition or showError. These are functions that get defined below. 
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  //if the browswer doesn't support the Geolocation API, the code above sets the var x to return the text specified
}

//the showPosition function displays lat and long information based on the data provided by the API
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

//the showError function handles various error cases and returns the appropriate text to let the user know that an error has occured. 
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
