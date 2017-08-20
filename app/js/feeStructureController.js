'use strict';

/* Controllers */
var vanavaniControllers = angular.module('vanavaniControllers');

vanavaniControllers.controller('feeStructureCtrl', 
        function($scope, $location, $http) {
			//$scope.data = [[[0, 1], [1, 5], [2, 2]]];
			var d1 = [[0, 8500], [1, 8500], [2, 9000], [3, 9000], [4, 9000], [5, 9000], [6, 9000], [7, 9500], [8, 9500], [9, 9500], [10, 10000], [11, 10000]];
			var d2 = [[0, 9350], [1, 9350], [2, 9900], [3, 9900], [4, 9900], [5, 9900], [6, 9900], [7, 10450], [8, 10450], [9, 10450], [10, 11000], [11, 11000]];
			var d3 = [[0, 10285], [1, 10285], [2, 10890], [3, 10890], [4, 10890], [5, 10890], [6, 10890], [7, 11495], [8, 11495], [9, 11495], [10, 12100], [11, 12100]];
			
			$scope.data = [{label: '2013', data: d1}, {label: '2014', data: d2}, {label: '2015', data: d3}];
        });


vanavaniControllers.directive('vanavaniFeeStructure', function() {
	return {
		controller : function($scope) {
						
		},
		link : function(scope, element, attrs) {
			var data = scope[attrs.ngModel];
			var options = {
				series : {
					lines : {show : true},
					points : {show : true}
				},
				xaxis : {
					ticks : [[0,'LKG'], [1, 'UKG'], [2, 'I'], [3, 'II'], [4, 'III'], [5, 'IV'], [6, 'V'], [7, 'VI'], [8, 'VII'], [9, 'VIII'], [10, 'IX'], [11, 'X']]
				}
			};
            $.plot(element, data, options);
            element.show();		
        }
	};
});
