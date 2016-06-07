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

			var iconMatch = {
				"OPEN" : "map-marker-open.png",
				"IN-PROGRESS" : "map-marker-in-progress.png",
				"CLOSED-SUCCESSFUL" : "map-marker-closed-success.png",
				"CLOSED-UNSUCCESSFUL" : "map-marker-closed-failed.png",
			};

			var ret = {
				latitude : lat,
				longitude : long,
				title : 'm' + i,
				text : 'tral la la',
				status : "",
				id : i,
				click : function(x,y,z) {alert("da");},
				show : false,
				icon : ServiceSettings.url_images + '/' + iconMatch[status]
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
					$scope.markerInfo = {
						recipient	: d.adresat.nazwa,
						title 		: d.tytul,
						description : d.opis,
						status		: d.status
					} ;
			  	}).
			  	error(function(data, status, headers, config) {
			  		console.log("Failed to load map markers")
			  	});	
		}
	});