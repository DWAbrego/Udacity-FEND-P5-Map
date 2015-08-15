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
var MapAppObj = function () {
	$.getScript("http://maps.google.com/maps/api/js?key=AIzaSyCK6IbTDbfKibr9OE2CUuzyKprrSAJLqbE&callback=initializeMap")
	.done(function (script, textStatus) {            
		console.log("Google map script loaded successfully");
	})
	.fail(function (jqxhr, settings, ex) {
		console.log("Could not load Google Map script: " + jqxhr);
	});
}  // MapAppObj




//////////////////////////////////////////////////////////////
//
// 
//
//////////////////////////////////////////////////////////////

function initializeMap() {
	mapAppObj.initializeMap(model);
	console.log('init1');
}


    
    

//////////////////////////////////////////////////////////////
//
// initializeMap():
//
// This function will create a google map info window, markers, and attach
// respective click events to the map and markers.
//
//////////////////////////////////////////////////////////////
MapAppObj.prototype.initializeMap = function(model) {
  var self=this;







  this.myCenter = new google.maps.LatLng(29.55464378, -95.06847382);   
  var mapProp = {
      center : this.myCenter,
      zoom : 12,
      mapTypeId : google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  this.infowindow = new google.maps.InfoWindow;

  this.str1 = "123";
  
  
  
  
  
  
  
  
  //var infowindow = new google.maps.InfoWindow;

  var i;

  // create the map markers for each location
  for (i = 0; i < model.locations.length; i++) {
      marker = new google.maps.Marker({
          animation : google.maps.Animation.DROP,
          position : new google.maps.LatLng(model.locations[i].lat, model.locations[i].lon),
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

          loc = new google.maps.LatLng(model.locations[i].lat, model.locations[i].lon);

          // center the map at the lat/long of this marker
          //self.map.setCenter(loc);

          self.loadFourSquare(model.locations[i].foursquareid);
          //self.loadFourSquare(model);

          // now trigger the marker as if clicked
          //google.maps.event.trigger(model.locations[idx].marker, 'click');

          // and reset the info window
          self.infowindow.setContent("wqootx");
          self.infowindow.open(self.map, marker);


        }
      })(marker, i));

      // save markers reference so we can manipulate them later
      model.locations[i].marker = marker;
  }
} // initializeMap()






    
    
    
    
//////////////////////////////////////////////////////////////
//
// triggerMarker():
//
// This function is used to trigger the click event of a single
// map marker.  It will be bound by knockout framework to the
// select list in the html page (the list that is produced when a
// filter is applied).
//
//////////////////////////////////////////////////////////////
MapAppObj.prototype.triggerMarker = function(idx) {
	// now trigger the marker as if clicked
	google.maps.event.trigger(model.locations[idx].marker, 'click');
} // triggerMarker()



//////////////////////////////////////////////////////////////
//
// loadFourSquare():
//
// use this to see returned json https://jsonformatter.curiousconcept.com/
//
//////////////////////////////////////////////////////////////
MapAppObj.prototype.loadFourSquare = function(foursquareid) {
  var self=this;

  var url = "https://api.foursquare.com/v2/venues/" + foursquareid;
  url += "?client_id=MXDSBUBGPVFDLPZDUR1RPY0QNSP2YZ0X0JPAJNXSZ23CG5CU";
  url += "&client_secret=30515VPS1GZBJJ1K134WBAA4ZGCUCZXWEEMLVJFTCH5C2FCG";
  url += "&v=20130815";  // version parameter

  // set timeout warning in case foursquare is down
  var wTimeout = setTimeout(function() {
    console.log("failed to get foursquare resources");
  }, 8000);



  $.getJSON(
      url,
      function(data) {
         clearTimeout(wTimeout);
         //console.log(data.response.venue.name);
      }).done(function(data) {
        console.log( "gtJSON=" + data.response.venue.name );
        // data.response ? data.response : "";
        //self.str1 = data.response.venue.name;
      })
      .fail(function() {
        console.log( "error" );
      })
      .always(function(data) {
        //console.log( "complete");
    });

}


/*

http://stackoverflow.com/questions/1455870/jquery-wait-for-function-to-complete-to-continue-processing
7
down vote
Ajax already gives you a callback, you are supposed to use it:

function dostuff( data ) {
    for(var i = 0; i < data.length; i++) {
        // Do stuff with data
    }
};
$(document).ready( function() {
    $.getJSON( "/controller/method/", null, dostuff );
});
*/
