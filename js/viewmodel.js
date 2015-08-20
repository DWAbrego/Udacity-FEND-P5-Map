//////////////////////////////////////////////////////////////
//
// viewmodel.js:
//
// This file will include theviewmodel.
//
//////////////////////////////////////////////////////////////

var viewModel = function (model) {
  var self = this;
  self.model = model;
  self.filterText = ko.observable("");
  self.placesArrayObs = ko.observableArray(model.locations);

  self.selectMarker = function (item) {
	google.maps.event.trigger(model.getOneLocation(item.idx).marker, 'click');
  }

  self.SearchResults1 = ko.computed(function () {
    for (i1 = 0; i1 < model.locations.length; i1++) {
      model.locations[i1].marker.setVisible(false);
    }

    return ko.utils.arrayFilter(self.placesArrayObs(), function (item) {
      var filter = self.filterText().toLowerCase();
      for (i1 = 0; i1 < model.locations.length; i1++) {
        if (stringStartsWith(model.locations[i1].name1.toLowerCase(), filter)) {
			model.locations[i1].marker.setVisible(true);
        }
      }
      return stringStartsWith(item.name1.toLowerCase(), filter);
    });
  }); // SearchResults1
}; // viewModel


//////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////
stringStartsWith = function (string, startsWith) {
  string = string || "";
  if (startsWith.length > string.length)
    return false;
  return string.substring(0, startsWith.length) === startsWith;
}



