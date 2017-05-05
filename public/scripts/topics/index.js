angular.module('Topics', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/topics/new', {
        templateUrl: '/scripts/topics/new.html',
        controller: 'NewCtrl',
        controllerAs: 'topic'
      });
  }])
  .controller('NewCtrl', [
    '$rootScope','$scope','$location','TopicService',
    function($rootScope, $scope, $location, TopicService){

      this.create = function(newTopic){
        newTopic.created_by = localStorage.getItem('user_id');
        TopicService.create(newTopic)
          .then( topic => {
            $rootScope.updateTopics();
            $location.path("/");
          }, err => {
            $rootScope.errors = "Error creating Topic";
            console.error(err);
          });

      };

    }
  ]);


