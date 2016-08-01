var app = angular.module('fadStreetApp',['ngCookies', 'ngRoute', 'ngMaterial', 'ngFileReader']);

///////////////////////////////////////////////////////////NAVTAB CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('navtabController', ['$scope','$cookies','$http','$location','$window','$mdToast','loginService','$timeout',
  function($scope,$cookies,$http,$location,$window,$mdToast,loginService,$timeout) {

    $scope.women_active = "active";
    $scope.men_active = "inactive";

    $scope.products = {};
    $scope.filters = [];

    $scope.showLoader = false;
    $scope.unlike = true;
    $scope.like = false;
    $scope.unlike_local = true;
    $scope.like_local = false;

    $scope.show_user = loginService.show_user;
    $scope.loggedIn = loginService.loggedIn;
                          
    $("#brandLogo").show();
    $("#smallLogo").hide();
    $("cartbutton").show();

    // $scope.userEmail = $cookies.get('activeUser');

    $scope.init = function(){
      var men = $cookies.get('menStatus');
      var women = $cookies.get('womenStatus');
      var showToastOnce = true;
      $scope.show_container = "container";
      
      $scope.rangeFilter = {};
      $scope.rangeFilter.start_value = 500;
      $scope.rangeFilter.end_value = 4000;

      $( window ).resize(function() {
        if(window.innerWidth <= 550){
          $("#brandLogo").hide();
          $("#signout").hide();
          $("#smallLogo").show();
          $("cartbutton").hide();
          $timeout(function() {
            if(showToastOnce){
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Welcome to FadStreet!')
                  .position('top')
                  .hideDelay(3000)
              );
              showToastOnce = false;
            }
          }, 2000);
        }
        else{
          $("#signout").show();
          $("#brandLogo").show();
          $("#smallLogo").hide();
          $("cartbutton").show();
        }
      });

      if(men == 'active')
        $scope.men();
      else
        $scope.women();

      $("#range").ionRangeSlider({
          type: "double",
          min: 100,
          max: 5000,
          from: 500,
          to: 2500,
          step: 10,
          onStart: function (data) {
              // console.log(data);
          },
          onChange:  function (data) {
              // console.log(data);
              $scope.rangeFilter.start_value = data.from;
              $scope.rangeFilter.end_value = data.to;
              console.log($scope.rangeFilter.start_value + " " + $scope.rangeFilter.end_value);
          },
          onFinish:  function (data) {
              // console.log(data);
          },
          onUpdate:  function (data) {
              // console.log(data);
              $scope.rangeFilter.start_value = data.from;
              $scope.rangeFilter.end_value = data.to;
              console.log($scope.rangeFilter.start_value + " " + $scope.rangeFilter.end_value);
          }
      });
    }

    $scope.setDefault = function(){
      $scope.show_container = "container";
      $scope.show_filterBox = false;
      $("#main_container").attr("align","center");
      $scope.selected_filters = [];
      $scope.base_filter = true;
      $scope.filter_selected = false;
      $scope.filter_close = false;
      $scope.end_of_filter = false;
      $scope.filter_title = null;
      $scope.base_layer = true;
      $(".filter_icons").css({ top: '10vh' });
      $(".filter_icons").css({ left: '0' });
      $scope.leftArrow = true;
      $scope.rightArrow = true;
    }

    $scope.men = function (){
      $scope.setDefault();
      $scope.base_filter = false;

      $scope.showLoader = true;
      $scope.women_active='inactive';
      $scope.men_active='active';

      $cookies.put('menStatus',$scope.men_active);
      $cookies.remove('womenStatus');
      $cookies.put('womenStatus',$scope.women_active);

      $scope.getFilters(1);
      $scope.getProducts();

      $scope.showLoader = false;
      
      $timeout(function() {
        $scope.base_filter = true;
      }, 1500);
    }
    
    $scope.women = function(){
      $scope.setDefault();
      $scope.base_filter = false;

      $scope.show_login=true;$scope.show_signup = false;

      $scope.women_active='active';
      $scope.men_active='inactive';
      $cookies.put('womenStatus',$scope.women_active);
      $cookies.remove('menStatus');
      $cookies.put('menStatus',$scope.men_active);
      
      $scope.showLoader = true;
      
      $scope.getFilters(2);
      $scope.getProducts();

      $scope.showLoader = false;
      
      $timeout(function() {
        $scope.base_filter = true;
      }, 500);
    }
    
    $scope.getProducts = function(){
      if($scope.men_active == 'active'){
        $http({
          method: 'GET',
          url: 'http://13.75.44.45/userLogin/api/users/productsMen'
        }).then(function successCallback(response) {
            $scope.products = response.data;
          }, function errorCallback(response) {
            console.log(response);
          });
      }
      else if($scope.women_active == 'active'){
        $http({
        method: 'GET',
        url: 'http://13.75.44.45/userLogin/api/users/products'
      }).then(function successCallback(response) {
          $scope.products = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      }
    }

    $scope.getFilters = function(payload){
      $http({
        method: 'GET',
        url: 'http://13.75.44.45/userLogin/api/users/filterSearch'
      }).then(function successCallback(response) {
          $scope.filters = [];
          if($scope.women_active == 'active'){
            for (var i = 0; i < 9; i++) {
              $scope.filters.push(response.data[i]);
            }
          }
          else if($scope.men_active == 'active'){
            for (var i = 9; i < response.data.length; i++) {
              $scope.filters.push(response.data[i]);
            }
          }
        }, function errorCallback(response) {
          console.log(response);
        });
    }

    $scope.end_of_filter = false;
    $scope.getNewFilters = function(data1,data2){
      var payload = {};
      payload.firstLevel = data1;
      payload.currentLevel = data2;
      console.log(payload);
      if($scope.end_of_filter == false){
        $http({
          method: 'POST',
          url: 'http://13.75.44.45/userLogin/api/users/DummysubFilter',
          data: payload
        }).then(function successCallback(response) {
            console.log(response.data[0]);
            $scope.filters = response.data;
            $scope.filter_title = $scope.filters[0].currentLevel;
          }, function errorCallback(response) {
            console.log(response);
          });
      }
    }

    $scope.selected_filters = [];
    $scope.selectFilter = function(data,product){
      $scope.filter_selected = true;
      $scope.filter_close = true;
      $scope.base_layer = false;

      $(".filter_icons").css({ 'top': '4vh' });
      $(".filter_icons").css({ 'left': '2vh' });
      $scope.show_container = "container-fluid";
      $scope.show_filterBox = true;
      $('#main_container').removeAttr('align');
      $(".products").css({ 'width': '75vw'});

      if($scope.selected_filters.indexOf($scope.filters[data]) == -1){
        var filterUrl = 'http://13.75.44.45/userLogin/api/users/filter/'+data;
        // $http({
        //   method: 'POST',
        //   url: filterUrl
        // }).then(function successCallback(response) {
        //     $scope.products = response.data;
        //   }, function errorCallback(response) {
        //     console.log(response);
        //   });
        
        $scope.base_filter = false;
        // TO CHECK IF SKIP IS NOT ADDED TO THE SELECTED FILTERS LIST
        if(data < $scope.filters.length - 1)
          $scope.selected_filters.push($scope.filters[data]);
        
        if($scope.end_of_filter == false)
          $scope.filters = [];
        
        $scope.getNewFilters(product.baseFilter,product.nextLevel);
        if(product.nextLevel == "pattern"){
          $scope.end_of_filter = true;
          $scope.rightArrow = false;
        }
        else{
          $scope.end_of_filter = false;
          $scope.rightArrow = true;
        }

        $scope.base_filter = true;
      }
    }

    $scope.remove = function(data,payload,product){
      if(data == 0){
        $scope.setDefault();
        $scope.getProducts();
        $scope.getFilters();
      }
      else{
        // console.log(product);
        if($scope.end_of_filter == true){
          $scope.selected_filters.splice(data,1);
          $scope.end_of_filter = false;
        }
        else{
          $scope.selected_filters.splice(data,1);
          $scope.getNewFilters(product.baseFilter,product.currentLevel);
        }
        if($scope.selected_filters.length == 0){
          $scope.remove(0);
        }
      }
    }
    
    $scope.selectProduct = function(payload){
      $cookies.put('productId',payload);
      $cookies.put('womenStatus',$scope.women_active);
      $window.location.assign('/fadstreet/single_product.html');
    }

    $scope.addToWishlist = function(data){
      $scope.unlike_local=!$scope.unlike_local;
      $scope.like_local=!$scope.like_local;
      var payload = {};
      payload.productId = data;
      payload.username = $cookies.get('activeUser');

      if($scope.like_local == true){
        console.log("CALLING LIKE");
        $http({
          method: 'POST',
          url: 'http://13.75.44.45/userLogin/api/users/addProductToWishlist',
          data: payload
        }).then(function successCallback(response) {
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
          });
      }
      else if($scope.unlike_local == true){
        // console.log("CALLING UNLIKE");
        // $http({
        //   method: 'POST',
        //   url: 'http://13.75.44.45/userLogin/api/users/removeFromWishlist',
        //   data: payload
        // }).then(function successCallback(response) {
        //     console.log(response);
        //   }, function errorCallback(response) {
        //     console.log(response);
        //   });
      }
    }

    //--------------------INFINITE SCROLLING--------------------//
    $scope.getMoreProducts = function(){
      if($scope.women_active == 'active'){
        $http({
        method: 'GET',
        url: 'http://13.75.44.45/userLogin/api/users/products'
      }).then(function successCallback(response) {
          for (var i = 0; i < response.data.length; i++) {
            $scope.products.push(response.data[i]);
          }
        }, function errorCallback(response) {
          console.log(response);
        });
      }
      else if($scope.men_active == 'active'){
        $http({
        method: 'GET',
        url: 'http://13.75.44.45/userLogin/api/users/productsMen'
      }).then(function successCallback(response) {
          for (var i = 0; i < response.data.length; i++) {
            $scope.products.push(response.data[i]);
          }
        }, function errorCallback(response) {
          console.log(response);
        });
      }
    }

    $scope.eventFiredOnce = false;
    $scope.initialValue = 1570;

    window.onscroll = function () {
      var initial = 270;
      var current = window.pageYOffset;

      var el = $('.filter_box'); 
      var isPositionFixed = (el.css('position') == 'fixed');
      if ($(this).scrollTop() > 320 && !isPositionFixed && !$scope.base_layer){ 
        $('.filter_box').css({'position': 'fixed', 'top': '80px'});
        $(".products").css({ 'left': '23vw'});
      }
      if ($(this).scrollTop() < 320 && isPositionFixed && !$scope.base_layer){
        $('.filter_box').css({'position': 'relative', 'top': '-65vh'}); 
        $(".products").css({ 'left': '0'});
      }

      if(current > 1000)
        $('.scrollTop').addClass('scrollShow').removeClass('scrollHide');
      else
        $('.scrollTop').addClass('scrollHide').removeClass('scrollShow');

      if(current < 2500){
        if($scope.eventFiredOnce == false){
          if(current > initial + 1300){
            $scope.showLoader = true;
            $scope.getMoreProducts();
            $scope.showLoader = false;
            $scope.eventFiredOnce = true;
          }
        }
      }
      else{
        if(current > $scope.initialValue + 2000){
          $scope.showLoader = true;
          console.log(current);
          $scope.getMoreProducts();
          $scope.showLoader = false;
          $scope.initialValue += 2000;
        }
      }
      $scope.$digest();
    };
    //------------------INFINITE SCROLLING END------------------//

    $scope.scrollToTop = function(){
      console.log("Scrolling top");
      $("body").animate({scrollTop: 0}, "slow");
    }

    $scope.homePage = function(){
      $window.location.assign('/');
    }
  }]);
