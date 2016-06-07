'use strict';

angular
.factory('ServiceSettings', function() {
  return {
	  url_backend  : 'http://pu.polishpilots.uk/backend/map',
      url_frontend : 'http://pu.polishpilots.uk',
      url_images   : 'http://pu.polishpilots.uk/images',
  };
});


