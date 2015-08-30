//////////////////////////////////////////////////////////////
//
// Daniel Abrego
// Udacity FEND P5 Map Application
//
// model.js :
//  This file will contain the definition for the model -
//  both data and get/set methods.
//
//////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
//
// Model(): constructor
//
//////////////////////////////////////////////////////////////
var model = {};

// data points
model.locations = [{
    "name1": "South Shore Harbor Resort",
    "url": "http://www.sshr.com",
    "lat": "29.545310",
    "lon": "-95.065914",
    "idx": 0,
    "foursquareid": "4b763eb5f964a520fe442ee3",
    "marker": ""
}, {
    "name1": "Armand Bayou Nature Center",
    "url": "http://www.abnc.org",
    "lat": "29.593904",
    "lon": "-95.074970",
    "idx": 1,
    "foursquareid": "4afda3baf964a520622922e3",
    "marker": ""
}, {
    "name1": "Space Center Houston",
    "url": "http://www.spacecenter.org",
    "lat": "29.550402",
    "lon": "-95.097061",
    "idx": 2,
    "foursquareid": "51e8625e498e92c3bd720b6d",
    "marker": ""
}, {
    "name1": "Aquarium Restaurant",
    "url": "http://www.aquariumrestaurants.com/",
    "lat": "29.547349",
    "lon": "-95.018525",
    "idx": 3,
    "foursquareid": "4aede92ff964a52023d021e3",
    "marker": ""
}, {
    "name1": "Tookies Burgers",
    "url": "http://www.tookiesburgers.com",
    "lat": "29.563658",
    "lon": "-95.025204",
    "idx": 4,
    "foursquareid": "4dfa9f3f18386e743d95919b",
    "marker": ""
}, {
    "name1": "Bubba Gump Shrimp Co",
    "url": "http://www.bubbagump.com/",
    "lat": "29.548099",
    "lon": "-95.018519",
    "idx": 5,
    "foursquareid": "4b3d7501f964a520749425e3",
    "marker": ""
}, {
    "name1": "Main Event Entertainment",
    "url": "http://www.mainevent.com",
    "lat": "29.524015",
    "lon": "-95.122994",
    "idx": 6,
    "foursquareid": "4b6b4c20f964a52001ff2be3",
    "marker": ""
}]; // locations


// functions to access and set data in the model
model.getLocations = function () {
    return this.locations;
};

model.getOneLocation = function (i1) {
    return this.locations[i1];
};

model.setLocationsMarker = function (i1, marker) {
    this.locations[i1].marker = marker;
};
