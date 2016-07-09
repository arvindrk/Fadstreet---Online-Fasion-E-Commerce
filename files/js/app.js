<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
var app = angular.module('fadStreetApp',['ngCookies','ngRoute','ngMaterial','ngFileReader','infinite-scroll']);


///////////////////////////////////////////////////////////NAVTAB CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('navtabController', ['$scope','$cookies','$http','$location','$mdDialog','$window','$timeout',
  function($scope,$cookies,$http,$location,$mdDialog,$window,$timeout) {
=======
var app = angular.module('fadStreetApp',['ngCookies','ngRoute','ngMaterial','ngFileReader']);

///////////////////////////////////////////////////////////NAVTAB CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('navtabController', ['$scope','$cookies','$http','$location','$window','$mdToast','productService','loginService','$timeout',
  function($scope,$cookies,$http,$location,$window,$mdToast,productService,loginService,$timeout) {
>>>>>>> Major API Upgrade

    $scope.women_active = "active";
    $scope.men_active = "inactive";
    $scope.first_filter = {};
    $scope.products = {};
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
=======
    $scope.filters = {};

>>>>>>> Major API Upgrade
    $scope.showLoader = false;
    $scope.unlike = true;
    $scope.like = false;

    $scope.show_user = loginService.show_user;
    $scope.loggedIn = loginService.loggedIn;
    $scope.productId = productService.productId;

    $scope.init = function(){
      var men = $cookies.get('menStatus');
      var women = $cookies.get('womenStatus');

      if(men == 'active')
        $scope.men();
      else
        $scope.women();
      
      var ifUser = $cookies.get('activeUser');
      var ifName = $cookies.get('name');

      if(ifUser != null){
        $timeout(function() {
          $scope.show_user[0] = ifName;
          $scope.loggedIn[0] = true;
          $('#modal').modal('hide');
            $mdToast.show(
              $mdToast.simple()
                .textContent('Welcome, '+$scope.show_user+'!')
                .position('top right')
                .hideDelay(3000)
          );
        }, 2000);
      }
    }

    $scope.setDefault = function(){
      $scope.selected_filters = [];
      $scope.first_filter_show = false;
      $scope.subFilter_show = false;
      $scope.base_filter = true;
      $scope.filter_selected = false;
      $scope.filter_close = false;
    }

    $scope.men = function (){
      $scope.setDefault();
      $scope.base_filter = false;

      $scope.showLoader = true;
      $scope.women_active='inactive';
      $scope.men_active='active';
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
      $scope.products.image = ["https://ak0.scstatic.net/1/cdn2-cont3.sweetcouch.com/3341239-pepe-jeans-man-blue-white-checked.jpg",
      "https://ak2.scstatic.net/1/cdn2-cont13.sweetcouch.com/145595475706736181-calvinklein-innerwear-white-purple-checked-long.jpg",
      "https://ak0.scstatic.net/1/cdn2-cont9.sweetcouch.com/899539-calvin-klein-jeans-men-white-shirt.jpg",
      "https://ak0.scstatic.net/1/cdn2-cont5.sweetcouch.com/3406698-calvin-klein-jeans-man-white-blue.jpg",
      "http://media.very.co.uk/i/very/B958P_SP734_25_4RP7U/fred-perry-mens-white-crew-neck-t-shirt.jpg?$300x400_standard$",
      "http://images.kooves.com/uploads/products/67719_86e6937fd2d6a928f0a61397a808ad47_image1_default.jpg",
      "https://ak0.scstatic.net/1/cdn2-cont1.sweetcouch.com/136172485856577422_small.jpg",
      "https://ak0.scstatic.net/1/cdn2-cont5.sweetcouch.com/2525142-voi-jeans-men-navy-white-checked.jpg",
      "https://ak0.scstatic.net/1/cdn2-cont3.sweetcouch.com/2536442-voi-jeans-men-white-blue-shirt.jpg",
      "https://ak0.scstatic.net/1/cdn2-cont2.sweetcouch.com/2526167-pepe-jeans-men-blue-white-checked.jpg",
      "https://ak3.scstatic.net/1/cdn2-cont12.sweetcouch.com/146254103035947211-sf-jeans-pantaloon-white-blue-checkered.jpg",
      "https://ak3.scstatic.net/1/cdn2-cont14.sweetcouch.com/146254966039993425-pepe-blue-white-printed-casual-shirt.jpg"];

      $scope.filters = ["/fadstreet/files/images/men/1b.svg",
=======

      $cookies.put('menStatus',$scope.men_active);
      $cookies.remove('womenStatus');
      $cookies.put('womenStatus',$scope.women_active);

      $scope.getProducts();

      $scope.filters.icons = ["/fadstreet/files/images/men/1b.svg",
>>>>>>> Major API Upgrade
      "/fadstreet/files/images/men/2b.svg",
      "/fadstreet/files/images/men/3b.svg",
      "/fadstreet/files/images/men/4b.svg",
      "/fadstreet/files/images/men/5b.svg",
      "/fadstreet/files/images/men/6b.svg",
      "/fadstreet/files/images/men/7b.svg"];
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
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
      $http({
          method: 'GET',
          url: 'http://13.75.44.45/userLogin/api/users/products'
        }).then(function successCallback(response) {
            // console.log(response.data);
            $scope.products = response.data;
            console.log($scope.products);
          }, function errorCallback(response) {
            console.log(response);
          });

      $scope.filters = ["/fadstreet/files/images/women/1a.svg",
=======
      $cookies.put('womenStatus',$scope.women_active);
      $cookies.remove('menStatus');
      $cookies.put('menStatus',$scope.men_active);
      
      $scope.showLoader = true;
      
      $scope.getProducts();

      $scope.filters.icons = ["/fadstreet/files/images/women/1a.svg",
>>>>>>> Major API Upgrade
      "/fadstreet/files/images/women/2a.svg",
      "/fadstreet/files/images/women/3a.svg",
      "/fadstreet/files/images/women/4a.svg",
      "/fadstreet/files/images/women/5a.svg",
      "/fadstreet/files/images/women/6a.svg",
      "/fadstreet/files/images/women/7a.svg",
      "/fadstreet/files/images/women/8a.svg",
      "/fadstreet/files/images/women/9a.svg"];

      $scope.subFilter = ["/fadstreet/files/images/women/sub/1a.svg",
                          "/fadstreet/files/images/women/sub/2a.svg",
                          "/fadstreet/files/images/women/sub/3a.svg",
                          "/fadstreet/files/images/women/sub/4a.svg"];
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
=======
      $scope.showLoader = false;
      
      $timeout(function() {
        $scope.base_filter = true;
      }, 1500);
>>>>>>> Major API Upgrade
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

    $scope.selected_filters = [];
    $scope.select = function(data,payload){
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
      if($scope.selected_filters.indexOf($scope.filters[data]) == -1 && $scope.selected_filters.indexOf($scope.subFilter[data]) == -1){
=======
      if($scope.selected_filters.indexOf($scope.filters.icons[data]) == -1 && $scope.selected_filters.indexOf($scope.subFilter[data]) == -1){
>>>>>>> Major API Upgrade
        if(payload == 0){
          var filterUrl = 'http://13.75.44.45/userLogin/api/users/filter/'+data;
          $http({
            method: 'POST',
            url: filterUrl
          }).then(function successCallback(response) {
              console.log(response.data);
              $scope.products = response.data;
            }, function errorCallback(response) {
              console.log(response);
            });
          $scope.base_filter = false;
          $scope.first_filter_show = true;
          $scope.first_filter = $scope.filters.icons[data];
          $scope.subFilter_show = true;
        }
        else{
          if($scope.subFilter_show == true){
              if(window.innerWidth <= 1500)
                $("#filterId").animate({'top' : '2vh'}, {duration : 400});
          }
          $scope.selected_filters.push($scope.subFilter[data]);
          $scope.filter_selected = true;
          $scope.filter_close = true;
        }
      }
    }

    $scope.remove = function(data,payload){
      if(payload == 0){
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
        $scope.selected_filters = [];
        $scope.first_filter_show = false;
        $scope.subFilter_show = false;
        $scope.base_filter = true;
        $scope.filter_selected = false;
        $scope.filter_close = false;
=======
        $scope.setDefault();
        $scope.getProducts();

>>>>>>> Major API Upgrade
        if($scope.subFilter_show == false)
          if(window.innerWidth <= 1500)
            $("#filterId").animate({'top' : '10vh'}, {duration : 400});
      }
      else{
        $scope.selected_filters.splice(data,1);
        if($scope.selected_filters.length == 0){
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
          $scope.filter_selected = false;
          $scope.filter_close = false;
          $scope.first_filter_show = false;
          $scope.subFilter_show = false;
          $scope.base_filter = true;
=======
          $scope.setDefault();
          $scope.getProducts();
>>>>>>> Major API Upgrade
        }
        if($scope.subFilter_show == false)
          if(window.innerWidth <= 1500)
            $("#filterId").animate({'top' : '10vh'}, {duration : 400});
      }
    }

    $scope.removeAll = function(){
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
      $scope.selected_filters = [];
      $scope.filter_selected = false;
      $scope.filter_close = false;
      $scope.first_filter_show = false;
      $scope.subFilter_show = false;
      $scope.base_filter = true;
=======
      $scope.setDefault();
      $scope.getProducts();
>>>>>>> Major API Upgrade
      if($scope.subFilter_show == false)
        if(window.innerWidth <= 1500)
          $("#filterId").animate({'top' : '10vh'}, {duration : 400});
    }
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
    $ii = 0;    
    $scope.loadMore = function(){
      $scope.showLoader = true;
      $timeout(function() {}, 3000);
      console.log("now posting");
      $http({
          method: 'GET',
          url: 'http://13.75.44.45/userLogin/api/users/products'
        }).then(function successCallback(response) {
            console.log($ii++ + response.data);
            for (var i = 0; i < response.data.length; i++) {
              $scope.products.push(response.data[i]);
            }
          }, function errorCallback(response) {
            console.log(response);
          });
        $scope.showLoader = false;
=======
    
    $scope.selectProduct = function(payload){
      $scope.productId[0] = payload;
      $cookies.put('productId',$scope.productId[0]);
      $cookies.put('womenStatus',$scope.women_active);
      $window.location.assign('/fadstreet/single_product.html');
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
      $("body").animate({scrollTop: 0}, "slow");
    }

    $scope.homePage = function(){
      $window.location.assign('/');
>>>>>>> Major API Upgrade
    }
  }]);
///////////////////////////////////////////////////////////NAVTAB CONTROLLER END///////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////LOGIN CONTROLLER///////////////////////////////////////////////////////////////////

<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
app.controller('loginController', ['$scope','$cookies','$http','$location','$mdDialog','$mdToast','$window','loginService',
  function($scope,$cookies,$http,$location,$mdDialog,$mdToast,$window,loginService) {
=======
app.controller('loginController', ['$scope','$cookies','$http','$location','$mdDialog','$mdToast','$window','loginService','productService',
  function($scope,$cookies,$http,$location,$mdDialog,$mdToast,$window,loginService,productService) {
>>>>>>> Major API Upgrade
    $scope.login = {};
    
    $scope.show_user = loginService.show_user;
    $scope.loggedIn = loginService.loggedIn;
    $scope.productId = productService.productId;

    $scope.show_login = true;
    
    $scope.password_error = false;
    $scope.email_error = false;
    $scope.noEmail_error = false;
    $scope.user_error = false;
    $scope.emailValid = false;
    $scope.passwordValid = false;

    $scope.init = function(){
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
      $scope.user = $cookies.get('user');
      $scope.username = $cookies.get('name');
=======
      var user = $cookies.get('activeUser');
      var username = $cookies.get('name');
>>>>>>> Major API Upgrade

      if(user != null){
        $scope.loggedIn[0] = true;
        $scope.show_user[0] = username; 
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
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
            $cookies.put('user',payload.email);
=======
            $cookies.put('activeUser',payload.username);
>>>>>>> Major API Upgrade
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
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
      // if($scope.emailValid == true && $scope.passwordValid == true){
        console.log(payload);
        $cookies.newUser = payload.email;
=======
      if($scope.emailValid == true && $scope.passwordValid == true){
>>>>>>> Major API Upgrade
        $http({
          method: 'POST',
          url: 'http://13.75.44.45/userLogin/api/users/login',
          data: payload
        }).then(function successCallback(response) {
            console.log(response);
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
            // $cookies.put("user",payload.email);
            $cookies.newUser = payload.email;
            // $cookies.put('name',payload.name);
=======
            $cookies.put('activeUser',payload.username);
>>>>>>> Major API Upgrade
            $scope.show_user[0] = payload.username;
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
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
      // }
=======
      }
>>>>>>> Major API Upgrade
    }
    $scope.clearForm = function(){
      $scope.login = {};
      $scope.signup= {};
    }    
}]);

app.service('loginService', 
  function(){
    this.show_user = [];
    this.loggedIn = [false];
});
////////////////////////////////////////////////////////////LOGIN CONTROLLER END////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////PRODUCT CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('productController', ['$scope','$cookies','$http','$location','$window','productService',
  function($scope,$cookies,$http,$location,$window,productService) {
    
    //HTTP REQUEST TO GET PRODUCT DETAILS//
    $scope.product_info = {};
    $scope.productId = $cookies.get('productId');
    $scope.genderStatus = $cookies.get('womenStatus');
    $scope.similar_products = {};

    $scope.getSimilarProducts = function(){
      console.log($scope.genderStatus);
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
      console.log($scope.productId);
      $http({
        method: 'POST',
        url: 'http://13.75.44.45/userLogin/api/users/productsSingle',
        data: dummy
      }).then(function successCallback(response) {
          $scope.product_info = response.data[0];
          console.log($scope.product_info);
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

///////////////////////////////////////////////////////////PRODUCT CONTROLLER END///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////MIX N MATCH CONTROLLER///////////////////////////////////////////////////////////////

app.controller('mixnmatchController', ['$scope','$http','$location','$window',
  function($scope,$http,$location,$window) {
<<<<<<< bbbe1344b69851bc8b9180cf556d5a5d8008de36
    $scope.mixNmatch = function(data){
      
    }
}]);
=======
    
  }]);
>>>>>>> Major API Upgrade

///////////////////////////////////////////////////////////MIX N MATCH CONTROLLER END//////////////////////////////////////////////////////////
app.service('productService', 
  function(){
    this.productId = [0];
});
///////////////////////////////////////////////////////////VENDOR CONTROLLER///////////////////////////////////////////////////////////////////

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
	$scope.logout = function(){
		$window.location.assign('/fadstreet/login.html');
	}
  $scope.homePage = function(){
    $window.location.assign('/fadstreet/landing.html');
  }
}]);