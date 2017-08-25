'use strict';

/* Filters */
angular.module('meiFoundationFilters', []).filter('checkmark', function() {
	  return function(input) {
	    return input ? '\u2713' : '\u2718';
	  };
	});
