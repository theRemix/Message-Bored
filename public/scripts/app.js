/* globals angular */

angular.module('app', ['ngRoute', 'Messages', 'Users'])
.config(['$locationProvider',
  function($locationProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

}]);
