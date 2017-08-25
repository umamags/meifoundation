'use strict';

/* Controllers */
var meiFoundationControllers = angular.module('meiFoundationControllers', []);

meiFoundationControllers.controller('teachersListCtrl', [ '$scope', 'Teacher',
		function($scope, Teacher) {
			$scope.teachers = Teacher.query();
			$scope.orderProp = 'sno';

			$scope.modalShown = false;
			$scope.toggleModal = function(imageName) {
				var name = imageName;
				name = name.replace("_medium.jpg", "");
				name = name.replace("_medium.JPG", "");
			    $scope.modalDialogImage = name;

			    $scope.modalShown = !$scope.modalShown;
			};
		} ]);

meiFoundationControllers.controller('photoShowAllCtrl', [ '$scope', '$routeParams',
		'Photo', function($scope, $routeParams, Photo) {
			$scope.photos = Photo.query({
				folderName : $routeParams.folderName
			}, function(photo) {
			});
		} ]);

meiFoundationControllers.controller('photoDetailCtrl', [ '$scope', '$routeParams',
		function($scope, $routeParams) {
			var name = $routeParams.imageName;
			name = name.replace("_medium.jpg", "");
			name = name.replace("_medium.JPG", "");

			$scope.folderName = $routeParams.folderName;
			$scope.imageName = name;
		} ]);

meiFoundationControllers.controller('loginCtrl', [ '$scope', '$http', 'User',
		function($scope, $http, User) {
			$scope.User = User;
            if (User.isLogged) {
            	$("#adminMenu").show();
            }
			$scope.login = function() {
				var url = "php/LoginService.php?username=" + $scope.User.username + "&password=" + $scope.User.password;
                $http.get(url).success(function (response) {
                    User.password = "";
                    User.isLogged = response[0].loggedin;
                    if (User.isLogged == "true") {
        				User.username = $scope.username;
        				$("#adminMenu").show();
                    } else {
                    	User.error = response[0].error;
                    	console.log(User.error);
                    	$("#adminMenu").hide();
                    }
    				$scope.User = User;
                });
			}

			$scope.logout = function() {
				var url = "php/ReadCookie.php?action=delete";
                $http.get(url).success(function (response) {
                    User.password = "";
                    User.isLogged = response[0].loggedin;
                    User.username = response[0].username;
                    $scope.User = User;
                });
				User.isLogged = "false";
				User.username = "";
				User.password = "";
				$scope.User = User;
				$("#adminMenu").hide();
			}

		} ]);

meiFoundationControllers.controller('teachersSectionCtrl', [ '$scope', '$routeParams', 'User',
		function($scope, $routeParams, User) {
			console.log(User);
		    if (User.isLogged) {
		    	$("#adminMenu").show();
		    }
		} ]);

meiFoundationControllers.controller('photoTreeCtrl', [ '$scope', '$routeParams',
                                          		function($scope, $routeParams) {
                                          		} ]);

meiFoundationControllers.controller('mentorsCtrl', [ '$scope', '$routeParams',
		function($scope, $routeParams) {
		} ]);

meiFoundationControllers.controller('aboutTheSchoolCtrl', [ '$scope',
		'$routeParams', function($scope, $routeParams) {
		} ]);

meiFoundationControllers.controller('homeCtrl', [ '$scope', function($scope) {
	$scope.$on('$viewContentLoaded', function() {
		window.scrollTo(0, 0);
		$("#circle0").addClass("circleActive");
		$("#circle1").addClass("circleActive");
		$("#circle2").addClass("circleActive");
		$("#circle3").addClass("circleActive");
		$("#circle4").addClass("circleActive");
		$("#circle5").addClass("circleActive");
	});
} ]);

meiFoundationControllers.controller('ptaCtrl', [ '$scope', function($scope) {
} ]);

meiFoundationControllers.controller('photoGalleryCtrl', [ '$scope',
		function($scope) {
		} ]);

meiFoundationControllers.controller('videoGalleryCtrl', [ '$scope',
		function($scope) {
		} ]);

meiFoundationControllers.controller('showCaseCtrl', [ '$scope', function($scope) {
} ]);

meiFoundationControllers.controller('contactUsCtrl', [ '$scope', function($scope) {
} ]);

meiFoundationControllers.controller('jobsCtrl', [ '$scope', function($scope) {
} ]);
meiFoundationControllers.controller('trusteesCtrl', [ '$scope', function($scope) {
} ]);
meiFoundationControllers.controller('newsLetterCtrl', [ '$scope', function($scope) {
} ]);
meiFoundationControllers.controller('studentParticularsCtrl', [ '$scope',
		function($scope) {
		} ]);
meiFoundationControllers.controller('goalsCtrl', [ '$scope', function($scope) {
} ]);
meiFoundationControllers.controller('howToSponsorCtrl', [ '$scope',
		function($scope) {
		} ]);
meiFoundationControllers.controller('thankYouCtrl', [ '$scope', function($scope) {
} ]);
