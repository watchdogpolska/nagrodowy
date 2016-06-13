//'use strict';
//
//angular.module('myApp.view2', ['ngRoute', 'ngMap'])
////angular.module('ngMap')
//
//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.when('/view2', {
//    templateUrl: 'view2/view2.html',
//    controller: 'View2Ctrl'
//  });
//}])
//
//.controller('View2Ctrl', function($scope, $http, NgMap, ServiceSettings) {
//
//	$scope.mapSettings = {
//		center : {
//			lat : 52.104343,
//			long : 19.578630
//		},
//		zoom : 6
//	};
//	
//	//---------------
//	// Get map markers
//
//	var url = ServiceSettings.url_backend + '/get_map_markers/callback=JSON_CALLBACK';
//	$http({method:'JSONP', url: url}).
//		success(function(data) {
//	  		var markers = [];
//	  		for (var i=0, count=data.data.length; i<count; i++) {
//	  			var r = data.data[i],
//	  			m = "";
//	  			
//	  			if (r.lat != null && r.long != null ) {
//	  				m = createMarker(i+1, r.status, r.lat, r.long);
//	  			} else {
//	  				m = createMarker(i+1, r.status, r.city.lat, r.city.long);
//	  			}
//	  			
//	  			markers.push(m);
//	  		}
//
//	  		NgMap.getMap().then(function(map) {
//	  			$scope.map = map;
//	
//	  			$scope.markers = markers;
//	  			$scope.shops = markers;
//	  			
//	  			$scope.shop = $scope.shops[0];
//
//	  			$scope.clicked = function() {
//	  				alert('Clicked a link inside infoWindow');
//	  			};
//	  			
//	  			$scope.showDetail2 = function(e, shop) {
//	  				$scope.shop = shop;
//	  				$scope.map.showInfoWindow('foo-iw', shop.id);
//	  			  };
//	  			  
//	  			//----------------
//	  			//
//	  			// Marker Click
//	  			
//	  			$scope.showDetail = function(e, marker) {
//
////	  				if ( lastMarker == marker ) 
////	  					return;
////	  				
////	  				if ( lastMarker != null ) {
////	  					lastMarker.show = false;
////	  				}
////	  				
////	  				lastMarker = marker;
//	  				
//	  				var url = ServiceSettings.url_backend + '/get_marker_details/' + marker.nId + '/callback=JSON_CALLBACK';
//	  				$http({method:'JSONP', url: url}).
//	  					success(function(data) {
//	  						var m = data.data.marker,
//	  						files = data.data.files;
//	  						console.log(StatusMap[m.status].text);
//
//	  						$scope.markerInfo = {
//	  							recipient   : m.adresat.nazwa,
//	  							description : m.opis,
//	  							status      : StatusMap[m.status].text,
//	  							css	        : StatusMap[m.status].css
//	  						} ;
////	  						console.log(files)
////	  		  				$scope.shop = marker;
////	  		  				$scope.marker = marker;
////	  		  				$scope.map.showInfoWindow('foo-iw', marker.id);
////
//  			  				$scope.shop = marker;
//	  		  				$scope.map.showInfoWindow('foo-iw', marker.id);
//
//	  				  	}).
//	  				  	error(function(data, status, headers, config) {
//	  				  		console.log("Failed to load map markers")
//	  				  	});	
//	  			}
//
//
//
//	  $scope.hideDetail = function() {
//		  $scope.map.hideInfoWindow('foo-iw');
//	  };
//	  
//		
////  		$scope.shops = markers;
////  		$scope.shop = $scope.shops[0];
//  	  });
//
////  		console.log(markers);
//  		       	  
//  	}).
//  	error(function(data, status, headers, config) {
//  		console.log("Failed to load map markers")
//  	});	
//	
//	
//	
//
//	
//	
////	
////	
////	
//
////				
//		const StatusMap = {
//				"IN-PROGRESS" : { 
//					icon: "map-marker-in-progress.png", 
//					text: "Sprawa w toku", 
//					css: "status-in-progress" },
//					
//				"IN-PROGRESS-PARTIALLY-FAILED" : { 
//					icon: "map-marker-in-progress-partially-failed.png", 
//					text: "Sprawa w toku - opinia częściowo negatywna",
//					css: "status-in-progress-partially-failed" },
//					
//				"IN-PROGRESS-PARTIALLY-SUCCESSFUL" : { 
//					icon: "map-marker-in-progress-partially-successful.png", 
//					text: "Sprawa w toku - opinia częściowo pozytywna",
//					css: "status-in-progress-partially-ok" },
//					
//				"CLOSED-SUCCESSFUL" : { 
//					icon: "map-marker-closed-successful.png", 
//					text: "Sprawa zakończona pomyślnie",
//					css: "status-closed-ok" },
//					
//				"CLOSED-MOSTLY-SUCCESSFUL" : { 
//					icon: "map-marker-closed-mostly-successful.png", 
//					text: "Sprawa zakończona głównie pomyślnie",
//					css: "status-closed-mostly-ok" },
//				
//				"CLOSED-FAILED" : { 
//					icon: "map-marker-closed-failed.png", 
//					text: "Sprawa zakończona niepomyślnie",
//					css: "status-closed-failed" },
//					
//				"CLOSED-MOSTLY-FAILED" : { 
//					icon: "map-marker-closed-mostly-failed.png", 
//					text: "Sprawa zakończona głównie niepomyślnie",
//					css: "status-closed-mostly-failed" },
//			};
//	//----------------
//		// create marker
//		
//		var createMarker = function(i, status, lat, long, idKey) {
//			if (idKey == null) {
//				idKey = "id";
//			}
//
//			var ret = {
//				position : [ lat, long ],
//				nId : i,
//				id : "bong"+i,
//				// show : false,
//				icon : ServiceSettings.url_images + '/' + StatusMap[status].icon
//			};
//
//			ret[idKey + i] = i;
//			return ret;
//		};
//
//});
