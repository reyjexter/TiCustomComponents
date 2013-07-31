var ChatListViewClass = function(parent) {
	var self = this;

	self.parent = parent;
	self.scrollViewMessages = null;
	self.scrollViewTextfield = null;

	self.textfield = null;
	self.sendButton = null;
	self.editing = false;
	
	self.init = function() {
		// create the scroll view for messages
		// all chat bubble will be placed here
		self.scrollViewMessages = Ti.UI.createScrollView({
			layout: 'vertical',
			bottom: 70,
			zIndex: 11
		});
		
		// create the scrollview for textfield
		self.scrollViewTextfield = Ti.UI.createScrollView({
			zIndex: 10
		});
		
		self.scrollViewTextfield.add(self.createTextToolbar());
		
		self.parent.add(self.scrollViewMessages);
		self.parent.add(self.scrollViewTextfield);
	};


	// TODO Christian - Important to call this on window/view destroy
	self.destroy = function() {
		if(self.scrollViewMessages) {
			self.parent.remove(self.scrollViewMessages);
			self.scrollViewMessages = null;
		}
		
		if(self.scrollViewTextfield) {
			self.parent.remove(self.scrollViewTextfield);
			self.scrollViewTextfield = null;
		}
		
		self.textfield = null;
		self.sendButton = null;
	};
	
		
	// TODO Christian
	// You might need to modify this
	self.addMessage = function(text) {
		var messageView = Ti.UI.createView({
			left: 10,
			right: 10,
			top: 5,
			bottom: 5,
			borderColor: '#000000',
			height: 100	// TODO Christian you might need to make this flexible,
		});
		
		// TODO Christian you might need to change this to App.UI.Label
		var label = Ti.UI.createLabel({
			text: text,
			left: 0
		});
		messageView.add(label);
		
		self.scrollViewMessages.add(messageView);  
	};
	
	
	
	self.createTextToolbar = function() {
		var toolbarContainer = Ti.UI.createView({
			height: 70,
			bottom: 0,
			backgroundColor: '#999999'
		});
		
		toolbarContainer.addEventListener('click', self.toolbarContainerClickListener);
		
		var textfield = Titanium.UI.createTextField({
			hintText: "Enter message here",
			height:40,
			top:10,
			bottom:10,
			left: 10,
			right: 70,
			width: Ti.UI.FILL,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			touchEnabled: false
		});
		
		textfield.addEventListener('blur', self.textfieldBlurListener);
		
		self.textfield = textfield;
		toolbarContainer.add(textfield);
		
		
		var sendButton = Ti.UI.createButton({
			width: 50,
			title: "Send",
			height: 40,
			right: 10,
			touchEnabled: false
		});
		self.sendButton = sendButton;
		toolbarContainer.add(sendButton);
		
		return toolbarContainer;
	};
	
	
	self.toolbarContainerClickListener = function(e) {
		if(self.editing === true) {
			return;
		}
		
		self.editing = true;
		
		// switch the zIndex
		self.scrollViewMessages.zIndex = 9;
		self.scrollViewTextfield.zIndex = 11;
		self.textfield.focus();
		
		self.textfield.touchEnabled = true;
		self.sendButton.touchEnabled = true;
		self.scrollViewMessages.bottom = 70 + 200;
		
		setTimeout(function() {
			self.scrollViewMessages.scrollToBottom();
		}, 300);
	};
	
	self.textfieldBlurListener = function(e) {
		self.editing = false;
		
		self.textfield.touchEnabled = false;
		self.sendButton.touchEnabled = false;
		
		self.scrollViewMessages.zIndex = 11;
		self.scrollViewTextfield.zIndex = 9;
		
		self.scrollViewMessages.bottom = 70;
		
		setTimeout(function() {
			self.scrollViewMessages.scrollToBottom();
		}, 300);
	}
	
	self.init();
	
	return self;
};


module.exports = function(parent) {
	return new ChatListViewClass(parent);
}

