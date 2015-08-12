

var viewModel = function () {
	var self = this;
	self.filterText = ko.observable("");

	self.placesArrayObs = ko.observableArray(mapAppObj.locations);

	// this function will animate the marker that corresponds with the item (from the filter search) that was pressed
	self.selectMarker = function (item) {
		console.log(item.idx);
		mapAppObj.triggerMarker(item.idx);
	}

	// utility function used to compare filter string to search text
	self.stringStartsWith = function (string, startsWith) {
		string = string || "";
		if (startsWith.length > string.length)
			return false;
		return string.substring(0, startsWith.length) === startsWith;
	}

	self.SearchResults1 = ko.computed(function () {

			// first hide all markers (markers stored in map.js)
			for (i1 = 0; i1 < mapAppObj.locations.length; i1++) {
				mapAppObj.locations[i1].marker.setVisible(false);
			}

			return ko.utils.arrayFilter(self.placesArrayObs(), function (item) {
				// match marker here
				// then set visibility of pin  pin.marker.setVisible(match);

				var filter = self.filterText().toLowerCase();

				// only show markers that have a name that matches the filter text box
				for (i1 = 0; i1 < mapAppObj.locations.length; i1++) {
					if (self.stringStartsWith(mapAppObj.locations[i1].name1.toLowerCase(), filter)) {
						mapAppObj.locations[i1].marker.setVisible(true);
					}
				}

				return self.stringStartsWith(item.name1.toLowerCase(), filter);
			});
		});
}; // viewModel

ko.applyBindings(new viewModel());

//console.log(gMarkersArray);
//console.log(mapAppObj.locations);