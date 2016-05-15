/* global angular, google */
(function() {
  angular.module("app").controller("pinsController", function($scope, $http) {

    var pinMap;
  
    var styles = [{"stylers":[{"hue":"#007fff"},{"saturation":40}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}];

    var image = "/assets/cameraIcon.png";
    // var image = "/assets/hotelIcon.png";
    // var image = "/assets/restaurantIcon.png";
    // var image = "/assets/oysterMarker.png";


    $scope.setup = function(boardId) {
      $http.get('/api/v1/boards/' + boardId + '.json').then(function(response) {
        $scope.pins = (response.data).pins;
        $scope.boardAddress = (response.data).name;
        setupMap($scope.pins);
      });
    };

    $scope.selectedCategory = function(pin) {
      return pin.selected === "selected";
    };

    var bounds = new google.maps.LatLngBounds();

    function setPins() {
      var infowindow = new google.maps.InfoWindow({
        content: 'Hello'
      });
      $scope.pins.forEach(function(pin) {
        var myLatLng = new google.maps.LatLng(pin.latitude, pin.longitude);
        var marker = new google.maps.Marker({
          map: pinMap,
          position: myLatLng,
          icon: image
        });

        bounds.extend(marker.getPosition());
        pinMap.fitBounds(bounds);

        marker.addListener('click', function() {
          var text = "";
          if (!pin.text) {
            text = "";
          } else {
            text = pin.text;
          }
          var urlString = "";
          if (!pin.url) {
            urlString = "";
          } else {
            urlString = '<a href=' + pin.url + '>Link to website</a>';
          }
          infowindow.setContent(pin.name + '<br />' + pin.name + '<br />' + urlString + '<br />' + text);
          infowindow.open(pinMap, marker);
        });
      });
    }

    function setupMap() {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': $scope.boardAddress
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var mapOptions = {
            zoom: 13,
            center: results[0].geometry.location,
            styles: styles,
            mapTypeId: 'roadmap',
            url: "http://localhost:3000/pins/new"
          };
          pinMap = new google.maps.Map(document.getElementById('pinMap'), mapOptions);
          setPins();

          pinMap.addListener('click', function() {
            window.location.href = pinMap.url;
          });
        }
      });
    }

  });
})();