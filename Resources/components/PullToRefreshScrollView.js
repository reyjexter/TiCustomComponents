var AppModule = require('/global');
var App = AppModule.init();

App.UI.PullToRefreshScrollView = {};


App.UI.PullToRefreshScrollView.create = function(opts, pullToRefreshCallback) {
	var scrollView = Ti.UI.createScrollView(opts);
	
	var pullToRefreshView = Ti.UI.createView({
		height: 70,
		top: -70,
		touchEnabled: false,
		pullRefreshing: false,
		touchEnabled: false
	});
	
	var arrow = Ti.UI.createView({
		backgroundImage: '/images/white-arrow.png',
		width:23,
		height:60,
		bottom:10,
		left:20
	});
	
	var statusLabel = App.UI.createLabel({
		text:"Pull to refresh",
		bottom:30,
		color:"#576c89",
		textAlign:"center",
		font:{
			fontSize:13,
			fontWeight:"bold"
		},
		shadowColor:"#999",
		shadowOffset:{
			x:0,
			y:1
		}
	});
	
	var lastUpdatedLabel = App.UI.createLabel({
		text:"Last Updated: "+ formatDate(),
		bottom:15,
		color:"#576c89",
		textAlign:"center",
		font:{
			fontSize:12
		},
		shadowColor:"#999",
		shadowOffset:{
			x:0,
			y:1
		}
	});
	
	
	pullToRefreshView.add(arrow);
	pullToRefreshView.add(statusLabel);
	pullToRefreshView.add(lastUpdatedLabel);
	
	scrollView.add(pullToRefreshView);
	
	
	scrollView.addEventListener('scroll', function(e) {
		if(e.y <= -70) {
			if(e.source.pullRefreshing === false) {
				var t = Ti.UI.create2DMatrix();
				t = t.rotate(-180);
				arrow.animate({transform:t, duration:180});
			}
			
			e.source.pullRefreshing = true; 
			statusLabel.text = "Release to refresh";
		}
	});
	
	scrollView.addEventListener('scrollEnd', function(e) {
		if(e.source.pullRefreshing === true) {
			e.source.pullRefreshing = false;
			statusLabel.text = "Pull to refresh";
			lastUpdatedLabel.text = "Last Updated: "+ formatDate();
			
			var t = Ti.UI.create2DMatrix();
			t = t.rotate(0);
			arrow.animate({transform:t, duration:180});
			
			if(pullToRefreshCallback) {
				pullToRefreshCallback();
			}
		}
	});
	
	return scrollView;
};

module.exports = App.UI.PullToRefreshScrollView;

