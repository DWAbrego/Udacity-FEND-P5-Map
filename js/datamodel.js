var stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};

//var placesOfInterest = gLocations;

var viewModel= function() {
	var self = this;
	self.filterText = ko.observable("");

	self.placesArrayObs = ko.observableArray(gLocations);

	//self.markers = ko.observableArray(gMarkersArray);

	self.testClick =  function(item) {
	   console.log(item.name1);
  	}

	self.centerMap =  function(item) {
	   centerMap();
  	}

	self.SearchResults1 = ko.computed(function(){

      // first hide all markers (markers stored in map.js)
      	for (i1 = 0; i1 < gLocations.length; i1++) {
        gLocations[i1].marker.setVisible(false);
      }

		return ko.utils.arrayFilter(self.placesArrayObs(), function(item)
		{
			// match marker here
			// then set visibility of pin  pin.marker.setVisible(match);
			// last answer  http://stackoverflow.com/questions/29557938/removing-map-pin-with-search

			// this makes the markers invisible, they were stored in a global array in maps.js
			//gLocations[0].marker.setVisible(false);
			//gLocations[1].marker.setVisible(false);
			//gLocations[2].marker.setVisible(false);
			//gLocations[3].marker.setVisible(false);
      //console.log("[" + item.name1.toLowerCase() + "]  [" + self.filterText() + "]" );

			var filter = self.filterText().toLowerCase();


    // only show markers that have a name that matches the filter text box
	for (i1 = 0; i1 < gLocations.length; i1++) {
      if(stringStartsWith(gLocations[i1].name1.toLowerCase(), filter)) {
        gLocations[i1].marker.setVisible(true);
      }
    }


			return stringStartsWith(item.name1.toLowerCase(), filter);
		});
	});
}; // viewModel

ko.applyBindings(new viewModel());


//console.log(gMarkersArray);
console.log(gLocations);
