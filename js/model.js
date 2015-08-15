//////////////////////////////////////////////////////////////
//
// model.js
//
//////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
//
// Model():
//
// This class is used to create the model for the MVVC pattern.
// It will be solely location data, and 'locations' will be used
// as a static variable.
//
// static variable discussion:
// http://stackoverflow.com/questions/1535631/static-variables-in-javascript?lq=1
//
// Found 'foursquareid' by looking up the business in foursquare, and
// the id is the last part of the URL e.g.
// https://foursquare.com/v/aquarium-restaurant/4aede92ff964a52023d021e3
//
//////////////////////////////////////////////////////////////
function Model() {

    this.locations = [{
         "name1" : "South Shore Harbor Resort",
         "url" : "http://www.sshr.com",
         "category" : "hotel",
         "lat" : "29.545310",
         "lon" : "-95.065914",
         "idx" : 0,
         "foursquareid" : "4b763eb5f964a520fe442ee3",
         "marker" : ""
     }, {
         "name1" : "Armand Bayou Nature Center",
         "url" : "http://www.abnc.org",
         "category" : "nature",
         "lat" : "29.593904",
         "lon" : "-95.074970",
         "idx" : 1,
         "foursquareid" : "4afda3baf964a520622922e3",
         "marker" : ""
     }, {
         "name1" : "Space Center Houston",
         "url" : "http://www.spacecenter.org",
         "category" : "entertainment",
         "lat" : "29.550402",
         "lon" : "-95.097061",
         "idx" : 2,
         "foursquareid" : "51e8625e498e92c3bd720b6d",
         "marker" : ""
     }, {
         "name1" : "Aquarium Restaurant",
         "url" : "http://www.aquariumrestaurants.com/",
         "category" : "food",
         "lat" : "29.547349",
         "lon" : "-95.018525",
         "idx" : 3,
         "foursquareid" : "4aede92ff964a52023d021e3",
         "marker" : ""
     }, {
         "name1" : "Tookies Burgers",
         "url" : "http://www.tookiesburgers.com",
         "category" : "food",
         "lat" : "29.563658",
         "lon" : "-95.025204",
         "idx" : 4,
         "foursquareid" : "4dfa9f3f18386e743d95919b",
         "marker" : ""
     }, {
         "name1" : "Main Event Entertainment",
         "url" : "http://www.mainevent.com",
         "category" : "entertainment",
         "lat" : "29.524015",
         "lon" : "-95.122994",
         "idx" : 5,
         "foursquareid" : "4b6b4c20f964a52001ff2be3",
         "marker" : ""
     }
  ]; // locations
}
