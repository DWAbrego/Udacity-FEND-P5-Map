/////////////////////////////////////////////////////////////
// maps.js:
//////////////////////////////////////////////////////////////
var mapVm = {};
//////////////////////////////////////////////////////////////
//
// initializeMap():
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
    //map_ = new google.maps.Map(document.getElementById("googleMap"), mapProp);
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
    //console.log(this.map_);
    //console.log(map_);
    //console.log(this.map_ === map_);
    var locationsTemp = self.model_.getLocations();
    for (i = 0; i < locationsTemp.length; i++) {
        var marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(locationsTemp[i].lat,
                locationsTemp[i].lon),
            map: mapxx
        });
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
            }
        })(marker, i));
        self.model_.setLocationsMarker(i, marker);
    }
}; // initializeMap()
//////////////////////////////////////////////////////////////
//
// loadFourSquare():
//
//
// https://api.foursquare.com/v2/venues/4b6b4c20f964a52001ff2be3?client_id=MXDSBUBGPVFDLPZDUR1RPY0QNSP2YZ0X0JPAJNXSZ23CG5CU&client_secret=30515VPS1GZBJJ1K134WBAA4ZGCUCZXWEEMLVJFTCH5C2FCG&v=20130815"
//
//////////////////////////////////////////////////////////////
mapVm.loadFourSquare = function(foursquareid, marker1) {
    var self = this;
    var vname = "";
    var vcount = "";
    var vHereNow = "";
    var vBanner = "";
    var marker = marker1;
    var url = "https://api.foursquare.com/v2/venues/" + foursquareid;
    url += "?client_id=MXDSBUBGPVFDLPZDUR1RPY0QNSP2YZ0X0JPAJNXSZ23CG5CU";
    url +=
        "&client_secret=30515VPS1GZBJJ1K134WBAA4ZGCUCZXWEEMLVJFTCH5C2FCG";
    url += "&v=20130815"; // version parameter
    // uncomment this to get url for ajax request (in case you need to see the json)
    //console.log(url);
    // set timeout warning in case foursquare is down
    var wTimeout = setTimeout(function() {
        self.statusMessage1_(
            "<h3> 4^2 failed to get foursquare resources </h3>"
        );
        console.log("failed to get foursquare resources");
    }, 8000);
    $.getJSON(url, function(data) {
        clearTimeout(wTimeout);
    }).done(function(data) {
        self.statusMessage1("4^2 loaded successfully");
        vname = "<h3>" + data.response.venue.name + "</h3>";
        vcount = "likes:" + data.response.venue.likes.count;
        vHereNow = "<br> here now: " + data.response.venue.hereNow.count;
        vBanner = "<br>No banner provided";
        if (!(typeof data.response.venue.page === 'undefined')) {
            if (!(typeof data.response.venue.page.pageInfo ===
                'undefined')) {
                if (!(typeof data.response.venue.page.pageInfo.banner ===
                    'undefined')) {
                    //console.log(data.response.venue.page.pageInfo.banner);
                    vBanner = "<br><div><img class='resize' src='" +
                        data.response.venue.page.pageInfo.banner +
                        "'></div>";
                }
            }
        }
        // https://foursquare.com/about/logos
        self.str1 =
            "<img src='https://playfoursquare.s3.amazonaws.com/press/2014/foursquare-icon-16x16.png'> <br>";
        self.str1 += vname + vcount + vHereNow + vBanner;
        self.infowindow_.setContent(self.str1);
        self.infowindow_.open(self.map_, marker);
    }).fail(function() {
        console.log("loadFourSquare error");
        self.statusMessage1("4^2 loaded error");
    }).always(function(data) {
        //console.log( "complete");
    });
}; // loadFourSquare()
