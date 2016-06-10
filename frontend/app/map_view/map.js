'use strict';

angular

.module('myApp.map_view', [ 'ngRoute' ])

.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/map_view', {
		templateUrl : 'map_view/map.html',
		controller : 'MapViewCtrl'
	});
} ])

.controller(
	"MapViewCtrl",
	function($scope, $http, uiGmapGoogleMapApi, ServiceSettings) {
		
		var lastMarker = null;
		
//		$scope.url = {
//		    backend  : ServiceSettings.url_backend,
//		    frontend : ServiceSettings.url_frontend
//		};

		const StatusMap = {
				"IN-PROGRESS" : { 
					icon: "map-marker-in-progress.png", 
					text: "Sprawa w toku", 
					css: "status-in-progress" },
					
				"IN-PROGRESS-PARTIALLY-FAILED" : { 
					icon: "map-marker-in-progress-partially-failed.png", 
					text: "Sprawa w toku - opinia częściowo negatywna",
					css: "status-in-progress-partially-failed" },
					
				"IN-PROGRESS-PARTIALLY-SUCCESSFUL" : { 
					icon: "map-marker-in-progress-partially-successful.png", 
					text: "Sprawa w toku - opinia częściowo pozytywna",
					css: "status-in-progress-partially-ok" },
					
				"CLOSED-SUCCESSFUL" : { 
					icon: "map-marker-closed-successful.png", 
					text: "Sprawa zakończona pomyślnie",
					css: "status-closed-ok" },
					
				"CLOSED-MOSTLY-SUCCESSFUL" : { 
					icon: "map-marker-closed-mostly-successful.png", 
					text: "Sprawa zakończona głównie pomyślnie",
					css: "status-closed-mostly-ok" },
				
				"CLOSED-FAILED" : { 
					icon: "map-marker-closed-failed.png", 
					text: "Sprawa zakończona niepomyślnie",
					css: "status-closed-failed" },
					
				"CLOSED-MOSTLY-FAILED" : { 
					icon: "map-marker-closed-mostly-failed.png", 
					text: "Sprawa zakończona głównie niepomyślnie",
					css: "status-closed-mostly-failed" },
			};
		
		//----------------
		// Map Setup
		
		$scope.map = {
				center : {
					latitude : 52.104343,
					longitude : 19.578630
				},
				zoom : 6,
				bounds : {},
				test : {
					latitude : 53.554149,
					longitude : 15.092525
				},
				options : {
					disableDefaultUI : true,
//					disableDoubleClickZoom : true,
					zoomControl : true,
				}
			};

		//----------------
		// create marker
		
		var createMarker = function(i, status, lat, long, idKey) {
			if (idKey == null) {
				idKey = "id";
			}

			var ret = {
				latitude : lat,
				longitude : long,
				id : i,
				// show : false,
				icon : ServiceSettings.url_images + '/' + StatusMap[status].icon
			};

			ret[idKey + i] = i;
			return ret;
		};
		
		
		//---------------
		// Get map markers
		
		var url = ServiceSettings.url_backend + '/get_map_markers/callback=JSON_CALLBACK'; 
		$http({method:'JSONP', url: url}).
			success(function(data) {
		  		var markers = [];
		  		for (var i=0, count=data.data.length; i<count; i++) {
		  			var r = data.data[i];
		  			var m = "";
		  			
		  			if (r.lat != null && r.long != null ) {
		  				m = createMarker(i+1, r.status, r.lat, r.long);
		  			} else {
		  				m = createMarker(i+1, r.status, r.city.lat, r.city.long);
		  			}
		  			
		  			markers.push(m);
		  		}

		  		uiGmapGoogleMapApi.then(function(map) {
					$scope.map.markers = markers;
				});
		  	}).
		  	error(function(data, status, headers, config) {
		  		console.log("Failed to load map markers")
		  	});	
		 
		
		//----------------
		//
		// Marker Click
		
		$scope.markerClick = function(x, y, marker) {

			if ( lastMarker == marker ) 
				return;
			
			if ( lastMarker != null ) {
				lastMarker.show = false;
			}
			
			lastMarker = marker;
			
			var url = ServiceSettings.url_backend + '/get_marker_details/' + marker.id + '/callback=JSON_CALLBACK'; 
			$http({method:'JSONP', url: url}).
				success(function(data) {
					var d = data.data;
					console.log(d);
					$scope.markerInfo = {
						recipient	: d.adresat.nazwa,
						title 		: "d.tytul",
						description : d.opis,
						status		: StatusMap[d.status].text,
						css			: StatusMap[d.status].css
					} ;
			  	}).
			  	error(function(data, status, headers, config) {
			  		console.log("Failed to load map markers")
			  	});	
		}
	});