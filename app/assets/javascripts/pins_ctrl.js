/* global angular, google */
(function() {
  angular.module("app").controller("pinsController", function($scope, $http) {

    var pinMap;

    $scope.markers = [];
  
    // var styles = [{"stylers":[{"hue":"#007fff"},{"saturation":40}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}];
    // var lightGray = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    var icons = {
      "attractions": "/assets/cameraIcon.png",
      "hotels": "/assets/hotelIcon.png",
      "restaurants": "/assets/restaurantIcon.png"
    };

    $scope.mapStyles = {
        blue: [{"stylers":[{"hue":"#007fff"},{"saturation":40}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}],
        lightGray: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
      };

    $scope.changeColor = function(inputStyles) {
      // var mapStyles = {
      //   blue: [{"stylers":[{"hue":"#007fff"},{"saturation":40}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}],
      //   lightGray: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
      // };
      console.log(inputStyles);
      console.log($scope.mapStyles.blue);
      var foo = styles;
      var h = {};
      h[foo] = mapStyles.inputStyles;
      console.log(h);
      pinMap.setOptions(h);
    };

    $scope.setup = function(boardId) {
      $http.get('/api/v1/boards/' + boardId + '.json').then(function(response) {
        $scope.pins = (response.data).pins;
        $scope.boardAddress = (response.data).name;
        setupMap($scope.pins);
      });
      $scope.selectedCategory = undefined;
    };

    function clearMarkers() {
      for(var i = 0; i < $scope.markers.length; i++) {
        $scope.markers[i].setMap(null);
      }
    }

    $scope.selectCategory = function(inputObject) {
      $scope.selectedCategory = inputObject;
      if ($scope.selectedCategory !== undefined) {
        clearMarkers();
        $scope.pins.forEach(function(pin) {
          inputObject = inputObject.toLowerCase();
          if (pin.category === inputObject) {
            var infowindow = new google.maps.InfoWindow({
              content: 'Hello'
            });
            if (pin.latitude) {
              var myLatLng = new google.maps.LatLng(pin.latitude, pin.longitude);
              var marker = new google.maps.Marker({
                map: pinMap,
                position: myLatLng,
                icon: icons[pin.category]
              });
              $scope.markers.push(marker);

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
                infowindow.setContent(pin.name + '<br />' + urlString + '<br />' +
                  text + "<br />" + "<a href='/pins/" + pin.id + "'>" + "View / Edit this pin" + "</a>");
                infowindow.open(pinMap, marker);
              });
            }
          }
        });
      } else {
        setPins();
      }
    };

    var bounds = new google.maps.LatLngBounds();

    function setPins() {
      var infowindow = new google.maps.InfoWindow({
        content: 'Hello'
      });
      $scope.pins.forEach(function(pin) {
        if (pin.latitude) {
          var myLatLng = new google.maps.LatLng(pin.latitude, pin.longitude);
          var marker = new google.maps.Marker({
            map: pinMap,
            position: myLatLng,
            icon: icons[pin.category]
          });
          $scope.markers.push(marker);

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
            infowindow.setContent(pin.name + '<br />' + urlString + '<br />' +
              text + "<br />" + "<a href='/pins/" + pin.id + "'>" + "View / Edit this pin" + "</a>");
            infowindow.open(pinMap, marker);
          });
        }
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