app = angular.module('myApp',['ui.router','ui.bootstrap']);
app.controller('admin_login',['$scope','$http','$state','$window', function($scope, $http, $state, $window){
$scope.submit=function(){
if($scope.username == "admin" && $scope.password =="admin"){
	console.log('got backk from verification');
	$window.location.href = "/adminHome";
	
}else{
	alert("Invalid Username and Password");
}
		
}

$scope.logout = function(){
	$window.location.href = "/admin";
}
}
]);
