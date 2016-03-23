var app = angular.module('fadStreetApp',['ngCookies','ngRoute','ui.router','ngMaterial','ngFileReader']);

////////////////////////////////////////////////////////ROUTE CONFIGURATION////////////////////////////////////////////////////////////////
app.config(function($stateProvider, $urlRouterProvider){

  // For any unmatched url, send to /login
  $urlRouterProvider.otherwise("/IncomingLists")

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

///////////////////////////////////////////////////////////ADJUST LAYOUT ON IMAGE LOAD///////////////////////////////////////////////////////////////////

app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                var $grid = $('.grid').masonry();
                $(window).on("load", function() {
                  $grid.masonry('layout');
                });
            });
        }
    };
});

///////////////////////////////////////////////////////////LOGIN CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('loginController', ['$scope','$cookieStore','$http','$location','$window',
  function($scope,$cookieStore,$http,$location,$window) {
  	$scope.onClick = function (ev) {
    	$myElementInkRipple.attach($scope, angular.element(ev.target), { center: true });
  	}
    $scope.login = {};
    $scope.url = "";
    $scope.show_login = true;
    
    $scope.loginForm = function(payload){
		if(payload.email == 'admin' && payload.password == 'admin'){
			$window.location.assign('/fadstreet/vendor/vendor.html');
		}
		// $http.post($scope.url,payload)
		// .then(function successCallback(response) {
		//     // this callback will be called asynchronously
		//     // when the response is available
		//   }, function errorCallback(response) {
		//     // called asynchronously if an error occurs
		//     // or server returns response with an error status.
		//   });
    }
    $scope.clearForm = function(){
      $scope.login = {};
      $scope.signup= {};
    }
  }]);
///////////////////////////////////////////////////////////LANDING CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('landingController', ['$scope','$cookieStore','$http','$location','$window',
  function($scope,$cookieStore,$http,$location,$window) {

  	$scope.sources = ["https://ak0.scstatic.net/1/cdn2-cont6.sweetcouch.com/141379493210628436-calvin-klein-jeans-man-grey-casual.jpg",
    "https://ak2.scstatic.net/1/cdn2-cont13.sweetcouch.com/145595475706736181-calvinklein-innerwear-white-purple-checked-long.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont4.sweetcouch.com/339077-calvin-klein-jeans-women-white-printed.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont9.sweetcouch.com/899539-calvin-klein-jeans-men-white-shirt.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont4.sweetcouch.com/339017-calvin-klein-jeans-women-white-printed.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont5.sweetcouch.com/3406698-calvin-klein-jeans-man-white-blue.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont9.sweetcouch.com/839878-calvin-klein-jeans-women-white-crystal.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont7.sweetcouch.com/142621814719913094-calvin-klein-jeans-white-printed-top.jpg",
    "https://ak0.scstatic.net/1/cdn2-cont4.sweetcouch.com/339568-calvin-klein-jeans-women-white-printed.jpg"];

    $scope.filters = ["https://static.donde-app.com/icons/NEWICONS/Domain_dress.png",
    "https://static.donde-app.com/icons/NEWICONS/Domain_top.png",
    "https://static.donde-app.com/icons/NEWICONS/Domain_sweater.png",
    "https://static.donde-app.com/icons/NEWICONS/Domain_pants.png",
    "https://static.donde-app.com/icons/NEWICONS/Domain_coat.png",
    "https://static.donde-app.com/icons/NEWICONS/Domain_skirt.png",
    "https://static.donde-app.com/icons/NEWICONS/Domain_swimsuit.png",
    "https://static.donde-app.com/icons/NEWICONS/Domain_shoes.png",
    "https://static.donde-app.com/icons/NEWICONS/Domain_bag.png"];
    
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

    $scope.login = function(){
      $window.location.assign('/fadstreet/login.html');
    }
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