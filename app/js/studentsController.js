'use strict';

/* Controllers */
var vanavaniControllers = angular.module('vanavaniControllers');

vanavaniControllers.controller('studentsCtrl', 
        function($scope, $location, $http, User, StudentDTO, StudentDtoREST) {		
		    if (! User.isLogged) {
		    	return;
		    }

			$scope.rowHeight = 90;
	
			$scope.filterOptions = {
	        	        filterText: "",
	        	        useExternalFilter: false
	        	    }; 
	          $scope.totalServerItems = 0;
	          $scope.pagingOptions = {
	              pageSizes: [10, 250, 500, 1000],
	              pageSize: 10,
	              currentPage: 1
	          };	    
	          $scope.setPagingData = function(data, page, pageSize){
	        	  $scope.myData = data;
	        	  $scope.pageHeight = $scope.rowHeight * data.length;
	              if (!$scope.$$phase) {
	                  $scope.$apply();
	              }
	          };
	          $scope.getPagedDataAsync = function (pageSize, page, searchText) {
	              setTimeout(function () {
	                  var data;
	                  var url = 'jsondata/studentsDetails.json';
	                  
	                  if (searchText) {
	                	  if (searchText.className) {
	                		  var ft = searchText.className;
		                      $http.get(url).success(function (largeLoad) {		
		                    	  if (ft == '9_10') {
		                    		  var data_9 = _.where(largeLoad, {Class: '9'});
		                    		  var data_10 = _.where(largeLoad, {Class: '10'});
		                    		  data = _.union(data_9, data_10);
		                    	  } else {
		                    		  data = _.where(largeLoad, {Class: ft});
		                    	  }
		                          $scope.setPagingData(data,page,pageSize);
		                      });            
	                		  return;
	                	  } 
	                	  //Here we can see how it goes
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
	          var defaultSearch = {"className":"LKG"};
	          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, defaultSearch);
	          
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
			  
	          $scope.selectClass = function(whichClass) {
	        	  var search = {"className":whichClass};
	        	  if (whichClass == "ALL") {
	        		  search = null;
	        	  }
	        	  $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, search);
	          }
	          
	          $scope.modalShown = false;
			  $scope.toggleModal = function(row) {
				$scope.studentDto = StudentDTO.create();
				
				//Get the RegNo and look for the student detail json
				//If found, read content and populate text box.
                $scope.studentDto.regNo = row.entity.RegNo;
                $scope.studentDto.studentName = row.entity.StudentName;
				var url = 'jsondata/students/' + row.entity.RegNo + ".json";
				$http.get(url).success(function (data) {	
                         var studentDetail = data[0];
                         $scope.studentDto.studentComments = studentDetail.studentComments;
                     });
				
				var name = 'images/students/' + row.entity.PhotoFileName;
				name = name.replace("_medium.jpg", "");
				name = name.replace("_medium.JPG", "");
			    $scope.modalDialogImage = name;
				
			    $scope.modalShown = !$scope.modalShown;
			  };
			  
			  $scope.saveStudentDetail = function() {
				  $scope.modalShown = !$scope.modalShown;
				  var myResp = StudentDtoREST.updateStudentComments({},$scope.studentDto);
			  };
			  
			  $scope.cancelStudentDetail = function() {
				  $scope.modalDialogImage = null;
				  $scope.modalShown = !$scope.modalShown;
			  };
			  
			  $scope.hideModal = function() {
				  $scope.modalShown = !$scope.modalShown;
			  }
	          $scope.gridOptions = {
	        	        data: 'myData',
	        	        enablePaging: false,
	        			showFooter: true,
	        	        totalServerItems: 'totalServerItems',
	        	        filterOptions: $scope.filterOptions,
	        	        showFilter: true,
	        	        enableColumnResize: true,
	        	        enableColumnReordering: true,
	        	        showColumnMenu: true,
	        	        showGroupPanel: true,
	        	        multiSelect: false,
	        	        rowHeight: $scope.rowHeight,
	        	        columnDefs: [
	     	        	            {field: "StudentName", width: "150"},
	     	        	            {field: "PhotoFileName", width: "100",
	     	        	            	cellTemplate: '<div ng-click="toggleModal(row)"><img src="images/students/{{row.getProperty(col.field)}}" /></div>'
	     	        	            },
	     	        	            {field: "Class", width: "100"},
	     	        	            {field: "Sex", width: "50"},
	     	        	            {field: "BloodGroup", width: "100"},	     	        	            
	     	        	            {field: "Address", width: "300",
	     	        	            	cellTemplate: '<div>{{row.getProperty(col.field)}}</div>'},
	     	        	            {field: "FatherOccupation", width: "100"},     	        	            
	     	        	            {field: "siblings", width: "100"},
	     	        	            {field: "newspaper", width: "100"},
	     	        	            {field: "Internet", width: "100"},
	     	        	            {field: "vehicle", width: "100"},
	     	        	            {field: "Readinghabit", width: "100", visible: false},
	     	        	            {field: "TVProgramName", width: "100", visible: false},
	     	        	            {field: "FatherName", width: "100", visible: false},
	     	        	            {field: "MotherName", width: "100", visible: false},
	     	        	            {field: "MotherOccupation", width: "100", visible: false},
	     	        	            {field: "VacationActivity", width:"100", visible: false}
	     	        	        ]
	        	    };          
        });

vanavaniControllers.controller('khanAcademyCtrl', 
        function($scope, $location, $http, User) {
	    if (! User.isLogged) {
	    	return;
	    }
		$scope.filterOptions = {
        	        filterText: "",
        	        useExternalFilter: true
        	    }; 
          $scope.totalServerItems = 0;
          $scope.pagingOptions = {
              pageSizes: [250, 500, 1000],
              pageSize: 250,
              currentPage: 1
          };	    
          $scope.setPagingData = function(data, page, pageSize){
        	  var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        	  $scope.myData = pagedData;
        	  $scope.totalServerItems = data.length;
              if (!$scope.$$phase) {
                  $scope.$apply();
              }
          };
          $scope.getPagedDataAsync = function (pageSize, page, searchText) {
              setTimeout(function () {
                  var data;
                  var url = 'jsondata/khanAcademyList.json';
                  
                  if (searchText) {
                      var ft = searchText.toLowerCase();
                      $http.get(url).success(function (largeLoad) {		
                          data = largeLoad.filter(function(item) {
                              return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                          });
                          page = 1;
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
        	        enablePaging: true,
        			showFooter: true,
        	        totalServerItems: 'totalServerItems',
        	        pagingOptions: $scope.pagingOptions,
        	        filterOptions: $scope.filterOptions,
        	        showFilter: true,
        	        showGroupPanel: true,
        	        columnDefs: [
      	        	            {field: "Category", width: 300},
      	        	            {field: "Lesson", width: 600} 
      	        	]
        	    };
          
        });

vanavaniControllers.factory('StudentDTO',
		function() {
			return {
				// augments existing Schedule with convenience methods
				create : function() {
					var studentDto = {
					};
					return studentDto;
				}
			};
		});

vanavaniControllers.factory('StudentDtoREST',
		function($resource) {
			return $resource('php/updateStudentComments.php', {
				regNo : "regNo"
			}, {
				updateStudentComments : {
					method : 'POST',
					headers : {
						'Accept' : 'application/json'
					},
					isArray : true
				}
			});
		});

