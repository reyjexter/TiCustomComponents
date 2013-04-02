var AppModule = require('/global');
var App = AppModule.init();

App.UI.AutoScrollingScrollableView = {};

var AutoScrollingScrollableViewClass = function(parent, opts) {
	var self = this;
	self.opts = opts;
	self.parent = parent;
	self.scrollableView = null;
	self.autoScrolling = false;
	self.scrollTimeout = null;
	self.stopScrollTimeout = null;
	
	self.init = function() {
		if(!self.opts) {
			self.opts = {};
			
		}
		self.opts['views'] = [];
		self.opts['showPagingControl'] = false;
		self.opts['pagingControlHeight'] = 0; 
			
		var scrollableView = Ti.UI.createScrollableView(self.opts);
		
		scrollableView.addEventListener('click', self.scrollableViewClickListener);
		
		self.scrollableView = scrollableView;
		
		self.parent.add(scrollableView);
	};
	
	self.setViews = function(views) {
		self.scrollableView.views = views;
	};
	
	self.startAutoScroll = function() {
		self.autoScrolling = true;
		
		self.animateNext();
	};
	
	self.animateNext = function() {
		if(self.scrollTimeout) {
			clearTimeout(self.scrollTimeout);
			self.scrollTimeout = null;
		}
		
		if(self.autoScrolling === true) {
		
			var currentPage = self.scrollableView.currentPage;
			var nextPage = currentPage + 1;
			
			if(nextPage >=  self.scrollableView.views.length) {
				nextPage = 0;
			}
			
			self.scrollableView.scrollToView(nextPage);
		
		
		
			self.scrollTimeout = setTimeout(function() {
				self.animateNext();
			}, 10000);
		}
	};
	
	self.stopAutoScroll = function() {
		self.autoScrolling = false;
	};
	
	self.scrollableViewClickListener = function(e) {
		// pause auto scrolling when view is clicked
		self.stopAutoScroll();
		
		// but resume it if not event was detected after 5 seconds
		if(self.stopScrollTimeout) {
			clearTimeout(self.stopScrollTimeout);
			self.stopScrollTimeout = null;
		}
		
		self.stopScrollTimeout = setTimeout(function() {
			self.startAutoScroll();
		}, 20000);
	};
	
	self.init();
	
	return self;
};


App.UI.AutoScrollingScrollableView.create = function(parent) {
	var AutoScrollingScrollableView = new AutoScrollingScrollableViewClass(parent);
	return AutoScrollingScrollableView;
};

module.exports = App.UI.AutoScrollingScrollableView;

