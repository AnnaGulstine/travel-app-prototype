/* global angular, google */
(function() {
  angular.module("app").controller("placesController", function($scope, $http) {

    $scope.results = [];
    var setPlaces = function(results) {
      for (var i = 0; i < results.length; i++) {
        $scope.results.push(results[i]);
      }
      $scope.$apply();
      console.log($scope.results);
    };


    $scope.setup = function() {
      var request = {
        location: new google.maps.LatLng(41.8781, -87.6298),
        radius: '500',
        types: ['point_of_interest']
      };
      var container = document.getElementById("places");
      var service = new google.maps.places.PlacesService(container);
      service.nearbySearch(request, setPlaces);
    };
  });
})();


    