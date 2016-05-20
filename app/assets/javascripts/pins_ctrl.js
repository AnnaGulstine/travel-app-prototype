/* global angular, google */
(function() {
  angular.module("app").controller("pinsController", function($scope, $http) {

    var pinMap;

    $scope.markers = [];
  
    var icons = {
      "attractions": "/assets/cameraIcon.png",
      "hotels": "/assets/hotelIcon.png",
      "restaurants": "/assets/restaurantIcon.png"
    };

    $scope.mapStyles = {
      blue: [{"stylers":[{"hue":"#007fff"},{"saturation":40}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}],
      lightGray: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
      gold: [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#bfa779"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":"0"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"},{"color":"#bfa779"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"simplified"},{"color":"#ca1010"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"saturation":"2"},{"visibility":"off"},{"color":"#d32929"}]},{"featureType":"landscape.natural.terrain","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20},{"visibility":"simplified"},{"saturation":"0"},{"color":"#d5c6a6"}]}],
      blackWhite: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.terrain","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#000000"},{"weight":"0.62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text.fill","stylers":[{"weight":"0.24"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"weight":"0.52"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#363636"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#000000"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#5c5c5c"}]}],
      blackWhite2: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"},{"hue":"#ff0042"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"color":"#000000"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"simplified"},{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"},{"color":"#000000"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"},{"color":"#000000"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]}],
      brightPink: [{"stylers":[{"hue":"#ff61a6"},{"visibility":"on"},{"invert_lightness":true},{"saturation":40},{"lightness":10}]}],
      darkRed: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#dbdbdb"},{"weight":0.8}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#5d1e20"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#41130c"},{"lightness":-7}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#3e1a1a"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#600707"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#3a1f1f"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#620303"},{"lightness":-18}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#4b0202"},{"lightness":-34}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#271111"}]}],
      goodEarth: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f3f4f4"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"weight":0.9},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#83cead"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#7fc8ed"}]}],
      darkBlueOcean: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#152030"},{"visibility":"on"}]}],
      blackGold: [{"featureType":"administrative","elementType":"all","stylers":[{"color":"#090909"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"color":"#f6e7e7"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"color":"#141212"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"color":"#0b0b0b"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"color":"#c55353"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"color":"#050505"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#090909"},{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#030303"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"color":"#050505"},{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"color":"#050505"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"color":"#030303"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#080707"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#f2ecec"},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#030303"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#e3be7d"},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"color":"#e3be7d"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"color":"#fcf3f3"},{"visibility":"on"},{"saturation":"22"},{"weight":"0.01"},{"invert_lightness":true}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#4d4c4c"},{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#292828"}]}],
      purpleGreen: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"61"},{"lightness":"25"},{"hue":"#ff003c"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46e9ec"},{"visibility":"on"}]}],
      pinkGreen: [{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#FF007B"},{"saturation":59.80000000000001},{"lightness":21},{"gamma":1}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#FF00AF"},{"saturation":32.599999999999994},{"lightness":20.599999999999994},{"gamma":1}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#612141"},{"lightness":50.80000000000001},{"gamma":1}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#FFE800"},{"lightness":8.600000000000009},{"gamma":1}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#FFD900"},{"saturation":44.79999999999998},{"lightness":3.6000000000000085},{"gamma":1}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#0078FF"},{"saturation":24.200000000000003},{"gamma":1}]}]
    };

    $scope.changeColor = function(inputStyles) {
      var foo = 'styles';
      var h = {};
      h[foo] = $scope.mapStyles[inputStyles];
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
              width: 500,
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
            infowindow.setContent("<div id='infoWindowLeft'><h4>" + pin.name + '</h4><br />' + urlString + '<br />' +
              text + "<br />" + "<h5><a href='/pins/" + pin.id + "'></h5>" + "<h5>View / Edit this pin</h5>" + "</a></div>" + "<div id='infoWindowRight'><img src=" + pin.image + " id='infoWindowImage' / ></div>");
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
            styles: $scope.mapStyles.blue,
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
    window.$scope = $scope;
  });
})();