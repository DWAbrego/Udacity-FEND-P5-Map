//////////////////////////////////////////////////////////////
//
// viewmodel.js:
//
// This file will include the model and viewmodel.
//
//////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
//
// Model():
//
// This class is used to create the model for the MVVC pattern.
// It will be solely location data.
//
//////////////////////////////////////////////////////////////
var Model = function () {
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
  ]; // locations
} // Model()

//////////////////////////////////////////////////////////////
//
//  viewModel():
//
//  This class will create the view model for the MVVC pattern.
//  - create google maps object
//  - create map markers
//  - apply knockout bindings to html elements to create a filterable list
//    that shows and hides map markers and list elements based on
//    values in a text box
//
//////////////////////////////////////////////////////////////
var viewModel = function () {
  var self = this;

  // store reference to our model
  var model = new Model();

  // create a map wrapper object to perform operations on our map
  var mapAppObj = new MapAppObj(model.locations);

  // initialize map on window load event
  google.maps.event.addDomListener(window, 'load', mapAppObj.initializeMap());

  self.filterText = ko.observable("");

  self.placesArrayObs = ko.observableArray(model.locations);

  // this will simply reset the map
  self.initializeMapVm = function () {
    mapAppObj.initializeMap();
  }


  // this function will animate the marker that corresponds with the item (from the filter search) that was pressed
  self.selectMarker = function (item) {
      console.log(item.idx);
      mapAppObj.triggerMarker(item.idx);
  }

  // utility function used to compare filter string to search text
  // http://stackoverflow.com/questions/17557789/using-contains-instead-of-stringstartswith-knockout-js
  self.stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
      return false;
    return string.substring(0, startsWith.length) === startsWith;
  }

  self.SearchResults1 = ko.computed(function () {

    // first hide all markers (markers stored in map.js)
    for (i1 = 0; i1 < model.locationslength; i1++) {
      model.locations[i1].marker.setVisible(false);
    }

    return ko.utils.arrayFilter(self.placesArrayObs(), function (item) {
      // match marker here
      // then set visibility of pin  pin.marker.setVisible(match);

      var filter = self.filterText().toLowerCase();

      // only show markers that have a name that matches the filter text box
      for (i1 = 0; i1 < model.locations.length; i1++) {
        if (self.stringStartsWith(model.locations[i1].name1.toLowerCase(), filter)) {
          model.locations[i1].marker.setVisible(true);
        }
      }

      return self.stringStartsWith(item.name1.toLowerCase(), filter);
    });
  });
}; // viewModel


//////////////////////////////////////////////////////////////
//
// Now apply knockout bindings here
//
//////////////////////////////////////////////////////////////
ko.applyBindings(new viewModel());

