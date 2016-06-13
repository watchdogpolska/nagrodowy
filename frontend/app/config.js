'use strict';

angular.module('myApp')
.factory('ServiceSettings', function() {
  return {
	  url_backend  : 'http://pu.polishpilots.uk/backend/map',
      url_frontend : 'http://pu.polishpilots.uk',
      url_images   : 'http://pu.polishpilots.uk/images',
      url_storage  : 'http://pu.polishpilots.uk/storage'
  };
});


