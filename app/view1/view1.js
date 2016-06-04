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
				function($scope, uiGmapGoogleMapApi) {

					var createRandomMarker = function(i, bounds, idKey) {
						var range = 5, lat_min = 50.104343, lat_range = 4, lng_min = 15.578630, lng_range = 7.5;

						if (idKey == null) {
							idKey = "id";
						}

						var latitude = lat_min + (Math.random() * lat_range);
						var longitude = lng_min + (Math.random() * lng_range);

						var ret = {
							latitude : latitude,
							longitude : longitude,
							title : 'm' + i,
							text : 'tral la la',
							id : i,
						};

						ret[idKey + i] = i;
						return ret;
					};

				
					$scope.markerClick = function(x, y, z) {
					}
					// uiGmapGoogleMapApi is a promise.
					// The "then" callback function provides the google.maps
					// object.
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
						}
					};

					$scope.pu = "bong33";

					// params.map
					// params.title
					// params.text
					// params.position.lat
					// params.position.lng

					function addMarker(params) {
						return;
						var contentString = '<div id="content">'
								+ '<div id="siteNotice">' + '</div>'
								+ '<h1 id="firstHeading" class="firstHeading">'
								+ params.title + '</h1>'
								+ '<div id="bodyContent">' + '<p><b>'
								+ params.title + '</b> ' + params.text + '</p>'
								+ '</div>' + '</div>';

						var marker = new google.maps.Marker({
							position : params.position,
							map : params.map,
							title : params.title
						});

						marker.addListener('click', function() {
							var infowindow = new google.maps.InfoWindow({
								content : contentString
							});
							infowindow.open(map, marker);
						});
					}

					$scope.randomMarkers = [];
					var markers = [];
					for (var i = 0; i < 50; i++) {
						markers.push(createRandomMarker(i, $scope.map.bounds))
					}

					uiGmapGoogleMapApi.then(function(map) {
						$scope.randomMarkers = markers;
					});
				});