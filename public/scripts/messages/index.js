angular.module('Messages', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/messages/latest', {
        templateUrl: '/scripts/messages/list.html',
        controller: 'LatestCtrl'
      })
      .when('/messages/new', {
        templateUrl: '/scripts/messages/new.html',
        controller: 'NewMessageCtrl'
      });
  }])
  .controller('LatestCtrl', [
    '$scope','MessageService',
    function($scope, MessageService){

      $scope.messages = [];
      MessageService.getMessages()
        .then(({ data, status })=> {
          if( status === 200 ){
            $scope.messages = data;
          } else {
            $rootScope.errors = "Error getting latest messages from API";
          }
        }, err => {
          $rootScope.errors = "Error getting latest messages from API";
          console.error(err);
        });

    }
  ])
  .controller('NewMessageCtrl', [
    '$scope','MessageService',
    function($scope, MessageService){

      $scope.newMessage = {};
      $scope.createMessage = function(){
        MessageService.createMessage($scope.newMessage)
          .then(({ data, status })=> {
            if( status === 200 ){
              console.log(data);
              $scope.messages = data;
            } else {
              $rootScope.errors = "Error saving message";
            }
          }, err => {
            $rootScope.errors = "Error saving message";
            console.error(err);
          });

      }

    }
  ]);

