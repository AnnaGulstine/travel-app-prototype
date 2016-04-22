/* global google */
/* eslint no-unused-vars: "marker" */

$(document).ready(function(){
var map;

function initMap() {
  var mapOptions = {
    center: new google.maps.LatLng(40.601203, -8.668173),
    zoom: 2,
    mapTypeId: 'roadmap'
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);


  var markersData = [
    {
      lat: 41.84,
      lng: -87.68,
      name: "Chicago"
    },
    {
      lat: 51.5,
      lng: -0.1167,
      name: "London"
    }
  ];

  for (var i = 0; i < markersData.length; i++) {
    var marker = new google.maps.Marker({
      position: {lat: markersData[i].lat, lng: markersData[i].lng},
      map: map,
      title: 'Hello World!'
    });
  }
}

google.maps.event.addDomListener(window, 'load', initMap);

})

// function displayMarkers() {
//   var bounds = new google.maps.LatLngBounds();

//   for (var i = 0; i < markersData.length; i++) {
//     var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
//     var name = markersData[i].name;

//     createMarker(latlng, name);

//     bounds.extend(latlng);
//   }

//   map.fitBounds(bounds);
// }

// function createMarker(latlng, name) {
//   var marker = new google.maps.Marker({
//     map: map,
//     title: name
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     var iwContent = '<div id="iw_container">' +
//       '<div class="iw_title">' + name + '</div';

//     infoWindow.setContent(iwContent);

//     infoWindow.open(map, marker);
//   });
// }



