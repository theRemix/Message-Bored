angular.module('app')
  .controller('NavCtrl', ['$rootScope', function($rootScope){
    $rootScope.loggedIn = localStorage.hasOwnProperty('user_id');
  }]);
