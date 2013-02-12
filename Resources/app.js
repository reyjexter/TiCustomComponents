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

win.open();
