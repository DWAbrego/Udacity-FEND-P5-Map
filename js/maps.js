/////////////////////////////////////////////////////////////
//
// maps.js:
//
// This file includes wrapper functions for google maps,
// and it encapsulates these functions into a single map object
//
/////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
//
// MapAppObj():
//
// Map object constructor.  Takes an array of location objects
// as a parameter and stores them for initializeMap().  This
// constructor will create and store the actual google map api object.
//
//////////////////////////////////////////////////////////////
var MapAppObj = function (locationsx) {
  this.locations = locationsx;
  this.myCenter = new google.maps.LatLng(29.55464378, -95.06847382);

  var mapProp = {
      center : this.myCenter,
      zoom : 12,
      mapTypeId : google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  this.infowindow = new google.maps.InfoWindow;
}  // MapAppObj


//////////////////////////////////////////////////////////////
//
// initializeMap():
//
// This function will create a google map info window, markers, and attach
// respective click events to the map and markers.
//
//////////////////////////////////////////////////////////////
MapAppObj.prototype.initializeMap = function() {
  var self=this;

  //var infowindow = new google.maps.InfoWindow;

  var i;

  // create the map markers for each location
  for (i = 0; i < self.locations.length; i++) {
      marker = new google.maps.Marker({
          animation : google.maps.Animation.DROP,
          position : new google.maps.LatLng(self.locations[i].lat, self.locations[i].lon),
          map : this.map
      });

      // this adds live marker animation when clicked, make it timeout after a few bounces
      // https://developers.google.com/maps/documentation/javascript/examples/marker-animations
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
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

      // adding the click listener for the marker's infowindow
      // on the marker's infowindow, create a button with a link to a popupwindow
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            var iws = "";
            clickStr = "window.open('" + self.locations[i].url + "' , '_blank', 'width=400, height=400');";
            iws += "<button onclick=\"" + clickStr + "\"> " + self.locations[i].name1 + "</button> ";
			loadFourSquare(self.locations[i].foursquareid);
            self.infowindow.setContent(iws);
            self.infowindow.open(this.map, marker);
          }
      })(marker, i));


      // save markers reference so we can manipulate them later
      self.locations[i].marker = marker;
  }
} // initializeMap()

//////////////////////////////////////////////////////////////
//
// triggerMarker():
//
// This function is used to trigger the click event on a single
// map marker.  It will be bound by knockout framework to the
// select list in the html page (the list that is produced when a
// filter is applied).
//
//////////////////////////////////////////////////////////////
MapAppObj.prototype.triggerMarker = function(idx) {
	loc = new google.maps.LatLng(this.locations[idx].lat, this.locations[idx].lon);

	// center the map at the lat/long of this marker
	this.map.setCenter(loc);

	loadFourSquare(this.locations[idx].foursquareid);

	// now trigger the marker as if clicked
	google.maps.event.trigger(this.locations[idx].marker, 'click');

	// and reset the info window
    this.infowindow.setContent("woot" + idx);
    this.infowindow.open(this.map, this.locations[idx].marker);

} // triggerMarker()



//////////////////////////////////////////////////////////////
//
// loadFourSquare():
//
// use this to see returned json https://jsonformatter.curiousconcept.com/
//
//////////////////////////////////////////////////////////////

 function loadFourSquare(foursquareid) {

	var url = "https://api.foursquare.com/v2/venues/" + foursquareid;
	url += "?client_id=MXDSBUBGPVFDLPZDUR1RPY0QNSP2YZ0X0JPAJNXSZ23CG5CU";
	url += "&client_secret=30515VPS1GZBJJ1K134WBAA4ZGCUCZXWEEMLVJFTCH5C2FCG";
	url += "&v=20130815";  // version parameter

	// set timeout warning in case foursquare is down
	var wTimeout = setTimeout(function() {
	  console.log("failed to get foursquare resources");
	}, 8000);


	var response =	$.getJSON(
		url,
		function(data) { 
		   clearTimeout(wTimeout);
	});

	response.complete(function() {
		//console.log( response );
		//console.log( response.responseText );

		var obj1 = JSON.parse(response.responseText);
		console.log(obj1.response.venue.likes.count);
		console.log(obj1.response.venue.hereNow.count);
		console.log(obj1.response.venue.hereNow.summary);

		if ( obj1.response.venue.page === undefined ) {
		  console.log("no banner provided");
		}
		else {
		  console.log(obj1.response.venue.page.pageInfo.banner);
		}
	});



}

