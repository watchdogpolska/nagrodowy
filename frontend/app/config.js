'use strict';

angular
.factory('ServiceSettings', function() {
  return {
	  url_backend  : 'http://pu.polishpilots.uk/nag-api/wnioski',
      url_frontend : 'http://pu.polishpilots.uk',
      url_images   : 'http://pu.polishpilots.uk/images',
      
//      url_backend  : 'http://192.168.1.111:8000/wnioski',
//      url_frontend : 'http://192.168.1.111',
//      url_images   : 'http://192.168.1.111/images',
  };
});


