var MapAppObj = function () {
 this.locations = [{
		"name1" : "South Shore Harbor Resort",
		"url" : "http://www.sshr.com",
		"category" : "hotel",
		"lat" : "29.545310",
		"lon" : "-95.065914",
		"idx" : 0,
		marker : ""
	}, {
		"name1" : "Armand Bayou Nature Center",
		"url" : "http://www.abnc.org",
		"category" : "nature",
		"lat" : "29.593904",
		"lon" : "-95.074970",
		"idx" : 1,
		marker : ""
	}, {
		"name1" : "Space Center Houston",
		"url" : "http://www.spacecenter.org",
		"category" : "entertainment",
            "lat" : "29.550402",
		"lon" : "-95.097061",
		"idx" : 2,
		marker : ""
	}, {
		"name1" : "Kemah Boardwalk",
		"url" : "http://www.KemahBoardwalk.com",
		"category" : "entertainment",
		"lat" : "29.547349",
		"lon" : "-95.018525",
		"idx" : 3,
		marker : ""
	}, {
		"name1" : "Tookies Burgers",
		"url" : "http://www.tookiesburgers.com",
		"category" : "food",
		"lat" : "29.563658",
		"lon" : "-95.025204",
		"idx" : 4,
		marker : ""
	}, {
		"name1" : "Main Event Entertainment",
		"url" : "http://www.mainevent.com",
		"category" : "entertainment",
		"lat" : "29.524015",
		"lon" : "-95.122994",
		"idx" : 5,
		marker : ""
	}
  ];
}  // MapAppObj


// create map and markers
MapAppObj.prototype.initializeMap = function() {
    var self=this;

    var myCenter = new google.maps.LatLng(29.55464378, -95.06847382);

    var infowindow = new google.maps.InfoWindow;

    var mapProp = {
        center : myCenter,
        zoom : 12,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var i;

    // create the map markers for each location
    for (i = 0; i < self.locations.length; i++) {
        marker = new google.maps.Marker({
                animation : google.maps.Animation.DROP,
                position : new google.maps.LatLng(self.locations[i].lat, self.locations[i].lon),
                map : map
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
                    //console.log(self.locations[i].url);
                    //iws += "<button onclick='myPopupFunction(\"" + self.locations[i].url + "\")'> " + self.locations[i].name1 + "</button> " + i;

                    clickStr = "window.open('" + self.locations[i].url + "' , '_blank', 'width=400, height=400');";

                    console.log("clickstr=" + clickStr);
                    iws += "<button onclick=\"" + clickStr + "\"> " + self.locations[i].name1 + "</button> " + i;
                    console.log(iws);
                    infowindow.setContent(iws);
                    infowindow.open(map, marker);
                }
            })(marker, i));

        // save markers reference so we can manipulate them later
        self.locations[i].marker = marker;
    }
}

MapAppObj.prototype.triggerMarker = function(idx) {
	//google.maps.event.trigger(gMarkersArray[idx], 'click');
	google.maps.event.trigger(this.locations[idx].marker, 'click');
}

// this function will be called from a link in the marker infowindow
// it will popup the url passed to it in a small window
//function myPopupFunction(url1) {
	//window.open('http://www.w3schools.com', '_blank', 'width=400, height=400');
//	console.log("popupfunction " + url1);
	//window.open(url1, '_blank', 'width=400, height=400');
//};



var mapAppObj = new MapAppObj();

// initialize map on window load event
google.maps.event.addDomListener(window, 'load', mapAppObj.initializeMap());
