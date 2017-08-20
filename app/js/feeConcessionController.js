'use strict';

/* Controllers */
var vanavaniControllers = angular.module('vanavaniControllers');

vanavaniControllers.controller('feeConcessionDetailsCtrl', 
        function($scope, $location, $http) {
	
		  var path = $location.path();		  
		  $("#tabOption0").removeClass("active");
		  $("#tabOption1").removeClass("active");
		  $("#tabOption2").removeClass("active");
		  
		  switch (path) {
			  case "/feeConcessionDetails" :
				  $scope.tabOption = "0";
				  $("#tabOption0").addClass("active");
				  break;
			  case "/feeConcessionDetails/1" :
				  $scope.tabOption = "1";
				  $("#tabOption1").addClass("active");
				  break;
			  case "/feeConcessionDetails/2" :
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
              $scope.myData = data;
              if (!$scope.$$phase) {
                  $scope.$apply();
              }
          };
          $scope.getPagedDataAsync = function (pageSize, page, searchText) {
              setTimeout(function () {
                  var data;
                  if (searchText) {
                      var ft = searchText.toLowerCase();
                      $http.get('jsondata/feeConcession.json').success(function (largeLoad) {		
                          data = largeLoad.filter(function(item) {
                              return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                          });
                          $scope.setPagingData(data,page,pageSize);
                      });            
                  } else {
                      $http.get('jsondata/feeConcession.json').success(function (largeLoad) {
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
          $scope.gridOptions0 = {
        	        data: 'myData[0]',
        	        enablePaging: false,
        			showFooter: false,
        	        totalServerItems: 'totalServerItems',
        	        pagingOptions: $scope.pagingOptions,
        	        filterOptions: $scope.filterOptions,
        	        columnDefs: [
        	            {field: "Class"},
        	            {field: "Name", width: "200px"},
        	        	{field: "Term1", displayName: "TERM I"},
        	        	{field: "Term2", displayName: "TERM II"},
        	        	{field: "Term3", displayName: "TERM III"},
        	        	{field: "TOTAL"}
        	        ]
        	    };
          $scope.gridOptions1 = {
      	        data: 'myData[1]',
      	        enablePaging: false,
      			showFooter: false,
      	        totalServerItems: 'totalServerItems',
      	        pagingOptions: $scope.pagingOptions,
      	        filterOptions: $scope.filterOptions,
      	        columnDefs: [
      	            {field: "Class"},
      	            {field: "Name", width: "200px"},
      	        	{field: "Term1", displayName: "TERM I"},
      	        	{field: "Term2", displayName: "TERM II"},
      	        	{field: "Term3", displayName: "TERM III"},
      	        	{field: "TOTAL"}
      	        ]
      	    };
          $scope.gridOptions2 = {
        	        data: 'myData[2]',
        	        enablePaging: false,
        			showFooter: false,
        	        totalServerItems: 'totalServerItems',
        	        pagingOptions: $scope.pagingOptions,
        	        filterOptions: $scope.filterOptions,
        	        columnDefs: [
        	            {field: "Class"},
        	            {field: "Name", width: "200px"},
        	        	{field: "Term1", displayName: "TERM I"},
        	        	{field: "Term2", displayName: "TERM II"},
        	        	{field: "Term3", displayName: "TERM III"},
        	        	{field: "TOTAL"}
        	        ]
        	    };
          
        });

