/* globals angular */

angular.module('MessageBored', ['ngRoute'])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/latest', {
        templateUrl: 'templates/latest.html',
        controller: 'LatestCtrl',
        controllerAs: 'latest'
      })
      // .when('/users', {
      //   templateUrl: 'templates/users/index.html',
      //   controller: 'UsersCtrl',
      //   controllerAs: 'users'
      // })
      // .when('/users/:username', {
      //   templateUrl: 'templates/users/show.html',
      //   controller: 'UserCtrl',
      //   controllerAs: 'user'
      // })
      // .when('/topics', {
      //   templateUrl: 'templates/topics/index.html',
      //   controller: 'TopicsCtrl',
      //   controllerAs: 'topics'
      // })
      // .when('/topics/:topic', {
      //   templateUrl: 'templates/topics/show.html',
      //   controller: 'TopicCtrl',
      //   controllerAs: 'topic'
      // })
      // .when('/about', {
      //   templateUrl: 'templates/about.html'
      // })
      .otherwise({
        templateUrl: 'templates/index.html'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

}]);
