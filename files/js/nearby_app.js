//Data
var brands = [
              {
                  shop : 'BROOKS',
                  desc : 'Sports Apparels',
                  img : "http://www.yourprojector.com/blog/wp-content/uploads/Brooks-Logo.jpg",
				  lat : 13.000900,
                  long : 80.259900
              },
              {
                  shop : 'ROLEX',
                  desc : 'Watch World',
                  lat : 13.038711,
                  img : "http://www.fetchlogos.com/wp-content/uploads/2015/10/Rolex.png",
                  long : 80.009617
              },
              {
                  shop : 'LaCoste',
                  desc : 'CLothing Paradise',
                  lat : 13.099439,
                  img : "http://www.ranklogos.com/wp-content/uploads/2015/06/Lacoste-Logo.jpg",
                  long : 80.239999
              },
              {
                  shop : 'UCB',
                  desc : 'Clothes for everyone',
                  lat : 13.067439,
                  img : "http://www.finest-cosmetic.com/image/cache/data/baners/benetton-logo-180x180.jpg",
                  long : 80.237617
              },
              {
                  shop : 'Crispino',
                  desc : 'Clothes for everyone',
                  lat : 13.069439,
                  img : "http://www.logoeps.net/wp-content/uploads/2012/04/crispino-logo.jpg",
                  long : 80.257617
              },
              {
                  shop : 'Calvin Klein',
                  desc : 'Clothes for everyone',
                  lat : 13.15,
                  img : "http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/112011/ck.png?itok=Bhu8NjaY",
                  long : 80.238017
              },
              {
                  shop : 'D&G',
                  desc : 'Clothes for everyone',
                  lat : 13.063439,
                  img : "http://www.ranklogos.com/wp-content/uploads/2014/09/dolce.gabbana_logo.png",
                  long : 80.136617
              },
              {
                  shop : 'Ralph Lauren',
                  desc : 'Bags of wonder',
                  lat : 13.000000,
                  img : "http://cdn1.listovative.com/wp-content/uploads/2014/09/polo-ralph-lauren-logo-vector-300x300.png",
                  long : 80.250000
              }
          ];
var app = angular.module('nearbyApp',['ngCookies','ngRoute','ui.router','ngMaterial']);

///////////////////////////////////////////////////////////NEARBY CONTROLLER///////////////////////////////////////////////////////////////////

app.controller('nearbyController', ['$scope','$cookies','$http','$location','$window',
  function($scope,$cookies,$http,$location,$window) {
  	$scope.login = function(){
		$window.location.assign('/fadstreet/login.html');
	}
  $scope.filter_button = 'Apply Filter';
  $scope.filter = {};
  var dummy = false;
	// $( ".map_container" ).draggable();
	$scope.myLatLng = {lat: 13.067439, lng: 80.237617};
	var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng($scope.myLatLng),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];
  
  var infoWindow = new google.maps.InfoWindow();
  
  var createMarker = function (info){
      var img = {
		    url: info.img, // url
		    scaledSize: new google.maps.Size(50, 50), // scaled size
		    origin: new google.maps.Point(0,0), // origin
		    anchor: new google.maps.Point(0, 0) // anchor
		  };
      var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(info.lat, info.long),
          animation: google.maps.Animation.DROP,
          title: info.shop,
          temp: img
      });
      marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
      
      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h3>' + marker.title + '</h3><hr>' + marker.content);
          infoWindow.open($scope.map, marker);
      });
      
      $scope.markers.push(marker);
      
  }  
  
  for (i = 0; i < brands.length; i++){
      createMarker(brands[i]);
  }

  $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }
  $scope.filters = function(){
    if(!dummy)
      $scope.filter_button = 'Add Filter';
    else
      $scope.filter_button = 'Apply Filters';
    dummy = !dummy;
  }
}]);