///////////////////////////////////////////////////////////NAVTAB CONTROLLER END///////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////LOGIN CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('loginController', ['$scope','$cookies','$http','$location','$timeout','$mdToast','$window','loginService',
  function($scope,$cookies,$http,$location,$timeout,$mdToast,$window,loginService) {
    $scope.login = {};
    
    $scope.show_user = loginService.show_user;
    $scope.loggedIn = loginService.loggedIn;
    // $scope.productId = productService.productId;

    $scope.show_login = true;
    
    $scope.password_error = false;
    $scope.email_error = false;
    $scope.noEmail_error = false;
    $scope.user_error = false;
    $scope.emailValid = false;
    $scope.passwordValid = false;

    $scope.initialize = function(){
      var ifUser = $cookies.get('activeUser');
      var ifName = $cookies.get('name');

      // console.log(ifUser + " " + ifName);

      if(ifUser != null){
        $('#modal').modal('hide');
        $scope.show_user[0] = ifName;
        $scope.loggedIn[0] = true;
      }
    }

    $scope.checkPassword = function(data){
      if(data != null){
        if(data.length < 8 || data.length == 0){
          $scope.password_error = true;
            document.getElementById("password").style.borderColor =  "red";
        }
        else{
          $scope.password_error = false;
          $scope.passwordValid = true;
          document.getElementById("login_password").style.borderColor =  "gray"; 
          document.getElementById("password").style.borderColor =  "gray"; 
        }
      }
      else{
        $scope.password_error = true;
        document.getElementById("password").style.borderColor =  "red";
      }
    }

    $scope.checkEmail = function(data,payload){
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(data.match(mailformat)){
        $scope.emailValid = true;
        $scope.email_error = false; 
        document.getElementById("login_email").style.borderColor =  "gray";
        document.getElementById("email").style.borderColor =  "gray";
      }
      else{
        $scope.email_error = true;
        if(payload == 0)
          document.getElementById("login_email").style.borderColor =  "red";
        else
          document.getElementById("email").style.borderColor =  "red";
      }
    }

    $scope.setDefault = function(data){
      if(data == 0){
        $scope.show_signup=true;
        $scope.show_login=false;
      }
      else if(data == 1){
        $scope.show_signup=false;
        $scope.show_login=true;
      }
      $scope.password_error = false;
      $scope.email_error = false;
      $scope.noEmail_error = false;
      $scope.user_error = false;
      $scope.login = {};
      $scope.signup= {};
      document.getElementById("login_password").style.borderColor =  "gray";
      document.getElementById("login_email").style.borderColor =  "gray";
      document.getElementById("password").style.borderColor =  "gray";
      document.getElementById("email").style.borderColor =  "gray";
      document.getElementById("name").style.borderColor =  "gray";
    }

    $scope.signupForm = function(payload){
      $scope.checkEmail(payload.username,1);
      $scope.checkPassword(payload.password,1);
      if($scope.emailValid == true && $scope.passwordValid == true){
        $http({
          method: 'POST',
          url: 'http://13.75.44.45/userLogin/api/users',
          data: payload
        }).then(function successCallback(response) {
            $cookies.put('activeUser',payload.username);
            $cookies.put('name',payload.name);
            $scope.show_user[0] = payload.name;
            $scope.loggedIn[0] = true;
            $scope.clearForm();
            $('#modal').modal('hide');
            $mdToast.show(
              $mdToast.simple()
                .textContent('Welcome, '+$scope.show_user+'!')
                .position('top right')
                .hideDelay(3000)
            );
          }, function errorCallback(response) {
            console.log(response);
          });
      }
    }

    $scope.loginForm = function(payload){
      if($scope.emailValid == true && $scope.passwordValid == true){
        $http({
          method: 'POST',
          url: 'http://13.75.44.45/userLogin/api/users/login',
          data: payload
        }).then(function successCallback(response) {
            console.log(response);
            $cookies.put('activeUser',payload.usrname);
            $scope.show_user[0] = payload.usrname;
            $scope.loggedIn[0] = true;
            $scope.clearForm();
            $('#modal').modal('hide');
            $mdToast.show(
              $mdToast.simple()
                .textContent('Welcome, '+$scope.show_user+'!')
                .position('top right')
                .hideDelay(3000)
            );
            console.log("Post over");
          }, function errorCallback(response) {
            console.log(response);
          });
        console.log("DONE")
      }
    }
    
    $scope.clearForm = function(){
      $scope.login = {};
      $scope.signup= {};
    }

    $scope.logout = function(){
      $cookies.remove('activeUser');
      $cookies.remove('name');
      $scope.loggedIn[0] = false;
      $window.location.assign('/');
    }

    $scope.wishlist = function(){
      $window.location.assign('/wishlist.html');
    }

}]);

