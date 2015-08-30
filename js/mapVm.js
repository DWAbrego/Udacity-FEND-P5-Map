//////////////////////////////////////////////////////////////
//
// Daniel Abrego
// Udacity FEND P5 Map Application
//
// mapVM.js:
//  This file will contain the definitions for the maps viewmodel.
//
//////////////////////////////////////////////////////////////

var mapVm = {};

//////////////////////////////////////////////////////////////
//
// initializeMap():
//    This function is called in app.js to start off the creation
//    of the google map.  It assumes the maps API has been called,
//    and the div-id for the google map will be passed in the
//    parameter 'mapId.'
//
//    Parameter 'model' is simply a reference to the model
//    object for the application.
//
//////////////////////////////////////////////////////////////
mapVm.initializeMap = function(model, mapId) {
    this.statusMessage1 = ko.observable("");
    this.model_ = model;
	this.mapId_ = mapId;
	this.centerLat_ = 29.55464378;
	this.centerLon_ = -95.06847382;
    this.createMap();
    this.setMarkers();
};

//////////////////////////////////////////////////////////////
//
// createMap():
//    Create the map and infowindow using google API.  Store
//    them as class variables.
//
//////////////////////////////////////////////////////////////
mapVm.createMap = function() {
    var myCenter = new google.maps.LatLng(this.centerLat_, this.centerLon_);
    var mapProp = {
        center: myCenter,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map_ = new google.maps.Map(document.getElementById(this.mapId_),
        mapProp);
    this.infowindow_ = new google.maps.InfoWindow();
};

//////////////////////////////////////////////////////////////
//
// setMarkers():
//
//////////////////////////////////////////////////////////////
mapVm.setMarkers = function() {
    var self = this;
    var i;
    var mapxx = this.map_;

    // get reference to the model, the model stores references
    // to markers for manipulation later
    var locationsTemp = self.model_.getLocations();

    // for each location, create a reference to a marker
    // and set up some actions for when it is clicked
    for (i = 0; i < locationsTemp.length; i++) {
        // create marker animation
        var marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(locationsTemp[i].lat,
                locationsTemp[i].lon),
            map: mapxx
        });

        // add click event listener to do something when a marker is clicked
        // here we will animate it shortly, call foursquare api for some 3rd party
        // information, and then center the map on the clicked location
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                if (marker.getAnimation() != null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation
                        .BOUNCE);
                    setTimeout(function() {
                        marker.setAnimation(null);
                    }, 2800);
                }
                self.loadFourSquare(locationsTemp[i].foursquareid,
                    marker);

                // center map
                var center1 = new google.maps.LatLng(locationsTemp[i].lat, locationsTemp[i].lon);
                mapxx.panTo(center1);

            };
        })(marker, i));
        self.model_.setLocationsMarker(i, marker);
    }
}; // initializeMap()
//////////////////////////////////////////////////////////////
//
// loadFourSquare():
//   Call foursquare API and format some of the returned informatin
//   in the maps infowindow for a single marker.
//
//////////////////////////////////////////////////////////////
mapVm.loadFourSquare = function(foursquareid, marker1) {
    var self = this;
    var vname = "";
    var vcount = "";
    var vHereNow = "";
    var vBanner = "";
    var marker = marker1;

    var errStr1 = "<div class=\"alert alert-danger\">";
    errStr1 += "<strong>Error</strong> Unable to load Foursquare, check internet connectivity";
    errStr1 += "</div>";

    var url = "https://api.foursquare.com/v2/venues/" + foursquareid;
		url += "?client_id=MXDSBUBGPVFDLPZDUR1RPY0QNSP2YZ0X0JPAJNXSZ23CG5CU";
		url +=
		    "&client_secret=30515VPS1GZBJJ1K134WBAA4ZGCUCZXWEEMLVJFTCH5C2FCG";
		url += "&v=20130815"; // version parameter

    // uncomment this to get url for ajax request (in case you need to see the json)
    //console.log(url);

    // set timeout warning in case foursquare is down
    var wTimeout = setTimeout(function() {
        self.statusMessage1_(errStr1);
    }, 8000);
    $.getJSON(url, function(data) {
        clearTimeout(wTimeout);
    }).done(function(data) {
        self.statusMessage1("");
        vname = "<h3>" + data.response.venue.name + "</h3>";
        vcount = "likes:" + data.response.venue.likes.count;
        vHereNow = "<br> here now: " + data.response.venue.hereNow.count;
        vBanner = "<br>No banner provided";
        if (!(typeof data.response.venue.page === 'undefined')) {
            if (!(typeof data.response.venue.page.pageInfo ===
                'undefined')) {
                if (!(typeof data.response.venue.page.pageInfo.banner ===
                    'undefined')) {
                    vBanner = "<br><div><img class='resizeImg1' src='" +
                        data.response.venue.page.pageInfo.banner +
                        "'></div>";
                }
            }
        }

        // logo info was here https://foursquare.com/about/logos
        self.str1 =
            "<img src='https://playfoursquare.s3.amazonaws.com/press/2014/foursquare-icon-16x16.png'> <br>";
        self.str1 += vname + vcount + vHereNow + vBanner;
        self.infowindow_.setContent(self.str1);
        self.infowindow_.open(self.map_, marker);
    }).fail(function() {
        self.statusMessage1(errStr1);
    }).always(function(data) {
    });
}; // loadFourSquare()
