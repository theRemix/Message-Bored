angular.module('Users', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: '/scripts/users/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .when('/login', {
        templateUrl: '/scripts/users/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        template: '<h2>Logging Out</h2>',
        controller: 'LogoutCtrl'
      })
      .when('/register', {
        templateUrl: '/scripts/users/new.html',
        controller: 'NewCtrl',
        controllerAs: 'user'
      });
  }])
  .controller('ListCtrl', [
    '$rootScope','UserService',
    function($rootScope, UserService){

      this.users = [];
      UserService.all()
        .then( users => {
          this.users = users;
        }, err => {
          $rootScope.errors = "Error getting latest messages from API";
          console.error(err);
        });

    }
  ])
  .controller('NewCtrl', [
    '$rootScope','$location','UserService',
    function($rootScope, $location, UserService){

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
    '$rootScope','$location','UserService',
    function($rootScope, $location, UserService){

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

