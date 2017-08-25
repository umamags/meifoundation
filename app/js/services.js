'use strict';

/* Services */
var meiFoundationServices = angular.module('meiFoundationServices', ['ngResource']);

meiFoundationServices.factory('Teacher', ['$resource',
  function($resource){
    return $resource('php/teachersList.php', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

meiFoundationServices.factory('Photo', ['$resource',
 function($resource){
   return $resource('php/photoShowAll.php?folderName=:folderName', {}, {
     query: {method:'GET', params:{folderName:'folderName'}, isArray:true}
   });
 }]);

meiFoundationServices.factory('GridData', ['$resource',
   function($resource){
     return $resource('jsondata/fedrouting.json', {}, {
       query: {method:'GET', isArray:true}
     });
   }]);

meiFoundationServices.factory('User', [function() {
	var sdo = {
		isLogged: false,
		username: ''
	};
	return sdo;
}]);