var app = angular.module('userLogin',['ui.bootstrap']);

app.controller('userLoginCtrl', function($scope,$http, $window){
	$scope.user = {};
	$scope.login = function(){
		
		$scope.user.email = $scope.email_login;
		$scope.user.password = $scope.password_login;


		$http({
				method : "POST",
				url : '/checkLogin',
				data : {
					"email" : $scope.email_login,
					"password" : $scope.password_login
				}
			}).success(function(result) {
				console.log(result);
				if(result.statusCode == "200"){
					window.location = '/home';
				}
				else if(result.status=="fail")
				{
					if(result.msg=='Incorrect Login'){
						alert("Incorrect Login. Please try again");
					}
				}
			}).error(function(error) {
				$scope.unexpected_error = false;
			});
	}
	
	$scope.signup = function(){
		if($scope.password == $scope.password_c){
				
			$scope.user.firstname = $scope.firstname;
			$scope.user.lastname  = $scope.lastname;
			$scope.user.email     = $scope.email;
			$scope.user.password  = $scope.password;
			
			$http.post('/signup', $scope.user).success(function(data, err){
				if(data.status = 200){
					$window.location.href = '/authenticatePin';
				}
			}).error(function(data,err){
				alert("some internal error has occured");
			});
		}
		
	}
	
});