app.service('loginService', 
  function(){
    this.show_user = [];
    this.loggedIn = [false];
});
////////////////////////////////////////////////////////////LOGIN CONTROLLER END////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////PRODUCT CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('productController', ['$scope','$cookies','$http','$location','$window',
  function($scope,$cookies,$http,$location,$window) {
    
    //HTTP REQUEST TO GET PRODUCT DETAILS//
    $scope.product_info = {};
    $scope.productId = $cookies.get('productId');
    $scope.genderStatus = $cookies.get('womenStatus');
    $scope.similar_products = {};

    $scope.getSimilarProducts = function(){
      // console.log($scope.genderStatus);
      if($scope.genderStatus == 'active'){
        $http({
        method: 'GET',
        url: 'http://13.75.44.45/userLogin/api/users/products'
      }).then(function successCallback(response) {
          $scope.similar_products = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      }
      else{
        $http({
        method: 'GET',
        url: 'http://13.75.44.45/userLogin/api/users/productsMen'
      }).then(function successCallback(response) {
          $scope.similar_products = response.data;
        }, function errorCallback(response) {
          console.log(response);
        });
      }
    }

    $scope.getProductInfo = function(){
      var dummy = {};
      dummy.productId = $scope.productId;
      // console.log(dummy);
      $http({
        method: 'POST',
        url: 'http://13.75.44.45/userLogin/api/users/productsSingle',
        data: dummy
      }).then(function successCallback(response) {
          $scope.product_info = response.data[0];
          // console.log(response.data);
          $scope.productImages = [];
          $scope.productImages.push($scope.product_info.img1);
          $scope.productImages.push($scope.product_info.img2);
          $scope.productImages.push($scope.product_info.img3);
          $scope.productImages.push($scope.product_info.img4);
          $scope.getSimilarProducts();
        }, function errorCallback(response) {
          console.log(response);
        });
    }
    //HTTP REQUEST TO GET PRODUCT DETAILS ENDS HERE//
    
    // TO MAKE A RADIO BUTTON SELECTION FOR BOTH COLOR AND SIZE//
    $scope.color_images = ["/fadstreet/files/images/1/f6.jpg",
    "/fadstreet/files/images/1/ff1.jpg",
    "/fadstreet/files/images/1/ff2.jpg"];
    
    $scope.sizes = ["S","M","L","XL","XXL"];
    
    $scope.colorSelected = -1;
    $scope.sizeSelected = -1;

    $scope.updateSelected = function(index,data){ //METHOD TO UPDATE THE SELECTION
      if(data == 0){
        if($scope.colorSelected != index){
          $scope.colorSelected = index;
        }
      }
      else if(data == 1){
        if($scope.sizeSelected != index){
          $scope.sizeSelected = index;
        }
      }
    }; 
    //TO MAKE A RADIO BUTTON SELECTION FOR BOTH COLOR AND SIZE ENDS HERE//

    //TO MAKE WISH IT BUTTON WORK//
    $scope.wish_content = "WISH IT";
    $scope.unlike = true;
    $scope.like = false;
    $scope.like_click = true;
    $scope.likeIt = function(){
      $scope.unlike=!$scope.unlike;
      $scope.like=!$scope.like;
      if($scope.like_click){
        $scope.wish_content = "WISH LISTED";
        $scope.like_click = !$scope.like_click;
      }
      else{
        $scope.wish_content = "WISH IT";
        $scope.like_click = !$scope.like_click;
      }
    }
    //TO MAKE WISH IT BUTTON WORK ENDS HERE//

    $scope.homePage = function(){
      $window.location.assign('/');
    }
  }]);

