/* global angular, google */
(function() {
  angular.module("app").controller("pinsController", function($scope, $http) {
  
    $scope.setup = function() {
      $http.get('/api/v1/pins.json').then(function(response) {
        $scope.pins = response.data;
        setupMap($scope.pins);
      });
    };

    function setupMap() {
      var mapOptions = {
        center: new google.maps.LatLng(40.601203, -8.668173),
        zoom: 10,
        mapTypeId: 'roadmap'
      };

      var geocoder = new google.maps.Geocoder();

      var pinMap = new google.maps.Map(document.getElementById('pinMap'), mapOptions);

      var markersData = [
        {
          address: "Chicago, IL",
          lat: 41.84,
          lng: -87.68,
          name: "Chicago"
        },
        {
          address: "London",
          lat: 51.5,
          lng: -0.1167,
          name: "London"
        }
      ];

      markersData.forEach(function(place) {

        var address = place.address;

        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            pinMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: pinMap,
              position: results[0].geometry.location
            });
            marker.addListener('click', function() {
              infowindow.setContent(place.name);
              infowindow.open(pinMap, marker);
            });
          } else {
            alert('Geocode was not successful for the following reason ' + status );
          }
        });
      });
    }

  });
})();