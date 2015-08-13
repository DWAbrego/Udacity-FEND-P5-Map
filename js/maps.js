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
// as a parameter and stores them for initializeMap().
//
//////////////////////////////////////////////////////////////
var MapAppObj = function (locationsx) {
  this.locations = locationsx;
  this.myCenter = new google.maps.LatLng(29.55464378, -95.06847382);
}  // MapAppObj


//////////////////////////////////////////////////////////////
//
// initializeMap():
//
// This function will create a google map, markers, and attach
// respective click events to the map and markers.
//
//////////////////////////////////////////////////////////////
MapAppObj.prototype.initializeMap = function() {
  var self=this;

  var infowindow = new google.maps.InfoWindow;

  var mapProp = {
      center : this.myCenter,
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
            iws += "<button onclick=\"" + clickStr + "\"> " + self.locations[i].name1 + "</button> ";
            console.log(iws);
            infowindow.setContent(iws);
            infowindow.open(map, marker);
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
	google.maps.event.trigger(this.locations[idx].marker, 'click');
} // triggerMarker()




