var CustomPickerClass = function(opts) {
	var self = this;
	self.opts = opts;
	
	self.titleLabel = null;
	self.popupView = null;
	self.selected = null;
	self.hasSelection = false;
	
	self.getView = function() {
		var pickerView = Ti.UI.createView({left: 10, right: 10, height: 35, borderColor: '#000000'});
	
		self.titleLabel = Ti.UI.createLabel({
			text: opts.title,
			touchEnabled: false
		});
		
		pickerView.add(self.titleLabel);
		
		pickerView.addEventListener('click', self.pickerViewClickListener);
		
		self.popupView = self.createPopupView();
		
		return pickerView;	
	};
	
	self.createPopupView = function() {
		var popupView = Ti.UI.createView({
			backgroundColor: '#999999',
			zIndex: 9999
		});
		
		var pickerObj = Ti.UI.createPicker({useSpinner: true});

		var data = [];
		for(var i=0; i<self.opts.data.length; i++) {
			if(i === 0) {
				self.setSelected(self.opts.data[0].id, self.opts.data[0].value);
			}
			data.push(Ti.UI.createPickerRow({title: self.opts.data[i].value ,id: self.opts.data[i].id}));
		}
		
		pickerObj.selectionIndicator = true;
		pickerObj.add(data);
		
		pickerObj.addEventListener('change', self.pickerChangeListener);
		popupView.add(pickerObj);
		
		var choosePickerButton = Ti.UI.createButton({
			title: "Choose",
			height: 35,
			width: 200,
			bottom: 80
		});
		choosePickerButton.addEventListener('click', self.chooseClickListener);
		popupView.add(choosePickerButton);
		
		var cancelPickerButton = Ti.UI.createButton({
			title: "Cancel",
			height: 35,
			width: 200,
			bottom: 30
		});
		cancelPickerButton.addEventListener('click', self.cancelClickListener);
		popupView.add(cancelPickerButton);
		
		return popupView;
	};
	
	self.pickerChangeListener = function(e) {
		var id = e.row.id;
		var title = e.row.title;
		
		self.selected = {
			id: id,
			title: title
		};
	};
	
	self.setSelected = function(id, title) {
		self.selected = {
			id: id,
			title: title
		};
	};
	
	self.getSelected = function() {
		if(self.hasSelection === true) {
			return self.selected;
		}
		else {
			return null;
		}
	};
	
	self.chooseClickListener = function(e) {
		self.hasSelection = true;
		
		var selectedRow = self.getSelected();
		
		self.titleLabel.text = selectedRow.title;		
		
		self.close(function() {
			if(self.opts.chooseCallback) {
				self.opts.chooseCallback(selectedRow);
			}
		});
	};
	
	self.cancelClickListener = function(e) {
		self.close(function() {
			if(self.opts.cancelCallback) {
				self.opts.cancelCallback();
			}
		});
	};
	
	self.close = function(callback) {
		self.popupView.animate({opacity: 0.0, duration: 500}, function() {
			var parent = self.opts.parent;
			parent.remove(self.popupView);
			
			if(callback) {
				callback();
			}
		});
	}
	
	self.pickerViewClickListener = function(e) {
		var parent = self.opts.parent;
		
		self.popupView.opacity = 0;
		parent.add(self.popupView);
		self.popupView.animate({opacity: 1.0, duration: 500});
	};
	
	return self;
};

var CustomPicker = {};

CustomPicker.create = function(opts) {
	return new CustomPickerClass(opts);
};


module.exports = CustomPicker;