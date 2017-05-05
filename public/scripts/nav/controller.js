angular.module('app')
  .controller('NavCtrl', [
    '$rootScope','$scope','TopicService',
    function($rootScope, $scope, TopicService){
      $rootScope.loggedIn = localStorage.hasOwnProperty('user_id');
      $rootScope.updateTopics = () => TopicService.all()
        .then( topics => {
          $scope.topics = topics;
        }, err => {
          $rootScope.errors = "Error getting list of topics from API";
          console.error(err);
        });

      $rootScope.updateTopics();

      $scope.topics = [];
    }
  ]);
