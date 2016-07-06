var app = angular.module('fadStreetApp',['ngCookies','ngRoute','ngMaterial','ngFileReader','infinite-scroll']);


///////////////////////////////////////////////////////////NAVTAB CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('navtabController', ['$scope','$cookies','$http','$location','$mdDialog','$window','$timeout',
  function($scope,$cookies,$http,$location,$mdDialog,$window,$timeout) {

    $scope.women_active = "active";
    $scope.men_active = "inactive";
    $scope.first_filter = {};
    $scope.products = {};
    $scope.showLoader = false;
    $scope.unlike = true;
    $scope.like = false;

    $scope.men = function (){
      $scope.women_active='inactive';
      $scope.men_active='active';
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
      "/fadstreet/files/images/men/2b.svg",
      "/fadstreet/files/images/men/3b.svg",
      "/fadstreet/files/images/men/4b.svg",
      "/fadstreet/files/images/men/5b.svg",
      "/fadstreet/files/images/men/6b.svg",
      "/fadstreet/files/images/men/7b.svg"];
    }
    $scope.women = function(){
      $scope.show_login=true;$scope.show_signup = false;
      $scope.women_active='active';
      $scope.men_active='inactive';
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
    }
    
    $scope.selected_filters = [];
    $scope.select = function(data,payload){
      if($scope.selected_filters.indexOf($scope.filters[data]) == -1 && $scope.selected_filters.indexOf($scope.subFilter[data]) == -1){
        if(payload == 0){
          $scope.base_filter = false;
          $scope.first_filter_show = true;
          $scope.first_filter = $scope.filters[data];
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
        $scope.selected_filters = [];
        $scope.first_filter_show = false;
        $scope.subFilter_show = false;
        $scope.base_filter = true;
        $scope.filter_selected = false;
        $scope.filter_close = false;
        if($scope.subFilter_show == false)
          if(window.innerWidth <= 1500)
            $("#filterId").animate({'top' : '10vh'}, {duration : 400});
      }
      else{
        $scope.selected_filters.splice(data,1);
        if($scope.selected_filters.length == 0){
          $scope.filter_selected = false;
          $scope.filter_close = false;
          $scope.first_filter_show = false;
          $scope.subFilter_show = false;
          $scope.base_filter = true;
        }
        if($scope.subFilter_show == false)
          if(window.innerWidth <= 1500)
            $("#filterId").animate({'top' : '10vh'}, {duration : 400});
      }
    }
    $scope.removeAll = function(){
      $scope.selected_filters = [];
      $scope.filter_selected = false;
      $scope.filter_close = false;
      $scope.first_filter_show = false;
      $scope.subFilter_show = false;
      $scope.base_filter = true;
      if($scope.subFilter_show == false)
        if(window.innerWidth <= 1500)
          $("#filterId").animate({'top' : '10vh'}, {duration : 400});
    }
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
    }
  }]);
