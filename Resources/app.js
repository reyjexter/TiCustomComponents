// DirectionMapView
var win = Ti.UI.createWindow({backgroundColor: '#ffffff'});


var directionMapViewModule = require('/components/DirectionMapView');
var directionMapView = directionMapViewModule.create({
	fromLat: 14.607754,
	fromLng: 121.098237,
	toLat: 14.57781,
	toLng: 121.045411
});
win.add(directionMapView.getView());


// TextfieldToggle
/*
var win = Ti.UI.createWindow({backgroundColor: '#ffffff'});

var editableFields = [];
var editing = false;

var textfieldToggleModule = require('/components/TextfieldToggle');
var textfieldToggle = textfieldToggleModule.create({
	top: 10,
	left: 10,
	right: 10,
	height: 35,
	value: "Some Text To Edit"
});
editableFields.push(textfieldToggle);

var textfieldToggle2 = textfieldToggleModule.create({
	top: 50,
	left: 10,
	right: 10,
	height: 35,
	value: "Some Text To Edit 2"
});
editableFields.push(textfieldToggle2);


win.add(textfieldToggle.getView());
win.add(textfieldToggle2.getView());

var button = Ti.UI.createButton({
	title: "Edit",
	width: 100,
	height: 40,
	bottom: 10
});

button.addEventListener('click', function() {
	if(editing === false) {
		editing = true;
		button.title = "Save";
		for(var i=0; i<editableFields.length; i++) {
			editableFields[i].toggleEditMode();	
		}
	}
	else {
		editing = false;
		button.title = "Edit";
		for(var i=0; i<editableFields.length; i++) {
			editableFields[i].toggleDisplayMode();	
		}
		
		// display new values
		for(var i=0; i<editableFields.length; i++) {
			alert(editableFields[i].getValue());	
		}
	}
});

win.add(button);
*/

/*
// Custom Picker
var win = Ti.UI.createWindow({backgroundColor: '#ffffff'});

var data = [
	{id: 1, value: "Category 1"},
	{id: 2, value: "Category 2"},
	{id: 3, value: "Category 3"},
	{id: 4, value: "Category 4"},
	{id: 5, value: "Category 5"}
];

var pickerModule = require('/components/CustomPicker');
var picker = pickerModule.create({
	title: "Select Category",
	data: data,
	parent: win,	// win or view is okay
	chooseCallback: function(selected) {
		alert(selected);
	},
	cancelCallback: function() {
		alert("cancelled");
	}
});

win.add(picker.getView());
*/

win.open();
