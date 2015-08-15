//////////////////////////////////////////////////////////////
//
// viewmodel.js:
//
// This file will include the model and viewmodel.
//
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
//
//
//
//////////////////////////////////////////////////////////////

// store reference to our model
var model = new Model();

// create a map wrapper object to perform operations on our map
var mapAppObj = new MapAppObj();


//////////////////////////////////////////////////////////////
//
//  viewModel():
//
//  This class will create the view model for the MVVC pattern.
//  Expects an array of location objects in parameter 'locations.'
//
//  This class will
//  - create google maps object
//  - create map markers
//  - apply knockout bindings to html elements to create a filterable list
//    that shows and hides map markers and list elements based on
//    values in a text box
//
//////////////////////////////////////////////////////////////
var viewModel = function (model) {
  var self = this;
//console.log(model.locations);
  // initialize map on window load event
  //google.maps.event.addDomListener(window, 'load', mapAppObj.initializeMap(model));

  self.loadMessage1="";

  // this is the filter text box
  self.filterText = ko.observable("");

  // take list of locations (which is a javascript array of objects) and make it a ko observable
  self.placesArrayObs = ko.observableArray(model.locations);

  // this is simply a convenience function to reset the map, reset button
  self.initializeMapVm = function () {
    mapAppObj.initializeMap(model);
  }

  // this function will animate the marker that corresponds with the item (from the filter search) that was pressed
  self.selectMarker = function (item) {
	//console.log("viewmodel triggermarker " + item.idx);
      mapAppObj.triggerMarker(item.idx);
  }

  // utility function used to compare filter string to search text
  // 'stringStartsWith' is a deprecated method in knockout
  // http://stackoverflow.com/questions/17557789/using-contains-instead-of-stringstartswith-knockout-js
  self.stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
      return false;
    return string.substring(0, startsWith.length) === startsWith;
  }

  self.SearchResults1 = ko.computed(function () {
    // first hide all markers (markers stored in map.js)
    for (i1 = 0; i1 < model.locations.length; i1++) {
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
// Google maps is loading async, so give it time before
// loading ko bindings
//
//////////////////////////////////////////////////////////////

if (window.google && google.maps) {
}
else {	
	setTimeout( function() { 
		//console.log(google);
		ko.applyBindings(new viewModel(model)); 
		}, 300
	);
}
            


