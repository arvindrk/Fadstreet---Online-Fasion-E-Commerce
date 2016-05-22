var app = angular.module('fadStreetApp',['ngCookies','ngRoute','ui.router','ngMaterial','ngFileReader', 'ngMessages', 'material.svgAssetsCache']);

////////////////////////////////////////////////////////ROUTE CONFIGURATION////////////////////////////////////////////////////////////////
app.config(function($stateProvider, $urlRouterProvider){

  // For any unmatched url, send to /login
  // $urlRouterProvider.otherwise("/IncomingLists")

  $stateProvider
  .state('login', {
  	url: "/login",
  	templateUrl: "/fadstreet/login.html",
  	controller: "loginController"
  })
  .state('vendor', {
  	url: "/Vendor",
  	templateUrl: "/fadstreet/vendor/vendor.html",
  	controller: "vendorController"
  })
  .state('vendor_dashboard', {
  	url: "/Dasboard",
  	templateUrl: "/fadstreet/vendor/dashboard.html",
  	controller: "vendorController"
  })
  .state('placed_items', {
  	url: "/PlacedLists",
  	templateUrl: "/fadstreet/vendor/placedList.html",
  	controller: "vendorController"
  })
  .state('incoming_items', {
  	url: "/IncomingLists",
  	templateUrl: "/fadstreet/vendor/incomingList.html",
  	controller: "vendorController"
  })
  .state('vendor_profile', {
  	url: "/VendorProfile",
  	templateUrl: "/fadstreet/vendor/vendor_profile.html",
  	controller: "vendorController"
  })
});

///////////////////////////////////////////////////////////LOGIN CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('loginController', ['$scope','$cookieStore','$http','$location','$window',
  function($scope,$cookieStore,$http,$location,$window) {
  	$scope.onClick = function (ev) {
    	$myElementInkRipple.attach($scope, angular.element(ev.target), { center: true });
  	}
    $scope.login = {};
    
    $scope.show_login = true;
    
    $scope.loginForm = function(payload){
  		if(payload.email == 'admin' && payload.password == 'admin'){
  			$window.location.assign('/fadstreet/vendor/vendor.html');
  		}
    }
    $scope.clearForm = function(){
      $scope.login = {};
      $scope.signup= {};
    }
  }]);

///////////////////////////////////////////////////////////LANDING CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('landingController', ['$scope','$cookieStore','$http','$location','$mdDialog','$window',
  function($scope,$cookieStore,$http,$location,$mdDialog,$window) {

  	$scope.sources = ["https://ak0.scstatic.net/1/cdn2-cont6.sweetcouch.com/141379493210628436-calvin-klein-jeans-man-grey-casual.jpg",
    "https://ak2.scstatic.net/1/cdn2-cont13.sweetcouch.com/145595475706736181-calvinklein-innerwear-white-purple-checked-long.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont4.sweetcouch.com/339077-calvin-klein-jeans-women-white-printed.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont9.sweetcouch.com/899539-calvin-klein-jeans-men-white-shirt.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont4.sweetcouch.com/339017-calvin-klein-jeans-women-white-printed.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont5.sweetcouch.com/3406698-calvin-klein-jeans-man-white-blue.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont9.sweetcouch.com/839878-calvin-klein-jeans-women-white-crystal.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont7.sweetcouch.com/142621814719913094-calvin-klein-jeans-white-printed-top.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont4.sweetcouch.com/339568-calvin-klein-jeans-women-white-printed.jpg"];

   // $scope.sources = ["/fadstreet/files/images/File1.jpg",
   // "/fadstreet/files/images/File2.jpg",
   // "/fadstreet/files/images/File3.jpg",
   // "/fadstreet/files/images/File4.jpg",
   // "/fadstreet/files/images/File5.jpg",
   // "/fadstreet/files/images/File6.jpg",
   // "/fadstreet/files/images/File7.jpg",
   // "/fadstreet/files/images/File8.jpg",
   // "/fadstreet/files/images/File9.jpg",
   // "/fadstreet/files/images/File10.jpg",
   // "/fadstreet/files/images/File11.jpg",
   // "/fadstreet/files/images/File12.jpg",
   // "/fadstreet/files/images/File13.jpg"];
    
    $scope.filters = ["/fadstreet/files/images/1a.png",
    "/fadstreet/files/images/2a.png",
    "/fadstreet/files/images/3a.png",
    "/fadstreet/files/images/4a.png",
    "/fadstreet/files/images/5a.png",
    "/fadstreet/files/images/6a.png"];
    
    // $scope.loginForm = function(payload){
    //   // if(payload.email == 'admin' && payload.password == 'admin'){
    //   //  $window.location.assign('/fadstreet/vendor/vendor.html');
    //   // }
    //   $http({
    //     method: 'GET',
    //     url: 'http://127.0.0.1:8081/1'
    //   }).then(function successCallback(response) {
    //       console.log(response.data);
    //       $scope.sampleImage = "http://127.0.0.1:8081/"+response.data.image1;
    //       console.log($scope.sampleImage);
    //     }, function errorCallback(response) {
    //       console.log(response);
    //     });
    // }
    $scope.selected_filters = [];
    $scope.select = function(data){
      $scope.selected_filters.push($scope.filters[data]);
      $scope.filter_selected = true;
      $scope.filter_close = true;
    }
    $scope.remove = function(data){
      console.log($scope.selected_filters[data]);
      $scope.selected_filters.splice(data,1);
      if($scope.selected_filters.length == 0){
        $scope.filter_selected = false;
        $scope.filter_close = false;
      }
    }
    $scope.removeAll = function(){
      $scope.selected_filters = [];
      $scope.filter_selected = false;
      $scope.filter_close = false;
    }
    $scope.women_active = "active";
    $scope.men_active = "inactive";
    $scope.unlike = true;
    $scope.like = false;

  }]);

///////////////////////////////////////////////////////////VENDOR CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('vendorController', ['$scope','$cookieStore','$http','$location','$mdDialog','$window',
  function($scope,$cookieStore,$http,$location,$mdDialog,$window) {
  	$scope.vendor = {name:'Arvind',company:'FadStreet',email:'arvindsuna10@gmail.com'};
    $scope.show_details = true;
    $scope.image = {};
    angular.extend( $scope, {
		onSelected : function( files ){

	    },
		readMethod:"readAsDataURL",
	    //Necessary JSON is created when the file is read from the computer for both Images and Audio.
	    onReaded : function( e, file ){
	    	var image = {};
	    	var replace;
	    	var str;
	    	var newstr;
	    	console.log(e)
	    	console.log(file)
	    	$scope.imgData = e.target.result;
    		replace = /data:image\/jpeg;base64,/
    		str = e.target.result;
    		newstr = str.replace(replace,"");
    		image.url = newstr ;
    		image.filename = e.timeStamp;
    		$scope.image = image;
    		console.log($scope.image);
    		$scope.show_image = true;
	    }
	}); 
	$scope.logout = function(){
		$window.location.assign('/fadstreet/login.html');
	}
  $scope.homePage = function(){
    $window.location.assign('/fadstreet/landing.html');
  }
}]);