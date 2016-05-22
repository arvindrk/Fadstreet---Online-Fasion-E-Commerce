var app = angular.module('productPage',[]);

///////////////////////////////////////////////////////////PRODUCT CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('productController', ['$scope','$http','$location','$window',
  function($scope,$http,$location,$window) {
    $scope.product_info = {};
    $scope.info = function(){
      $http({
          method: 'GET',
          url: 'http://127.0.0.1:8081/1'
        }).then(function successCallback(response) {
            $scope.product_info = response.data;
            console.log(response.data);
            $scope.sampleImage = "http://127.0.0.1:8081/"+response.data.image1;
            console.log($scope.sampleImage);
          }, function errorCallback(response) {
            console.log(response);
          });
    }
  }]);

///////////////////////////////////////////////////////////LANDING CONTROLLER///////////////////////////////////////////////////////////////////
