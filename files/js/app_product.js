var app = angular.module('productPage',[]);

///////////////////////////////////////////////////////////PRODUCT CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('productController', ['$scope','$http','$location','$window',
  function($scope,$http,$location,$window) {
    $scope.product_info = {};
    $scope.color = {};
    $scope.size = {};
    
    $scope.color_images = ["/fadstreet/files/images/1/f7.jpg",
    "http://i181.twenga.com/mode/kort-kl%C3%A4nning/vero-moda-spetsprydd-kort-tp_2949852263909210357b.jpg",
    "http://demandware.edgesuite.net/aagb_prd/on/demandware.static/-/Sites-pim-catalog/default/dw073ffb30/pim-static/list/10152626_SnowWhite_001_List.jpg"];
    
    $scope.sizes = ["S","M","L","XL","XXL"];
     
     $scope.select= function(item,data) {
      if(data == 0)
        $scope.color.selected = item; 
      else if(data == 1){
        $scope.size.selected = item;
        console.log($scope.size.selected);
      }
     };

     $scope.isActive = function(item,data) {
      if(data == 0){
        // console.log("Selecting color");
        return $scope.color.selected === item;
      }
      else if(data == 1){
        // console.log("Selecting size");      
        return $scope.size.selected === item;
      }
     };

    $scope.info = function(){
      $http({
          method: 'GET',
          url: 'https://www.shimply.com/api/search/list?query=shirt&category_id=371&key=5ee2b8cc38cc21161f7222b10369f1aa'
        }).then(function successCallback(response) {
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
          });
        
      $http({
          method: 'GET',
          url: 'http://127.0.0.1:8081/5'
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

///////////////////////////////////////////////////////////PRODUCT CONTROLLER END///////////////////////////////////////////////////////////////
