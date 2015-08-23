//////////////////////////////////////////////////////////////
//
// viewmodel.js:
//
// This file will include theviewmodel.
//
//////////////////////////////////////////////////////////////
var viewModel = {};
viewModel.initializeVm = function(model) {
    var self = this;
    self.model_ = model;
    self.filterText = ko.observable("");
    self.placesArrayObs = ko.observableArray(self.model_.getLocations());
    self.selectMarker = function(item) {
        google.maps.event.trigger(self.model_.getOneLocation(item.idx).marker,
            'click');
    };
    self.SearchResults1 = ko.computed(function() {
      	var i1;
        console.log(self.model_.locations[0].marker);
        for (i1 = 0; i1 < self.model_.locations.length; i1++) {
            self.model_.locations[i1].marker.setVisible(false);
        }
        return ko.utils.arrayFilter(self.placesArrayObs(), function(
            item) {
            var filter = self.filterText().toLowerCase();
            for (i1 = 0; i1 < self.model_.locations.length; i1++) {
                if (stringStartsWith(self.model_.locations[
                    i1].name1.toLowerCase(), filter)) {
                    self.model_.locations[i1].marker.setVisible(
                        true);
                }
            }
            return stringStartsWith(item.name1.toLowerCase(),
                filter);
        });
    });
};

/////////////////////////////////////////////////////////////
// utility function used to compare filter string to search text
// 'stringStartsWith' is a deprecated method in knockout
// http://stackoverflow.com/questions/17557789/using-contains-instead-of-stringstartswith-knockout-js
//////////////////////////////////////////////////////////////
stringStartsWith = function(string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length) return false;
    return string.substring(0, startsWith.length) === startsWith;
};
