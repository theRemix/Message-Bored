angular.module('Users', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'scripts/users/list.html',
        controller: 'ListCtrl'
      })
      .when('/login', {
        templateUrl: 'scripts/users/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        template: '<h2>Logging Out</h2>',
        controller: 'LogoutCtrl'
      })
      .when('/register', {
        templateUrl: 'scripts/users/new.html',
        controller: 'NewCtrl',
        controllerAs: 'user'
      });
  }])
  .controller('ListCtrl', [
    '$rootScope','$scope','UserService',
    function($rootScope, $scope, UserService){

      $scope.users = [];
      UserService.all()
        .then( users => {
          $scope.users = users;
        }, err => {
          $rootScope.errors = "Error getting latest messages from API";
          console.error(err);
        });

    }
  ])
  .controller('NewCtrl', [
    '$rootScope','$scope','$location','UserService',
    function($rootScope, $scope, $location, UserService){

      this.create = function(newUser){
        UserService.create(newUser)
          .then( user => {
            localStorage.setItem('user_id', user.id);
            $rootScope.loggedIn = true;
            $location.path("/");
          }, err => {
            $rootScope.errors = "Error saving message";
            console.error(err);
          });

      };

    }
  ])
  .controller('LoginCtrl', [
    '$rootScope','$scope','$location','UserService',
    function($rootScope, $scope, $location, UserService){

      this.send = function(user){
        UserService.login(user)
          .then( user => {
            localStorage.setItem('user_id', user.id);
            $rootScope.loggedIn = true;
            $location.path("/");
          }, err => {
            $rootScope.errors = err;
          });

      };

    }
  ])
  .controller('LogoutCtrl', [
    '$rootScope','$location',
    function($rootScope, $location){
      delete localStorage.user_id;
      $rootScope.loggedIn = false;
      $location.path("/");
    }
  ]);

