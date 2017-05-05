angular.module('app')
  .controller('NavCtrl', [
    '$rootScope','TopicService',
    function($rootScope, TopicService){
      this.topics = [];

      $rootScope.loggedIn = localStorage.hasOwnProperty('user_id');
      $rootScope.updateTopics = () => TopicService.all()
        .then( topics => {
          this.topics = topics;
        }, err => {
          $rootScope.errors = "Error getting list of topics from API";
          console.error(err);
        });

      $rootScope.updateTopics();
    }
  ]);
