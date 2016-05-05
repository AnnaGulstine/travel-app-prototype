/* global angular, google */
(function() {
  angular.module("app").controller("pinsController", function($scope, $http) {

    var pinMap;
  
    var styles = [{"stylers":[{"hue":"#007fff"},{"saturation":40}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}];

    var image = "/assets/oysterMarker.png";

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

      var infowindow = new google.maps.InfoWindow({
        content: 'Hello'
      });

      $scope.pins.forEach(function(pin) {
        var address = pin.address;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            pinMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: pinMap,
              position: results[0].geometry.location,
              icon: image
            });
            console.log(marker);
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