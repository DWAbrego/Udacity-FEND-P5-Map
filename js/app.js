// create a model which holds locations
var model = new Model();

// create new google maps view model
mapvm = new MapVmAppObj(model);

// load google maps api asynch
mapvm.loadGoogleAPI();


// load map viewmodel last since it applies bindings to a specific element
ko.applyBindings(mapvm, document.getElementById('statusMessage1'));


// pause briefly so google maps loads, check for presence of 'google' object
// before continuing
if (window.google && google.maps) {
}
else {
  setTimeout( function() {
    // actual map and markers are loaded here
    mapvm.initializeMap();

    // load viewmodel
    ko.applyBindings(new viewModel(model));


    }, 500
  );
}






