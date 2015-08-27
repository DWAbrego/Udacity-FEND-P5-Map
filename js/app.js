//////////////////////////////////////////////////////////////
//
// Daniel Abrego
// Udacity FEND P5 Map Application
//
// app.js:  
//  This file will contain the callback function that is
//  kicked off when the google maps API is loaded in index.html.
//  The maps API is loaded by javascript function loadGoogleMapsAPI().
//
//  A single global model object called 'model' is created in model.js.
//  A single global mapVM object called 'mapVm' is created in mapVM.js.
//  A single global viewmodel object called 'viewModel' is created in viewmodel.js.
//
//  Those global objects are part of the MVVM pattern, and they
//  are further initialized here.
//
//////////////////////////////////////////////////////////////

function initializeApp() {
	// create new google maps view model
	mapVm.initializeMap(model, "googleMap"); // this also populates model markers
	ko.applyBindings(mapVm, document.getElementById('vm-maps'));

	viewModel.initializeVm(model);
	ko.applyBindings(viewModel, document.getElementById('vm-list'));
}







