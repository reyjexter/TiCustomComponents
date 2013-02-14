var TextfieldToggleClass = function(opts) {
	var self = this;
	self.opts = opts;
	self.label = null;
	self.textfield = null;
	
	self.getView = function() {
		var view = Ti.UI.createView({
			width: self.opts.width,
			height: self.opts.height,
			left: self.opts.left,
			right: self.opts.right,
			top: self.opts.top,
			bottom: self.opts.bottom,
		});
		
		self.label = Ti.UI.createLabel({
			width: Ti.UI.FILL,
			height: Ti.UI.FILL,
			text: self.opts.value
		});
		
		self.textfield = Ti.UI.createTextField({
			value: self.opts.value,
			width: Ti.UI.FILL,
			height: Ti.UI.FILL,
			visible: false,
			borderColor: '#000000'
		})
		
		view.add(self.label);
		view.add(self.textfield);
		
		return view;
	};
	
	self.toggleEditMode = function() {
		self.label.hide();
		self.textfield.show();
		self.textfield.focus();
	};
	
	self.toggleDisplayMode = function() {
		self.label.text = self.textfield.value;
		self.textfield.hide();
		self.label.show();
	};
	
	self.getValue = function() {
		return self.textfield.value;
	};
	
	return self;
};

var TextfieldToggle = {};

TextfieldToggle.create = function(opts) {
	return new TextfieldToggleClass(opts);
};


module.exports = TextfieldToggle;