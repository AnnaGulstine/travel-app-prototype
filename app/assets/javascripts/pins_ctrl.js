/* global angular, google */
(function() {
  angular.module("app").controller("pinsController", function($scope, $http) {

    var pinMap;

    // var styles = [
    //   {"featureType":"all","elementType":"geometry","stylers":[{"color":"#4aa5da"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#00fff2"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}];
  
    var styles = [{"featureType":"landscape.natural","stylers":[{"color":"#bcddff"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#5fb3ff"}]},{"featureType":"road.arterial","stylers":[{"color":"#ebf4ff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#ebf4ff"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#93c8ff"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#c7e2ff"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"saturation":100},{"gamma":0.82},{"hue":"#0088ff"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#1673cb"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"saturation":58},{"hue":"#006eff"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#4797e0"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#209ee1"},{"lightness":49}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#83befc"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#3ea3ff"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"saturation":86},{"hue":"#0077ff"},{"weight":0.8}]},{"elementType":"labels.icon","stylers":[{"hue":"#0066ff"},{"weight":1.9}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"hue":"#0077ff"},{"saturation":-7},{"lightness":24}]}];

    $scope.setup = function(boardId) {
      $http.get('/api/v1/boards/' + boardId + '.json').then(function(response) {
        // $scope.board = response.data;
        $scope.pins = (response.data).pins;
        setupMap($scope.pins);
      });
    };

    function setupMap() {
      var mapOptions = {
        center: new google.maps.LatLng(40.601203, -8.668173),
        zoom: 13,
        mapTypeId: 'roadmap',
        styles: styles
      };

      var geocoder = new google.maps.Geocoder();

      pinMap = new google.maps.Map(document.getElementById('pinMap'), mapOptions);

      $scope.pins.forEach(function(pin) {
        var address = pin.address;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            pinMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: pinMap,
              position: results[0].geometry.location
            });
            // marker.addListener('click', function() {
            //   map.setCenter(marker.getPosition());
            //   infowindow.setContent(board.name);
            //   infowindow.open(map, marker);
            // });
            // marker.addListener("click", function() {
              // map.setCenter(this.getPosition());
            //   map.setZoom(10);
            //   createBoardPins(board);
            // });
          }
        });
      });
      
    }

  });
})();


// (function() {
//   angular.module("app").controller("pinsController", function($scope, $http) {
  
//     var map;

//     $scope.setup = function() {
//       $http.get('/api/v1/pins.json').then(function(response) {
//         $scope.pins = response.data;
//         setupMap($scope.pins);
//       });
//     };

//     function setupMap(pins) {
//       var mapOptions = {
//         center: new google.maps.LatLng({lat: 41.84, lng: -87.68}),
//         zoom: 2,
//         mapTypeId: 'roadmap',
//         scrollwheel: false
//       };
//       map = new google.maps.Map(document.getElementById('map'), mapOptions);

//       var geocoder = new google.maps.Geocoder();
      
//       var infowindow = new google.maps.InfoWindow({
//         content: ''
//       });

//       $scope.pins.forEach(function(pin) {
//         var address = pin.address;
//         geocoder.geocode({'address': address}, function(results, status) {
//           if (status === google.maps.GeocoderStatus.OK) {
//             map.setCenter(results[0].geometry.location);
//             var marker = new google.maps.Marker({
//               map: map,
//               position: results[0].geometry.location
//             });
//             marker.addListener('click', function() {
//               map.setCenter(marker.getPosition());
//               infowindow.setContent(pin.name);
//               infowindow.open(map, marker);
//             // });
//             // marker.addListener("click", function() {
//               // map.setCenter(this.getPosition());
//               map.setZoom(10);
//               createBoardPins(pin);
//             });
//           }
//         })
//       });

//       var createBoardPins = function(inputBoard) {
//         var address = (inputBoard.address);     
//         geocoder.geocode({'address': address}, function(address) {
//           map.setCenter(address[0].geometry.location);
//           map.setZoom(12);
//           $scope.boards.forEach(function(board) {
//             board.pins.forEach(function(pin) {
//               var pinAddress = pin.address;
//                 geocoder.geocode({'address': pinAddress}, function(results) {
//                   var marker = new google.maps.Marker({
//                     map: map,
//                     position: results[0].geometry.location
//                   });
//                 })
//             })
//           })
//         })


//       // }          
//     }
//     window.$scope = $scope;
//   });
// })();