/////////////////////////////////////////////////////////////
//
// maps.js:
//////////////////////////////////////////////////////////////

var MapVmAppObj = function (model) {
  var self = this;
  self.statusMessage1 = ko.observable("woot");
  self.str1 = "self.str1 xxx";

  self.initializeMapCBXX = function () {
	//mapAppObj.initializeMap(model);
	console.log('initializeMapCBXX');
  }

  self.mapLocations = model.getLocations();

  self.loadGoogleAPI = function () {
	$.getScript("http://maps.google.com/maps/api/js?key=AIzaSyCK6IbTDbfKibr9OE2CUuzyKprrSAJLqbE&callback=initializeMapCB")
	.done(function (script, textStatus) {
		console.log("Google map script loaded successfully");
		self.statusMessage1("Google map script loaded successfully");
	})
	.fail(function (jqxhr, settings, ex) {
		console.log("Could not load Google Map script: " + jqxhr);
		self.statusMessage1("Could not load Google Map script");
	});
  }  // loadGoogleAPI

} // MapVmAppObj()

/*
maybe in loadGoogleAPI, put up map loading animation, then in CB close the animation

*/

//////////////////////////////////////////////////////////////
//
// initializeMap():
//
//////////////////////////////////////////////////////////////
function initializeMapCB() {
	//mapAppObj.initializeMap(model);
	console.log('initializeMapCB');
}
//////////////////////////////////////////////////////////////
//
// initializeMap():
//
//////////////////////////////////////////////////////////////
MapVmAppObj.prototype.initializeMap = function() {
  var self=this;

  this.myCenter = new google.maps.LatLng(29.55464378, -95.06847382);
  var mapProp = {
      center : this.myCenter,
      zoom : 12,
      mapTypeId : google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  this.infowindow = new google.maps.InfoWindow;

  var i;

  var locationsTemp = self.mapLocations;
  for (i = 0; i < locationsTemp.length; i++) {
      marker = new google.maps.Marker({
          animation : google.maps.Animation.DROP,
          position : new google.maps.LatLng(self.mapLocations[i].lat, self.mapLocations[i].lon),
          map : this.map
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          if (marker.getAnimation() != null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);

            setTimeout(function () {
                marker.setAnimation(null);
            }, 2800);
          }

          //loc = new google.maps.LatLng(self.mapLocations[i].lat, self.mapLocations[i].lon);

          self.loadFourSquare(self.mapLocations[i].foursquareid, marker);
          //self.infowindow.setContent(self.str1);
          //self.infowindow.open(self.map, marker);

        }
      })(marker, i));

      model.setLocationsMarker(i, marker);

	  //self.marker = marker;	
  }
} // initializeMap()

//////////////////////////////////////////////////////////////
//
// loadFourSquare():
//
//
// https://api.foursquare.com/v2/venues/4b6b4c20f964a52001ff2be3?client_id=MXDSBUBGPVFDLPZDUR1RPY0QNSP2YZ0X0JPAJNXSZ23CG5CU&client_secret=30515VPS1GZBJJ1K134WBAA4ZGCUCZXWEEMLVJFTCH5C2FCG&v=20130815"
//
//////////////////////////////////////////////////////////////
MapVmAppObj.prototype.loadFourSquare = function(foursquareid, marker1) {
  var self=this;

  self.vname = "";
  self.vcount = "";
  self.vHereNow = "";
  self.vBanner = "";
  self.marker = marker1;

  var url = "https://api.foursquare.com/v2/venues/" + foursquareid;
  url += "?client_id=MXDSBUBGPVFDLPZDUR1RPY0QNSP2YZ0X0JPAJNXSZ23CG5CU";
  url += "&client_secret=30515VPS1GZBJJ1K134WBAA4ZGCUCZXWEEMLVJFTCH5C2FCG";
  url += "&v=20130815";  // version parameter

  // uncomment this to get url for ajax request (in case you need to see the json)
  //console.log(url);

  // set timeout warning in case foursquare is down
  var wTimeout = setTimeout(function() {
            self.statusMessage1("4^2 failed to get foursquare resources");
    console.log("failed to get foursquare resources");
  }, 8000);

  $.getJSON(
      url,
      function(data) {
         clearTimeout(wTimeout);
         //console.log(data.response.venue.name);
      }).done(function(data) {
        //console.log( "gtJSON=" + data.response.venue.name );
        //console.log(data.response.venue.description); //hereNow.count
        self.statusMessage1("4^2 loaded successfully");

        self.vname = "<h3>" + data.response.venue.name  + "</h3>";
        self.vcount = "likes:" + data.response.venue.likes.count;
        self.vHereNow = "<br> here now: " + data.response.venue.hereNow.count;
        self.vBanner = "<br>No banner provided";

        if (!(typeof data.response.venue.page === 'undefined')) {
          if (!(typeof data.response.venue.page.pageInfo === 'undefined')) {
            if (!(typeof data.response.venue.page.pageInfo.banner === 'undefined')) {
                //console.log(data.response.venue.page.pageInfo.banner);
                self.vBanner = "<br><div><img class='resize' src='" + data.response.venue.page.pageInfo.banner + "'></div>";
             }
          }
        }

		// https://foursquare.com/about/logos
        self.str1 =  "<img src='https://playfoursquare.s3.amazonaws.com/press/2014/foursquare-icon-16x16.png'> <br>";
		self.str1 += self.vname  + self.vcount + self.vHereNow + self.vBanner;

        self.infowindow.setContent(self.str1);
        self.infowindow.open(self.map, self.marker);

      })
      .fail(function() {
        console.log( "loadFourSquare error" );
        self.statusMessage1("4^2 loaded error");
      })
      .always(function(data) {
        //console.log( "complete");
    });
} // loadFourSquare()

