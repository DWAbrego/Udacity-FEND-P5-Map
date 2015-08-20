function initializeApp() {

  console.log('initialize in initializeApp()');

  // create a model which holds locations
  var model = new Model();

  // create new google maps view model
  var mapvm = new MapVmAppObj(model);
  mapvm.initializeMap(); // this also populates model markers
  ko.applyBindings(mapvm, document.getElementById('vm-maps'));

  ko.applyBindings(new viewModel(model), document.getElementById('vm-list'));
}







