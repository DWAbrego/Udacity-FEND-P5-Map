// create a model which holds locations
var model = new Model();

// create new google maps view model
var mapvm = new MapVmAppObj(model);
mapvm.initializeMap(); // this also populates model markers
ko.applyBindings(mapvm, document.getElementById('vm-maps'));


//ko.applyBindings(new viewModel(model), document.getElementById('vm-list'));

console.log(model.locations[0].marker);

// view model
if (!(window.google && google.maps)) {
  setTimeout( function() {  
		console.log(model.locations[0].marker);
		ko.applyBindings(new viewModel(model), document.getElementById('vm-list'));
    }, 500
  );
}






