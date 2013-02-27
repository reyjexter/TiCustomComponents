/*
 * Codes used here is based on http://developer.appcelerator.com/question/147272/get-route-on-a-map---solution-not-a-question
 */
var DirectionMapViewClass = function(opts) {
	var self = this;
	self.opts = opts;
	self.mapView = null;
	
	self.getView = function() {
		var currentUserAnnotation = Titanium.Map.createAnnotation({
			latitude: self.opts.fromLat,
			longitude: self.opts.fromLng,
			title:"Your Location",
			pincolor: Titanium.Map.ANNOTATION_RED
		});
		
		var destAnnotation = Titanium.Map.createAnnotation({
			latitude: self.opts.toLat,
			longitude: self.opts.toLng,
			title:"Destination",
			pincolor: Titanium.Map.ANNOTATION_GREEN
		});
		
		var mapView = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude: self.opts.fromLat, longitude: self.opts.fromLng, latitudeDelta:0.05, longitudeDelta:0.05},
			animate: true,
			regionFit: true,
			userLocation: false,
			annotations: [currentUserAnnotation, destAnnotation]
		});
		self.mapView = mapView;
		
		self.showRoutes();
		
		return self.mapView;
	};
	
	self.showRoutes = function() {
		var xhr = Ti.Network.createHTTPClient();
		
	    xhr.onload = function (e) {
	    	
	    	try {
		        var response = this.responseText;
		        var json = JSON.parse(response);
		 		
		        var step = json.routes[0].legs[0].steps;
		        var intStep = 0, intSteps = step.length, points = [];
		        var decodedPolyline, intPoint = 0, intPoints = 0;
		        for (intStep = 0; intStep < intSteps; intStep = intStep + 1) {
		            decodedPolyline = self.decodeLine(step[intStep].polyline.points);
		            intPoints = decodedPolyline.length;
		            for (intPoint = 0; intPoint < intPoints; intPoint = intPoint + 1) {
		                if (decodedPolyline[intPoint] != null) {
		                    points.push({
		                        latitude: decodedPolyline[intPoint][0],
		                        longitude: decodedPolyline[intPoint][1]
		                    });
		                }
		            }
		        }
		       
		        var route = {
		            name: 'Example Route',
		            points: points,
		            color: '#c60000',
		            width: 4
		        };
		        self.mapView.addRoute(route);    
			}
			catch(exception) {
				Ti.API.info("Error", "Not able to set routes : " + exception);
			}
	    };
	    xhr.onerror = function (ee) {
	        Ti.API.info('error', JSON.stringify(ee));
	    };
	    var param = [
	        'destination=' + self.opts.toLat + "," + self.opts.toLng,
	        'origin=' + self.opts.fromLat + "," + self.opts.fromLng,
	        'sensor=false'
	    ];
	     
	    xhr.open('GET', 'http://maps.googleapis.com/maps/api/directions/json?' + param.join('&'));
	    xhr.send();
	};
	
	self.decodeLine = function(encoded) {
	    var len = encoded.length;
	    var index = 0;
	    var array = [];
	    var lat = 0;
	    var lng = 0;
	 
	    while (index < len) {
	        var b;
	        var shift = 0;
	        var result = 0;
	        do {
	            b = encoded.charCodeAt(index++) - 63;
	            result |= (b & 0x1f) << shift;
	            shift += 5;
	        } while (b >= 0x20);
	 
	        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
	        lat += dlat;
	 
	        shift = 0;
	        result = 0;
	        do {
	            b = encoded.charCodeAt(index++) - 63;
	            result |= (b & 0x1f) << shift;
	            shift += 5;
	        } while (b >= 0x20);
	 
	        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
	        lng += dlng;
	 
	        array.push([lat * 1e-5, lng * 1e-5]);
	    }
	 
	    return array;
	};
	
	return self;
};

var DirectionMapView = {};

DirectionMapView.create = function(opts) {
	return new DirectionMapViewClass(opts);
};


module.exports = DirectionMapView;