///////////////////////////////////////////////////////////PRODUCT CONTROLLER END///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////WISHLIST CONTROLLER///////////////////////////////////////////////////////////

app.controller('wishlistController', ['$scope','$http','$location','$window','$cookies','$parse','loginService',
  function($scope,$http,$location,$window,$cookies,$parse,loginService) {

    $scope.userEmail = $cookies.get('activeUser');
    $scope.like = true;
    $scope.loggedIn = loginService.loggedIn;

    $scope.retrieveProducts = function(){
      var payload = {};
      payload.username = $scope.userEmail;

      $http({
          method: 'POST',
          url: 'http://13.75.44.45/userLogin/api/users/retrieveWishlist',
          data: payload
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.wishlistProducts = response.data;
            $scope.no_of_items = response.data.length;
          }, function errorCallback(response) {
            console.log(response);
          });
    }

    $scope.ifRemoved = function(data,id){
      $scope.wishlistProducts.splice(data, 1);
      
      var payload = {};
      payload.productId = id;
      payload.username = $scope.userEmail;
      console.log(payload);

      $http({
          method: 'POST',
          url: 'http://13.75.44.45/userLogin/api/users/removeFromWishlist',
          data: payload
        }).then(function successCallback(response) {
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
          });
    }

  }]);

///////////////////////////////////////////////////////////WISHLIST CONTROLLER END////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////MIX N MATCH CONTROLLER///////////////////////////////////////////////////////////

app.controller('mixnmatchController', ['$scope','$http','$location','$window',
  function($scope,$http,$location,$window) {
    
  }]);

///////////////////////////////////////////////////////////MIX N MATCH CONTROLLER END////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////VENDOR CONTROLLER/////////////////////////////////////////////////////////////////

app.controller('vendorController', ['$scope','$cookies','$http','$location','$mdDialog','$window',
  function($scope,$cookies,$http,$location,$mdDialog,$window) {
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

  $scope.homePage = function(){
    $window.location.assign('/fadstreet/landing.html');
  }
}]);