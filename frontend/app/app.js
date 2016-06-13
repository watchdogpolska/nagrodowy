'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.map_view',
//  'myApp.view2',
  'myApp.version',
  'uiGmapgoogle-maps'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/map_view'});
}])

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCl045jnwaeEHmQIGtSqHAYiSEoOZEQ4vk',
       // v: '3.20', //defaults to latest 3.X anyhow
//        libraries: 'weather,geometry,visualization'
    });
})

;


