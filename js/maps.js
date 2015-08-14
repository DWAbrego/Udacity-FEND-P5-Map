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

  var infowindow = new google.maps.InfoWindow;

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
            //console.log(self.locations[i].url);
            //iws += "<button onclick='myPopupFunction(\"" + self.locations[i].url + "\")'> " + self.locations[i].name1 + "</button> " + i;

            clickStr = "window.open('" + self.locations[i].url + "' , '_blank', 'width=400, height=400');";
            iws += "<button onclick=\"" + clickStr + "\"> " + self.locations[i].name1 + "</button> ";
            infowindow.setContent(iws);
            infowindow.open(this.map, marker);
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

// #####################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//loadYelp("pizza", this.locations[idx].lat, this.locations[idx].lon, 5 );
loadFourSquare();

  // now trigger the marker as if clicked
  google.maps.event.trigger(this.locations[idx].marker, 'click');
} // triggerMarker()





// kw=keyword
// rad = radius
function loadYelp(kw, lat, lon, rad) {
    var url = "http://api.yelp.com/business_review_search";
    url += "?ywsid=w9ZXbvm45Y76AHISpjoabg&num_biz_requested=10&term=" + kw;
    url += "&lat=" + lat + "&long=" + lon + "&radius=" + rad;
    url += "&callback=?";
  $.getJSON(url, function(x) {
    if (x.message.text == "OK") {
      if (x.businesses.length != 0) {
        var res = x.businesses;

        console.log(res);

        var allpts = [];
        for (var i = 0; i < res.length; i++) {
         //var place = res[i];
         //var thisloc = new mxn.LatLonPoint(place.latitude, place.longitude);
          //allpts.push(thisloc);
          //var html = "<strong>" + place.name + "</strong><br />" + place.address1;
          //html += "<br />" + place.city + ", " + place.state;
          // Create and add marker to the map
          //var mk = new mxn.Marker(thisloc);
          //mk.setInfoBubble(html);
          //mapstraction.addMarker(mk);
        }
       //mapstraction.centerAndZoomOnPoints(allpts);
      }
    }
  });
 }








// http://api.yelp.com/business_review_search?
//ywsid=w9ZXbvm45Y76AHISpjoabg&num_biz_requested=10&term=pizza&lat=29.563658&long=-95.025204&radius=5&callback=jQuery21405295965003315359_1439573946467&_=1439573946471

// https://www.yelp.com/developers/api_console
 function loadYelpBusiness(bid) {
    var url = "http://api.yelp.com/v2/phone_search/?phone=2812442100";

  $.getJSON(url, function(x) {
    if (x.message.text == "OK") {
      if (x.businesses.length != 0) {
        var res = x.businesses; 

        console.log(res);

        var allpts = [];
        for (var i = 0; i < res.length; i++) {
         //var place = res[i];
         //var thisloc = new mxn.LatLonPoint(place.latitude, place.longitude);
          //allpts.push(thisloc);
          //var html = "<strong>" + place.name + "</strong><br />" + place.address1;
          //html += "<br />" + place.city + ", " + place.state;
          // Create and add marker to the map
          //var mk = new mxn.Marker(thisloc);
          //mk.setInfoBubble(html);
          //mapstraction.addMarker(mk);
        }
       //mapstraction.centerAndZoomOnPoints(allpts);
      }
    }
  });
 }


// https://www.yelp.com/developers/documentation/v1/search_api
//https://github.com/Yelp/yelp-api/tree/master/v1/googlemaps_example
 function loadYelpBusiness3() {
    var url = "http://api.yelp.com/v2/phone_search/?phone=2812442100";
    url += "?ywsid=w9ZXbvm45Y76AHISpjoabg&num_biz_requested=10";
    url += "&callback=?";


    var wTimeout = setTimeout(function() {
      console.log("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
     url: url,
     dataType:"jsonP",
     success: function(response) {
       var articleList = response[1];

       for (var i1=0; i1<articleList.length; i1++) {
         articleStr = articleList[i1];
         var url = 'http://en.wikipedia.org/wiki/' + articleStr;
         //$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
       };

       clearTimeout(wTimeout);
     }
    });
}






/*
https://api.foursquare.com/v2/venues/search
  ?client_id=CLIENT_ID
  &client_secret=CLIENT_SECRET
  &v=20130815
  &ll=40.7,-74
  &query=sushi
*/

 function loadFourSquare() {
    var url = "https://api.foursquare.com/v2/venues/search";
    url += "?client_id=MXDSBUBGPVFDLPZDUR1RPY0QNSP2YZ0X0JPAJNXSZ23CG5CU";
    url += "&client_secret=30515VPS1GZBJJ1K134WBAA4ZGCUCZXWEEMLVJFTCH5C2FCG";
    url += "&v=20130815";
    url += "&ll=40.7,-74";
    url += "&query=sushi";


    var wTimeout = setTimeout(function() {
      console.log("failed to get wikipedia resources");
    }, 8000);


$.getJSON(url,
    function(data) {
        $.each(data.response.venues, function(i,venues){
			console.log(venues.name);            
			//content = '<p>' + venues.name + '</p>';
            //$(content).appendTo("#names");
       });
});


/*
    $.ajax({
     url: url,
     success: function(response) {
		console.log(response);
       var articleList = response[1];

       for (var i1=0; i1<articleList.length; i1++) {
         articleStr = articleList[i1];
         var url = 'http://en.wikipedia.org/wiki/' + articleStr;
         //$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
       };

       clearTimeout(wTimeout);
     }
    });
*/


}



















