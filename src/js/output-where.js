'use strict'

function outputWhere(outputAddress) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': outputAddress
  }, function (results, status) {
    var map = new google.maps.Map(document.getElementById('map-area'), {
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    });
    map.setCenter(results[0].geometry.location);
    var markerWidth;
    var markerHeight;
    if (window.innerWidth < 600) {
      markerWidth = 18.59;
      markerHeight = 30.86;
    } else {
      markerWidth = 45;
      markerHeight = 74.68;
    };
    var markerImg = new google.maps.MarkerImage(
      "image/map-marker.svg",
      new google.maps.Size(100, 100),
      new google.maps.Point(0, 0),
      new google.maps.Point(markerWidth / 2, markerHeight),
      new google.maps.Size(markerWidth, markerHeight)
    );
    var marker = new google.maps.Marker({
      map: map,
      position: results[0].geometry.location,
      icon: markerImg
    });
    map.setOptions({
      styles: styleOptions
    });
  });
}