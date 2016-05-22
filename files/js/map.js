function initMap() {
  var myLatLng = {lat: 13.067439, lng: 80.237617};

  var mapDiv = document.getElementById('map');
  
  var map = new google.maps.Map(mapDiv, {
    center: myLatLng,
    zoom: 12
    // mapTypeId: google.maps.MapTypeId.SATELLITE
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP
  });
   var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="secondHeading" class="secondHeading">Store Name</h1>'+
      '<div id="bodyContent">'+
      '<p>Store content.</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}