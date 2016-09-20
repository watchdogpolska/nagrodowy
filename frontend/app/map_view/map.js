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
		
		$scope.url = {
		    backend  : ServiceSettings.url_backend,
		    frontend : ServiceSettings.url_frontend,
		    storage	 : ServiceSettings.url_storage
		};

		var StatusMap = {
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

		
		//---------------
		// Get map markers
		
		var url = ServiceSettings.url_backend + '/get_map_markers/callback=JSON_CALLBACK'; 
		$http({method:'JSONP', url: url}).
			success(function(data) {
		  		var markers = [];
		  		
		  		for (var i=0, count=data.data.length; i<count; i++) {
		  			var 
		  			r = data.data[i],
		  			m = {
		  					id	    : i+1,  // I'm not sure if it has to be sequential as it is down to google map angular framework
		  					idPlace : r.id,
		  					icon    : ServiceSettings.url_images + '/' + StatusMap[r.status].icon
		  			};
  			
		  			if (r.lat != null && r.long != null ) {
	  					m["latitude"]  = r.lat;
	  					m["longitude"] = r.long;
		  			} else {
	  					m["latitude"]  = r.city.lat;
	  					m["longitude"] = r.city.long;
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
			
			var url = ServiceSettings.url_backend + '/get_marker_details/' + marker.idPlace + '/callback=JSON_CALLBACK';
			$http({method:'JSONP', url: url}).
				success(function(data) {
					var marker = data.data.marker,
					files = data.data.files;
					$scope.markerInfo = {
						recipient   : marker.adresat.nazwa,
						description : marker.opis,
						status      : StatusMap[marker.status].text,
						css	        : StatusMap[marker.status].css,
						files		: files.length != 0
					} ;
					
					$scope.files = files;
					$scope.fileVisible = function(id) {
						return (id < files.length ) ? true : false; 
					}
					
					$scope.file = function(id) {
						return $scope.files[id];
					}
			  	}).
			  	error(function(data, status, headers, config) {
			  		console.log("Failed to load map markers")
			  	});	
		}
	});