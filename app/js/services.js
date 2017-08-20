'use strict';

/* Services */
var vanavaniServices = angular.module('vanavaniServices', ['ngResource']);

vanavaniServices.factory('Teacher', ['$resource',
  function($resource){
    return $resource('php/teachersList.php', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

vanavaniServices.factory('Photo', ['$resource',
 function($resource){
   return $resource('php/photoShowAll.php?folderName=:folderName', {}, {
     query: {method:'GET', params:{folderName:'folderName'}, isArray:true}
   });
 }]);

vanavaniServices.factory('GridData', ['$resource',
   function($resource){
     return $resource('jsondata/fedrouting.json', {}, {
       query: {method:'GET', isArray:true}
     });
   }]);

vanavaniServices.factory('User', [function() {
	var sdo = {
		isLogged: false,
		username: ''
	};
	return sdo;
}]);