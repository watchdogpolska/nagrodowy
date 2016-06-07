'use strict';

angular

.module('myApp.view1', [ 'ngRoute' ])

.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/view1', {
		templateUrl : 'view1/view1.html',
		controller : 'View1Ctrl'
	});
} ])


.controller(
	"View1Ctrl",
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
			};

		//----------------
		// create marker
		
		var createMarker = function(i, status, lat, long, idKey) {
			if (idKey == null) {
				idKey = "id";
			}

			var iconMatch = {
				"OPEN" : "map-marker-yellow.png",
				"IN-PROGRESS" : "map-marker-yellow.png",
				"CLOSED-SUCCESSFUL" : "map-marker-green.png",
				"CLOSED-UNSUCCESSFUL" : "map-marker-red.png",
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
		  			if (r.lat != null && r.long != null ) {
		  				markers.push(createMarker(i, r.status, r.lat, r.long));
		  			} else {
		  				markers.push(createMarker(i, r.status, r.city.lat, r.city.long));
		  			}
		  		}


//		  		_.each(markers, function (marker) {
//		  		    marker.closeClick = function () {
//		  		    	console.log(marker);
//		  		      marker.showWindow = false;
//		  		      $scope.$evalAsync();
//		  		    };
////		  		    marker.onClicked = function () {
////		  		      onMarkerClicked(marker);
////		  		    };
//		  		  });
		  		
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
					console.log($scope.markerInfo)
			  	}).
			  	error(function(data, status, headers, config) {
			  		console.log("Failed to load map markers")
			  	});	
			
		}

		// params.map
		// params.title
		// params.text
		// params.position.lat
		// params.position.lng

//		function addMarker(params) {
//			return;
//			var contentString = '<div id="content">'
//					+ '<div id="siteNotice">' + '</div>'
//					+ '<h1 id="firstHeading" class="firstHeading">'
//					+ params.title + '</h1>'
//					+ '<div id="bodyContent">' + '<p><b>'
//					+ params.title + '</b> ' + params.text + '</p>'
//					+ '</div>' + '</div>';
//
//			var marker = new google.maps.Marker({
//				position : params.position,
//				map : params.map,
//				title : params.title
//			});
//
//			marker.addListener('click', function() {
//				var infowindow = new google.maps.InfoWindow({
//					content : contentString
//				});
//				infowindow.open(map, marker);
//			});
//		}

		
	});