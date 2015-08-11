var myCenter=new google.maps.LatLng(29.55464378,-95.06847382);

//http://www.mapcoordinates.net/en
// wikipedia has actual coordinates of landmarks, include galveston
var gLocations = [
	{ "name1": "Olive X", "category": "Thomas1", "lat": "29.54769989", "lon": "-95.01894951", "x1": 0 , marker: ""},
	{ "name1": "Red Lobster", "category": "Thomas2", "lat": "29.58002597", "lon": "-95.09748459", "x1": 1 , marker: "" },
	{ "name1": "Red Lobster3", "category": "Thomas3", "lat": "29.55972073", "lon": "-95.02298355", "x1": 2 , marker: "" },
	{ "name1": "foo", "category": "ddd", "lat": "29.53791791", "lon": "-95.05362511", "x1": 3 , marker: "" },
	{ "name1": "bar", "category": "eee", "lat": "29.53030075", "lon": "-95.04178047", "x1": 4 , marker: "" }
  ];

// populated when markers are generated below
//var gMarkersArray = [];

// popupwindow from info window
function myPopupFunction() {
    window.open('http://www.w3schools.com', '_blank', 'width=400, height=400');
};

function myFunctionX(idx) {
	//google.maps.event.trigger(gMarkersArray[idx], 'click');
	  google.maps.event.trigger(gLocations[idx].marker, 'click');
}



// create map and markers
function initializeMap()
{
	var infowindow = new google.maps.InfoWindow;

	var mapProp = {
	  center:myCenter,
	  zoom:12,
	  mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

	//var marker=new google.maps.Marker({
	//  position:myCenter,
	//});

	//var infowindow = new google.maps.InfoWindow({
	//  content:"Hello World!"
	//});

	//google.maps.event.addListener(marker, 'click', function() {
	//  infowindow.open(map,marker);
	//});

	var i;

	// create the map markers for each location
	for (i = 0; i < gLocations.length; i++) {
		marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(gLocations[i].lat, gLocations[i].lon),
			map: map
		});

		// live marker animation
		// https://developers.google.com/maps/documentation/javascript/examples/marker-animations
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			 return function() {
				if (marker.getAnimation() != null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);

					// don't let marker bounce indefinitely
					setTimeout(function () {
						marker.setAnimation(null);
					}, 2800);
				}
			 }
		})(marker, i));

		// popupwindow from info window
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			 return function() {
				var iws = "";
				iws += "<button onclick='myPopupFunction()'>Try it</button> " + i;

				infowindow.setContent(iws);
				infowindow.open(map, marker);
			 }
		})(marker, i));

		// save markers reference so we can manipulate them later
		//gMarkersArray.push(marker);

		gLocations[i].marker = marker;
	}
}

// initialize map on window load event
google.maps.event.addDomListener(window, 'load', initializeMap());