///////////////////////////////////////////////////////////NAVTAB CONTROLLER END///////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////LOGIN CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('loginController', ['$scope','$cookies','$http','$location','$mdDialog','$mdToast','$window','loginService',
  function($scope,$cookies,$http,$location,$mdDialog,$mdToast,$window,loginService) {
    $scope.login = {};
    
    $scope.show_user = loginService.show_user;
    $scope.loggedIn = loginService.loggedIn;

    $scope.show_login = true;
    
    $scope.password_error = false;
    $scope.email_error = false;
    $scope.noEmail_error = false;
    $scope.user_error = false;
    $scope.emailValid = false;
    $scope.passwordValid = false;

    $scope.init = function(){
      $scope.user = $cookies.get('user');
      $scope.username = $cookies.get('name');

      if($scope.user != null){
        $scope.loggedIn[0] = true;
        $scope.show_user[0] = $scope.username; 
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
      console.log(payload);
      $scope.checkEmail(payload.username,1);
      $scope.checkPassword(payload.password,1);
      if($scope.emailValid == true && $scope.passwordValid == true){
        $http({
          method: 'POST',
          url: 'http://52.175.34.205/userLogin/api/users',
          data: payload
        }).then(function successCallback(response) {
            $cookies.put('user',payload.email);
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
      // if($scope.emailValid == true && $scope.passwordValid == true){
        console.log(payload);
        $cookies.newUser = payload.email;
        $http({
          method: 'POST',
          url: 'http://13.75.44.45/userLogin/api/users/login',
          data: payload
        }).then(function successCallback(response) {
            console.log(response);
            // $cookies.put("user",payload.email);
            $cookies.newUser = payload.email;
            // $cookies.put('name',payload.name);
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
      // }
    }
    $scope.clearForm = function(){
      $scope.login = {};
      $scope.signup= {};
    }    
}]);

app.service('loginService', 
  function(){
    this.show_user = ['Hello'];
    this.loggedIn = [false];
});
////////////////////////////////////////////////////////////LOGIN CONTROLLER END////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////PRODUCT CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('productController', ['$scope','$http','$location','$window',
  function($scope,$http,$location,$window) {
    
    //HTTP REQUEST TO GET PRODUCT DETAILS//
    $scope.product_info = {};
    $scope.info = function(){ //METHOD TO GET PRODUCT DETAILS
      $http({
          method: 'GET',
          url: 'http://127.0.0.1:8081/5'
        }).then(function successCallback(response) {
            $scope.product_info = response.data;
            console.log(response.data);
            $scope.sampleImage = "http://127.0.0.1:8081/"+response.data.image1;
            // console.log($scope.sampleImage);
          }, function errorCallback(response) {
            console.log(response);
          });
    }
    //HTTP REQUEST TO GET PRODUCT DETAILS ENDS HERE//

    $scope.mixes =[
        {
          "one" : "https://caralasefashion.files.wordpress.com/2015/09/2948c-caralase_122__15522-1440631844-1280-1280.jpg",
          "two" : "http://acelebritynews.com/wp-content/uploads/2015/05/Women-Bags-Best-Women-Bags-Collection-2.jpg",
          "three" : "http://trendymods.com/wp-content/uploads/2013/12/by-cesare-paciotti-women-shoes-2014.jpeg"
        },
        {
          "one" : "https://caralasefashion.files.wordpress.com/2015/09/2948c-caralase_122__15522-1440631844-1280-1280.jpg",
          "two" : "http://acelebritynews.com/wp-content/uploads/2015/05/Women-Bags-Best-Women-Bags-Collection-2.jpg",
          "three" : "http://trendymods.com/wp-content/uploads/2013/12/by-cesare-paciotti-women-shoes-2014.jpeg"
        },
        {
          "one" : "https://caralasefashion.files.wordpress.com/2015/09/2948c-caralase_122__15522-1440631844-1280-1280.jpg",
          "two" : "http://acelebritynews.com/wp-content/uploads/2015/05/Women-Bags-Best-Women-Bags-Collection-2.jpg",
          "three" : "http://trendymods.com/wp-content/uploads/2013/12/by-cesare-paciotti-women-shoes-2014.jpeg"
        },
        {
          "one" : "https://caralasefashion.files.wordpress.com/2015/09/2948c-caralase_122__15522-1440631844-1280-1280.jpg",
          "two" : "http://acelebritynews.com/wp-content/uploads/2015/05/Women-Bags-Best-Women-Bags-Collection-2.jpg",
          "three" : "http://trendymods.com/wp-content/uploads/2013/12/by-cesare-paciotti-women-shoes-2014.jpeg"
        },
        {
          "one" : "https://caralasefashion.files.wordpress.com/2015/09/2948c-caralase_122__15522-1440631844-1280-1280.jpg",
          "two" : "http://acelebritynews.com/wp-content/uploads/2015/05/Women-Bags-Best-Women-Bags-Collection-2.jpg",
          "three" : "http://trendymods.com/wp-content/uploads/2013/12/by-cesare-paciotti-women-shoes-2014.jpeg"
        },
        {
          "one" : "https://caralasefashion.files.wordpress.com/2015/09/2948c-caralase_122__15522-1440631844-1280-1280.jpg",
          "two" : "http://acelebritynews.com/wp-content/uploads/2015/05/Women-Bags-Best-Women-Bags-Collection-2.jpg",
          "three" : "http://trendymods.com/wp-content/uploads/2013/12/by-cesare-paciotti-women-shoes-2014.jpeg"
        },
        {
          "one" : "https://caralasefashion.files.wordpress.com/2015/09/2948c-caralase_122__15522-1440631844-1280-1280.jpg",
          "two" : "http://acelebritynews.com/wp-content/uploads/2015/05/Women-Bags-Best-Women-Bags-Collection-2.jpg",
          "three" : "http://trendymods.com/wp-content/uploads/2013/12/by-cesare-paciotti-women-shoes-2014.jpeg"
        }
      ];

    $scope.numbers = ["0","1","2","3","4","5","6"];
    
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

  }]);

///////////////////////////////////////////////////////////PRODUCT CONTROLLER END///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////MIX N MATCH CONTROLLER///////////////////////////////////////////////////////////////

app.controller('mixnmatchController', ['$scope','$http','$location','$window',
  function($scope,$http,$location,$window) {
    $scope.mixNmatch = function(data){
      
    }
}]);

///////////////////////////////////////////////////////////MIX N MATCH CONTROLLER END//////////////////////////////////////////////////////////

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