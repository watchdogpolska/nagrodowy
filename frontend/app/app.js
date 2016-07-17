'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.map_view',
  'uiGmapgoogle-maps'
])

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCl045jnwaeEHmQIGtSqHAYiSEoOZEQ4vk',
       // v: '3.20', //defaults to latest 3.X anyhow
//        libraries: 'weather,geometry,visualization'
    });
})

;


