var app = angular.module("myApp",['ui.router','ui.bootstrap','ui.bootstrap.datetimepicker']);

app.controller("userCtrl",function($scope,$rootScope,$http,$state,$window){
	console.log("am hey dudu ctrl");
	$rootScope.cart = [];
	$scope.gotomyCart = function(){
		$state.go("cartState");
	}
	$scope.logout = function(){

		$http.post("/logout").success(function(data,err){
			if(data.status==200){
				$window.location.href = '/';
			}
		}).error(function(error){
			alert("Something went wrong, please try again");
		});
	}
	
	 $scope.gotomyOrders = function()
	 {
	  	console.log(" I am here");
		 $state.go("myOrdersState");
	 }
      $scope.goToHome = function(){
    	  $state.go("userHomeState");
      }
      $scope.profile = function(){
    	  $state.go("profile");
      }

	$state.go("userHomeState");
});

app.config(function($stateProvider, $urlRouterProvider) {


	  $stateProvider
	    .state("userHomeState", {
	    	views: {
	    		"userHome" : {

	    			  templateUrl : "/userHome",
	    			  controller  : function($scope , $http, $state,$rootScope){
	    				  console.log("am here mannn");
	    				  $scope.r= {type:"name"};
	    				  $http.get("/getAllProducts").success(function(data){

	    					  console.log("Menu items areeee");
	    					  console.log(data);
	    					  $scope.products = data;
	    					  for(i=0;i<$scope.products.length;i++){
	    						  $scope.products[i].isCollapsed=true;
	    						  $scope.products[i].quantity=1;
	    						  $scope.products[i].id = i;
	    						//  console.log($scope.menu);
	    					  }
	    					  
	    					  
		    					 for(i=0;i<$scope.products.length;i++){
		    					  for(j=0;j<$rootScope.cart.length;j++){
		    						  if($scope.products[i].id == $rootScope.cart[j].id){
		    							  console.log("am in two loops");
		    							  $scope.products[i].add = true;
		    	    					  $scope.products[i].remove = true;
		    						  }
		    					  }
		    				  }
		    				  
	    					  
	    					  $scope.search = function(item){
	    						  
	    						  if($scope.searchTerm == undefined){
	    							  return true;
	    						  }else{
	    							  if($scope.r.type === "name"){
	    								  if(item.ProductName.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) != -1){
			    							  return true;
			    						  }    
	    							  }
	    							  if($scope.r.type=== "category"){
	    								  if(item.Category.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) != -1){
			    							  return true;
			    						  }    
	    							  }
	    							  if($scope.r.type === "vendor"){
	    								  if(item.Name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) != -1){
			    							  return true;
			    						  }    
	    							  }
	    						  }
	    						  
	    						  return false;
	    					  }
	    					  
//	    					  var category = [];
//	    					  $scope.finalMenu =[];
//
//	    					  for(i=0;i<$scope.menu.length;i++){
//	    					  console.log(category.indexOf($scope.menu[i].category));
//	    					   if(category.indexOf($scope.menu[i].category)== -1)
//	    					  {
//	    					    category.push($scope.menu[i].category);
//	    					  }
//	    					  }
//	    					  console.log("my category"+category);
//
//	    					  for(i=0;i<category.length;i++){
//	    					    $scope.finalMenu.push({"category":category[i],"items":[]});
//	    					  }
//
//
//	    					  for(i=0;i<$scope.menu.length;i++){
//	    					     for(j=0;j<$scope.finalMenu.length;j++){
//	    					       if($scope.menu[i].category==$scope.finalMenu[j].category){
//	    					          $scope.finalMenu[j].items.push($scope.menu[i]);
//	    					       }
//	    					     }
//	    					  }
//
//
//
//	    					  //console.log($scope.menu.items);
//	    					  console.log($scope.finalMenu);
	    				  }).error(function(error){

	    				  });
	    				  
	    				  




	    				 /* if($scope.menu){
	    					 for(i=0;i<$scope.menu.length;i++){
	    					  for(j=0;j<$rootScope.cart.length;j++){
	    						  if($scope.menu[i].menuId == $rootScope.cart[j].menuId){
	    							  console.log("am in two loops");
	    							  $scope.menu[i].add = true;
	    	    					  $scope.menu[i].remove = true;
	    						  }
	    					  }
	    				  }
	    				  }*/

	    				  $scope.add = function(product){
//	    					  console.log($scope.products[index]);
//	    					  $scope.products[index].add = true;
//	    					  $scope.products[index].remove = true;
	    					  product.add = true;
	    					  product.remove = true;
	    					  $rootScope.cart.push(product);
	    					  console.log($rootScope.cart);
	    				  }

	    				  $scope.remove = function(product){
	    					  console.log(index);
//	    					  $scope.products[index].add = false;
//	    					  $scope.products[index].remove = false;
	    					  product.add = false;
	    					  product.remove = false;
	    					  var id = product.id;
	    					  for(i=0;i<$rootScope.cart.length;i++){
	    						  if($rootScope.cart[i].id===id){
	    							  var index = $rootScope.cart.indexOf($rootScope.cart[i]);
	    							  $rootScope.cart.splice(index,1);
	    						  }
	    					  }
	    					  console.log($rootScope.cart);
	    				  }

	    				  $scope.goToCart= function(){
	    					  $state.go("cartState");
	    				  }

	    				  $scope.goToCheckout = function(){
	    					  $state.go("checkoutState");
	    				  }
	    				  $scope.gotomyOrders = function()
		    				 {
	    					  	console.log(" I am here");
		    					 $state.go("myOrdersState");
		    				 }



	    			  }

	    	}}

	    }).state("cartState", {
	    	views: {
	    		"cart" : {

	    			  templateUrl : "/cart",
	    			  controller  : function($scope , $http, $state,$rootScope){

	    				  $scope.values=[1,2,3,4,5,6,7,8,9,10];
	    				  $rootScope.totalPrice = 0;
	    				  for(i=0;i<$rootScope.cart.length;i++){
	    					  $rootScope.totalPrice = $rootScope.totalPrice+($rootScope.cart[i].ProductPrice*$rootScope.cart[i].quantity);
	    				  }
	    				  
	    				  $scope.totalPriceUpdate = function(){
	    					  console.log("I am here");
	    					  for(i=0;i<$rootScope.cart.length;i++){
		    					  $rootScope.totalPrice = $rootScope.totalPrice+($rootScope.cart[i].ProductPrice*$rootScope.cart[i].quantity);
		    				  }
	    				  }
	    				 $scope.remove = function(item,index){
	    					 $rootScope.cart.splice(index,1);
	    					 console.log($rootScope.totalPrice);

	    					 $rootScope.totalPrice = 0;
	    					 console.log("am after zero");
	    					 console.log($rootScope.totalPrice);
	    					 for(i=0;i<$rootScope.cart.length;i++){
		    					  $rootScope.totalPrice = $rootScope.totalPrice +($rootScope.cart[i].ProductPrice*$rootScope.cart[i].quantity);

	    					 }
	    					 console.log($rootScope.cart);
	    				 }

	    				 $scope.updatePrice = function(){
	    					 
	    					 console.log($rootScope.totalPrice);
	    					 $rootScope.totalPrice = 0;

	    					 for(i=0;i<$rootScope.cart.length;i++){

		    					  $rootScope.totalPrice = $rootScope.totalPrice + (($rootScope.cart[i].ProductPrice)*($rootScope.cart[i].quantity));

	    					 } 
	    				 }
	    				 

	    				 $scope.goBack = function()
	    				 {

	    					 $state.go("userHomeState");
	    				 }
	    				 $scope.goToCheckout = function(){
	    					  $state.go("checkoutState");
	    				  }
	    				 
	    				 $scope.gotomyOrders = function()
	    				 {
	    					 console.log("I am here again")
	    					 $state.go("myOrdersState");
	    				 }
	    			  }

	    	}}

	    }).state("myOrdersState", {
	    	views: {
	    		"myOrders" : {

	    			  templateUrl : "/myOrders",
	    			  controller  : function($scope , $http, $state,$rootScope){
	    				  
	    				  $http.get("/viewOrders").success(function(data){
	    					 $scope.orders = data;
	    					 console.log($scope.orders);
	    					  for(i=0;i<$scope.orders.length;i++){
	    						  $scope.orders[i].isCollapsed=true;
	    						  
	    						  console.log($scope.orders);
	    					  }
	    				  }).error(function(error){
	    					  console.log("Something went wrong, please try again");
	    				  });
	    				  $scope.getOrderDetails = function(order,index){
	    					  order.isCollapsed = !order.isCollapsed;
	    					  
	    					  //console.log(order.id);
	    					  $http.post("/getOrderDetails",{"id" : order.order_id}).success(function(details){
	    						  console.log("am in order menu items");
	    						  console.log(details);
	    						  $scope.orders[index].menus = details;
	    					  }).error(function(error){
	    						  alert("Something went wrong");
	    					  })
	    				  }
	    				  $scope.cancelOrder = function(index){
	    					  console.log("in cancel");
	    					  console.log($scope.orders[index]);
	    					  
	    					  $http.post("/cancelOrder",{"id":$scope.orders[index].order_id}).success(function(data){
	    						  if(data == "200"){
	    							  alert("Order Cancelled Successfully");
	    							  $state.go($state.current, {}, {reload: true});
	    						  }
	    						  else{
	    							  alert("something went wrong");
	    							  $state.go("myOrders");
	    						  }
	    					  
	    					  
	    					  })
	    				  }

	    			  }

	    	}}

	    }).state("checkoutState", {
	    	views: {
	    		"checkout" : {

	    			  templateUrl : "/checkout",
	    			  controller  : function($scope , $http, $state,$rootScope){
	    				  
	    				  
	    				  
	    				  $scope.toggleMinDate = function() {
	    					    var minDate = new Date();
	    					    var maxDate = new Date();
	    					    // set to yesterday
	    					    minDate.setDate(minDate.getDate());
	    					    maxDate.setDate(maxDate.getDate()+30);
	    					    $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : minDate;
	    					    $scope.dateOptions.maxDate = $scope.dateOptions.maxDate ? null : maxDate;
	    					  };
	    					  $scope.dateOptions = {
	    							    showWeeks: false,
	    							    startingDay: 0
	    							  };
	    					  
	    					  $scope.toggleMinDate();  
	    				  $rootScope.totalPrice = 0;
	    				  //$scope.minDate = new Date();
	    				  //$scope.dateOptions.minDate = new Date();
	    				  //$scope.dateOptions.maxDate = $scope.dateOptions.minDate.setDate($scope.dateOptions.minDate.getDate() + 30);
	    				  $scope.format = "dd-MMM-yyyy";
	    				  for(i=0;i<$rootScope.cart.length;i++){
	    					  $rootScope.totalPrice = $rootScope.totalPrice+($rootScope.cart[i].ProductPrice*$rootScope.cart[i].quantity);
	    				  }

	    				  $scope.values=[1,2,3,4,5,6,7,8,9,10];
	    				 $scope.times = ["6:00AM","6:30AM","7:00AM","7:30AM","8:00AM","8:30AM","9:00AM","9:30AM","10:00AM","10:30AM","11:00AM","11:30AM","12:00PM",
	    				                  "12:30PM","1:00PM","1:30PM","2:00PM","2:30PM","3:00PM","3:30PM","4:00PM","4:30PM","5:00PM","5:30PM","6:00PM","6:30PM","7:00PM",
	    				                  "7:30PM","8:00PM","8:30PM","9:00PM"];
	    				  $scope.goBack = function()
		    				 {

		    					 $state.go("cartState");
		    				 }
	    				  $scope.gotomyOrders = function()
		    				 {
	    					  console.log("I am here as well")
		    					 $state.go("myOrdersState");
		    				 }
	                     $scope.cancelOrder = function(){
	                    	 $rootScope.cart = [];
	                    	 alert("You Clicked on cancel, Cart is refreshed");
	                    	 $state.go("userHomeState");
	                     }   				  

	    				  $scope.placeOrder=function(){
	    					  $http({
	    							method : "POST",
	    							url : '/placeOrder',
	    							data : {
	    								"products":$rootScope.cart
	    							}
	    						}).success(function(result) {
	    							console.log(result);
	    							if(result.statusCode == "200"){
	    								alert("Order placed Successfully");
	    								$rootScope.cart =[];
	    								$state.go("userHomeState");
	    							}
	    							else
	    							{
	    								
	    									alert("Something Went Wrong. Please try again");
	    								
	    							}
	    						}).error(function(error) {
	    							$scope.unexpected_error = false;
	    						});



	    				  }

	    				  function isWithinBusinessHours(pickupDate){
	    					  
	    					  var hours = pickupDate.getHours();
	    					  var minutes = pickupDate.getMinutes();
	    					  
	    					  if(hours < 6 || (hours == 21 && minutes > 0) || hours > 21)
	    						  return false;
	    					  else
	    						  return true;
	    					  
	    				  }


	    			  }

	    	}}

	    }).state("menuAnalytics", {
	    	views: {
	    		"menuAnalyticsView" : {

	    			  templateUrl : "/menuAnalytics",
	    			  controller  : function($scope , $http, $state,$rootScope){
	    				  
	    				 
	    				  $scope.getMenuAnalytics = function(){
	    					  console.log($scope.fromDate.getTime());
	    					  console.log($scope.toDate.getTime());
	    				  
	    				  $http.post("/getMenuAnalytics",{"fromDate":$scope.fromDate.getTime(),"toDate":$scope.toDate.getTime()}).success(function(data){
	    					 console.log(data);
                             $scope.menus = data;
	    					  for(i=0;i<$scope.menus.length;i++){
	    						  $scope.menus[i].isCollapsed=true;
	    						 
	    					  }

	    					  var category = [];
	    					  $scope.finalMenu =[];

	    					  for(i=0;i<$scope.menus.length;i++){
	    					  console.log(category.indexOf($scope.menus[i].category));
	    					   if(category.indexOf($scope.menus[i].category)== -1)
	    					  {
	    					    category.push($scope.menus[i].category);
	    					  }
	    					  }
	    					  console.log("my category"+category);

	    					  for(i=0;i<category.length;i++){
	    					    $scope.finalMenu.push({"category":category[i],"items":[]});
	    					  }


	    					  for(i=0;i<$scope.menus.length;i++){
	    					     for(j=0;j<$scope.finalMenu.length;j++){
	    					       if($scope.menus[i].category==$scope.finalMenu[j].category){
	    					          $scope.finalMenu[j].items.push($scope.menus[i]);
	    					       }
	    					     }
	    					  }



	    					  
	    					  console.log($scope.finalMenu);
	    					
	    					 
	    					
	    					
	    				 }).error(function(error){
	    					 
	    				 });
	    			}

	    			  }

	    	}}

	    }).state("profile", {
	    	views: {
	    		"profileView" : {

	    			  templateUrl : "/profile",
	    			  controller  : function($scope , $http, $state,$rootScope){
	    				  
	    				
	    				  
	    				  $http.get("/getProfile").success(function(data){
	    					 
	    					 console.log(data);
	    					 $scope.user = data.profile;
	    					
	    					
	    				 }).error(function(error){
	    					 
	    				 });
	    				  
	    				 $scope.saveProfile = function(){
	    					 $http({
	    							method : "POST",
	    							url : '/saveProfile',
	    							data : {
	    								"user":$scope.user
	    							}
	    						}).success(function(result) {
	    							console.log(result);
	    							if(result.statusCode == "200"){
	    								alert("Profile Updated Successfully");
	    								$state.go("userHomeState");
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

	    			  }

	    	}}

	    })

});

