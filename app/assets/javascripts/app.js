/* global angular */
/* global google */

(function() {
  "use strict";

  var app = angular.module("app", []);

  app.directive('googleplace', function() {
    return {
      require: 'ngModel',
      scope: {
        'type': '@placesType'
      },
      link: function(scope, element, attrs, model) {
        var options = {
          types: [scope.type],
          componentRestrictions: {}
        };
        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
          scope.$apply(function() {
            model.$setViewValue(element.val());
          });
        });
      }
    };
  });
  function boardsController($scope) {
    $scope.gPlace;
  }
  function pinsController($scope) {
    $scope.gPlace;
  } 
}());

$(window).scroll(function(){
  if ( $(window).scrollTop() > 30 ) {
    $('.logo').addClass('scrolling');
  } else {
    $('.logo').removeClass('scrolling');
  }
});