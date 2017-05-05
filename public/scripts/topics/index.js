angular.module('Topics', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/topics/new', {
        templateUrl: '/scripts/topics/new.html',
        controller: 'NewTopicCtrl',
        controllerAs: 'topic'
      })
      .when('/topics/:id', {
        templateUrl: '/scripts/topics/messages.html',
        controller: 'MessagesByTopicCtrl',
        controllerAs: 'topic'
      });
  }])
  .controller('NewTopicCtrl', [
    '$rootScope','$location','TopicService',
    function($rootScope, $location, TopicService){

      console.log("NEW USER");
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
  ])
  .controller('MessagesByTopicCtrl', [
    '$rootScope','$location','$route','TopicService','MessageService',
    function($rootScope, $location, $route, TopicService, MessageService){

      this.topic_id = $route.current.params.id;
      TopicService.getById(this.topic_id)
        .then( topic => {
          Object.assign(this, topic);
        }, err => {
          $rootScope.errors = "Error getting topic from API";
          console.error(err);
        });

      this.messages = [];
      this.getMessagesByTopic = () => MessageService.byTopic(this.topic_id)
        .then( messages => {
          this.messages = messages;
        }, err => {
          $rootScope.errors = "Error getting messages by topic from API";
          console.error(err);
        });
      this.getMessagesByTopic();

      this.createMessage = function(newMessage){
        newMessage.author_id = localStorage.user_id;
        newMessage.topic_id = this.topic_id;
        MessageService.createMessage(newMessage)
          .then(({ data, status })=> {
            if( status === 200 ){
              this.getMessagesByTopic();
            } else {
              $rootScope.errors = "Error saving message";
            }
          }, err => {
            $rootScope.errors = "Error saving message";
            console.error(err);
          });

      };

    }
  ]);


