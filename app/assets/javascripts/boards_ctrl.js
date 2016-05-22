/* global angular, google */
/* eslint no-unused-vars: "marker" */

(function() {
  angular.module("app").controller("boardsController", function($scope, $http, $q) {

    $scope.gPlace;
  
    var map;

    var styles = [{"stylers":[{"hue":"#007fff"},{"saturation":89}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}];
    
    var image = "assets/oysterMarker.png";

    $scope.setup = function() {
      $http.get('/api/v1/boards.json').then(function(response) {
        $scope.boards = response.data;
        setupMap($scope.boards);
      });
    };
    
    var geocoder = new google.maps.Geocoder();

    $scope.setMarkers = function() {

      var bounds = new google.maps.LatLngBounds();

      $scope.boards.forEach(function(board) {
        var name = board.name;

        geocoder.geocode({'address': name}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: image,
              url: 'http://localhost:3000/boards/' + board.id
            });
            marker.addListener('click', function() {
              window.location.href = marker.url;           
            });
            bounds.extend(marker.getPosition());
            map.fitBounds(bounds);
          }
        })
      });
    };

    function setupMap(boards) {
      var mapOptions = {
        mapTypeId: 'roadmap',
        scrollwheel: false,
        styles: styles,
        disableDefaultUI:true,
        url: "http://localhost:3000/boards/new"    
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);

      map.addListener('click', function(url) {
        window.location.href = map.url;
      });      
      $scope.setMarkers();
    }
    window.$scope = $scope;
  });
})();
