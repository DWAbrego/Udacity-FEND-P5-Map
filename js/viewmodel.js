//////////////////////////////////////////////////////////////
//
// Daniel Abrego
// Udacity FEND P5 Map Application
//
// viewmodel.js:
//  This file will contain definitions for the viewmodel.
//
//////////////////////////////////////////////////////////////

var viewModel = {};

////////////////////////////////////////////////////////////////
//
// initializeVm()
//
//////////////////////////////////////////////////////////////
viewModel.initializeVm = function(model) {
    var self = this;
    self.model_ = model;

	// this will be the filter text field
    self.filterText = ko.observable("");

	// this observable will be the locations from the model
    self.placesArrayObs = ko.observableArray(self.model_.getLocations());

	// this will add a click binding to th <li> elements which is the list of filterable locations
    self.selectMarker = function(item) {
        google.maps.event.trigger(self.model_.getOneLocation(item.idx).marker,
            'click');
    };

	// bind the <ul> in the html to this search function
    self.SearchResults1 = ko.computed(function() {
      	var i1;

		// first make all markers invisible
        for (i1 = 0; i1 < self.model_.locations.length; i1++) {
            self.model_.locations[i1].marker.setVisible(false);
        }

		// now filter the markers based on name
        return ko.utils.arrayFilter(self.placesArrayObs(), function(
            item) {
            var filter = self.filterText().toLowerCase();
            for (i1 = 0; i1 < self.model_.locations.length; i1++) {
                if (stringStartsWith(self.model_.locations[i1].name1.toLowerCase(), filter)) {
                    self.model_.locations[i1].marker.setVisible(
                        true);
                }
            }
            return stringStartsWith(item.name1.toLowerCase(),
                filter);
        });
    });  // self.SearchResults1
}; // viewModel.initializeVm

/////////////////////////////////////////////////////////////
//
// This is a utility function used to compare the actual location
// name to the text typed in the filter input text box.
//
// Note 'stringStartsWith' is a deprecated method in knockout,
// but this article provided a simple replacement.
// http://stackoverflow.com/questions/17557789/using-contains-instead-of-stringstartswith-knockout-js
//
//////////////////////////////////////////////////////////////
stringStartsWith = function(string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length) return false;
    return string.substring(0, startsWith.length) === startsWith;
};
