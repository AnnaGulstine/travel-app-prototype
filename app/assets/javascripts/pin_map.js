// /* global google */
// /* eslint no-unused-vars: "marker" */

// var map;

// function initMap() {
//   var mapOptions = {
//     center: new google.maps.LatLng(40.601203, -8.668173),
//     zoom: 10,
//     mapTypeId: 'roadmap'
//   };

//   var geocoder = new google.maps.Geocoder();

//   map = new google.maps.Map(document.getElementById('pinMap'), mapOptions);

//   var markersData = [
//     {
//       address: "Chicago, IL",
//       lat: 41.84,
//       lng: -87.68,
//       name: "Chicago"
//     },
//     {
//       address: "London",
//       lat: 51.5,
//       lng: -0.1167,
//       name: "London"
//     }
//   ];

//   markersData.forEach(function(place) {

//     var address = place.address;

//     geocoder.geocode({'address': address}, function(results, status) {
//       if (status === google.maps.GeocoderStatus.OK) {
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//           map: pinMap,
//           position: results[0].geometry.location
//         });
//         marker.addListener('click', function() {
//           infowindow.setContent(place.name);
//           infowindow.open(pinMap, marker);
//         });
//       } else {
//         alert('Geocode was not successful for the following reason ' + status );
//       }
//     });
//   });

// }

// // google.maps.event.addDomListener(window, 'load', initMap);
