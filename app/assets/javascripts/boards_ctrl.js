/* global angular */
(function() {
  angular.module("app").controller("boardsController", function($scope, $http) {
  
    $scope.setup = function() {
      $http.get('/api/v1/boards.json').then(function(response) {
        $scope.boards = response.data;
        // console.log($scope.boards);
      });
    };
  });
})();