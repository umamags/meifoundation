'use strict';

/* Controllers */
var vanavaniControllers = angular.module('vanavaniControllers');

vanavaniControllers.controller('adminCtrl', 
        function($scope, $location, $http) {
	
		  var path = $location.path();
		  $("#tabOption0").removeClass("active");
		  $("#tabOption1").removeClass("active");
		  $("#tabOption2").removeClass("active");
		  
		  //od6 - class lkg
		  //od7 - class ukg
		  //od8 - class 5
		  //od9 - class 6
		  //od4 - class 1
		  
		  
		  switch (path) {
			  case "/admin" :
				  $scope.tabOption = "0";
				  $("#tabOption0").addClass("active");
				  break;
			  case "/admin/studentDetails" :
				  $scope.tabOption = "1";
				  $("#tabOption1").addClass("active");
				  break;
			  case "/admin/studentDetails2" :
				  $scope.tabOption = "2";
				  $("#tabOption2").addClass("active");
				  break;
			  default:
				  $scope.tabOption = "0";
				  break;
		  };
			  
		$scope.filterOptions = {
        	        filterText: "",
        	        useExternalFilter: true
        	    }; 
          $scope.totalServerItems = 0;
          $scope.pagingOptions = {
              pageSizes: [10, 250, 500, 1000],
              pageSize: 10,
              currentPage: 1
          };	    
          $scope.setPagingData = function(data, page, pageSize){
              //$scope.myData = data;
        	  $scope.myData = data.feed.entry;
              if (!$scope.$$phase) {
                  $scope.$apply();
              }
          };
          $scope.getPagedDataAsync = function (pageSize, page, searchText) {
              setTimeout(function () {
                  var data;
                  //var url = 'php/studentsList.php';
                  //var url = 'jsondata/studentsList.json';
                  //var url = 'https://spreadsheets.google.com/feeds/list/0AnmfnATpC8YhdGdFMlpaZmREb1JGSGxhV180Z2VWaWc/od6/public/values?alt=json';
                  var url = 'https://spreadsheets.google.com/feeds/list/0AnmfnATpC8YhdGdFMlpaZmREb1JGSGxhV180Z2VWaWc/od5/public/values?alt=json';
                  
                  if (searchText) {
                      var ft = searchText.toLowerCase();
                      $http.get(url).success(function (largeLoad) {		
                          data = largeLoad.filter(function(item) {
                              return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                          });
                          $scope.setPagingData(data,page,pageSize);
                      });            
                  } else {
                      $http.get(url).success(function (largeLoad) {
                          $scope.setPagingData(largeLoad,page,pageSize);
                      });
                  }
              }, 100);
          };
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
          $scope.$watch('pagingOptions', function (newVal, oldVal) {
              if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
              }
          }, true);
          $scope.$watch('filterOptions', function (newVal, oldVal) {
              if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
              }
          }, true);
          $scope.gridOptions = {
        	        data: 'myData',
        	        enablePaging: false,
        			showFooter: false,
        	        totalServerItems: 'totalServerItems',
        	        pagingOptions: $scope.pagingOptions,
        	        filterOptions: $scope.filterOptions,
        	        columnDefs: [
        	        	            {field: "gsx$nameofstudents.$t", displayName: "Name"}
        	        	        ]
        	    };
          
        });

