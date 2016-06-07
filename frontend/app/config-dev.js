angular.module('myApp')
.factory('ServiceSettings', function() {
  return {
	  url_backend  : 'http://nag/nag-api/wnioski',
      url_frontend : 'http://nag',
      url_images   : 'http://nag/images',

//      url_backend  : 'http://192.168.1.111:8000/wnioski',
//      url_frontend : 'http://192.168.1.111',
//      url_images   : 'http://192.168.1.111/images',
  };
});
