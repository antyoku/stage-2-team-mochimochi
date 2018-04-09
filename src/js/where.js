/* global google */
/* global $ */

(function () {
  var styleOptions = [{
    'elementType': 'geometry',
    'stylers': [{
      'color': '#212121'
    }]
  },
  {
    'elementType': 'labels',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'elementType': 'labels.icon',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#757575'
    }]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [{
      'color': '#212121'
    }]
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#757575'
    },
    {
      'visibility': 'off'
    }
    ]
  },
  {
    'featureType': 'administrative.country',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#9e9e9e'
    }]
  },
  {
    'featureType': 'administrative.land_parcel',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'administrative.locality',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#bdbdbd'
    }]
  },
  {
    'featureType': 'administrative.neighborhood',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'poi',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#757575'
    }]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#181818'
    }]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#616161'
    }]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.stroke',
    'stylers': [{
      'color': '#1b1b1b'
    }]
  },
  {
    'featureType': 'road',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry.fill',
    'stylers': [{
      'color': '#2c2c2c'
    }]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.icon',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#8a8a8a'
    }]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#373737'
    }]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#3c3c3c'
    }]
  },
  {
    'featureType': 'road.highway.controlled_access',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#4e4e4e'
    }]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#616161'
    }]
  },
  {
    'featureType': 'transit',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'transit',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#757575'
    }]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#000000'
    }]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#3d3d3d'
    }]
  }
  ]

  function initMap () {
    var map = new google.maps.Map(document.getElementById('map-area'), {
      center: new google.maps.LatLng(35.65858, 139.745433),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      scrollwheel: false,
      draggable: false
    })
    map.setOptions({
      styles: styleOptions
    })
  }

  var getMap = (function () {
    function codeAddress (address) {
      var geocoder = new google.maps.Geocoder()
      geocoder.geocode({
        'address': address
      }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var map = new google.maps.Map(document.getElementById('map-area'), {
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: false
          })
          map.setCenter(results[0].geometry.location)
          map.setOptions({
            styles: styleOptions
          })
        } else {
          console.log('Geocode was not successful for the following reason: ' + status)
        }
      })
    }

    return {
      getAddress: function () {
        $('#where-input-id').change(function () {
          var address = document.getElementById('where-input-id').value
          codeAddress(address)
        })
      }
    }
  })()

  google.maps.event.addDomListener(window, 'load', initMap)
  getMap.getAddress()
})();
