/* global angular, google */
/* eslint no-unused-vars: "marker" */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
  
    $scope.setup = function() {
      $http.get('/api/v1/boards.json').then(function(response) {
        $scope.boards = response.data;
        setupMap($scope.boards);
      });
    };

    function setupMap(boards) {
      var mapOptions = {
        center: new google.maps.LatLng(41.84, -87.68),
        zoom: 2,
        mapTypeId: 'roadmap'
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var geocoder = new google.maps.Geocoder();

      boards.forEach(function(board) {
        board.pins.forEach(function(pin) {
          var address = pin.address;

          geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
              });
            } 
          });
        })
      });

      $scope.newMap = function(inputBoard) {
        var address = (inputBoard.address);     
        geocoder.geocode({'address': address}, function(address) {
          map.setCenter(address[0].geometry.location);
          map.setZoom(12);
        })

      }           
    }
  });
})();