angular.module('Messages', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/latest', {
        templateUrl: '/scripts/messages/list.html',
        controller: 'LatestCtrl',
        controllerAs: 'latest'
      });
  }])
  .controller('LatestCtrl', [
    'MessageService',
    function(MessageService){

      this.messages = [];
      MessageService.getLatest()
        .then(({ data, status })=> {
          if( status === 200 ){
            this.messages = data;
          } else {
            $rootScope.errors = "Error getting latest messages from API";
          }
        }, err => {
          $rootScope.errors = "Error getting latest messages from API";
          console.error(err);
        });

    }
  ]);

