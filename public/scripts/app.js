/* globals angular */

angular.module('app', ['ngRoute', 'Messages', 'Users', 'Topics'])
.config(['$locationProvider',
  function($locationProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

}]);
