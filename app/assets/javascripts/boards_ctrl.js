/* global angular, google */
/* eslint no-unused-vars: "marker" */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
  
    var map;

    var styles = [{"stylers":[{"hue":"#007fff"},{"saturation":89}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}];
    
    var image = "assets/oysterMarker.png";

    $scope.setup = function() {
      $http.get('/api/v1/boards.json').then(function(response) {
        $scope.boards = response.data;
        setupMap($scope.boards);
      });
    };

    $scope.zoomOut = function() {
      map.setCenter({lat: 41.84, lng: -87.68});  
      map.setZoom(2);       
    }

    function setupMap(boards) {
      var mapOptions = {
        center: new google.maps.LatLng(41.84, -87.68),
        zoom: 2,
        mapTypeId: 'roadmap',
        scrollwheel: false,
        styles: styles,
        disableDefaultUI:true        
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var geocoder = new google.maps.Geocoder();

      $scope.boards.forEach(function(board) {
        var address = board.address;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: image,
              url: 'http://localhost:3000/boards/' + board.id
            });
            marker.addListener('click', function() {
              window.location.href = marker.url;           
            });
          }
        })
      });

      var createBoardPins = function(inputBoard) {
        var address = (inputBoard.address);     
        geocoder.geocode({'address': address}, function(address) {
          map.setCenter(address[0].geometry.location);
          map.setZoom(12);
          $scope.boards.forEach(function(board) {
            board.pins.forEach(function(pin) {
              var pinAddress = pin.address;
                geocoder.geocode({'address': pinAddress}, function(results) {
                  var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                  });                 
                })
            })
          })
        })

      }          
    }
    window.$scope = $scope;
  });
})();
