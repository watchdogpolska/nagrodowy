'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'uiGmapgoogle-maps'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCl045jnwaeEHmQIGtSqHAYiSEoOZEQ4vk',
       // v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

.factory('ServiceSettings', function() {
  return {
      url_backend  : 'http://192.168.1.111:8000/wnioski',
      url_frontend : 'http://192.168.1.111',
      url_images   : 'http://192.168.1.111/images',
  };
});


