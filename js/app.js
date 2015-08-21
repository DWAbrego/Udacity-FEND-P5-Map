function initializeApp() {
	// create new google maps view model
	mapVm.initializeMap(model, "googleMap"); // this also populates model markers
	ko.applyBindings(mapVm, document.getElementById('vm-maps'));

	viewModel.initializeVm(model);
	ko.applyBindings(viewModel, document.getElementById('vm-list'));

	//ko.applyBindings(new viewModel(model), document.getElementById('vm-list'));
}







