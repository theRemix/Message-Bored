class TopicService{

  constructor($http){
    this.apiTopics = '/api/topics';

    this.$http = $http;
  }

  create(topic){
    return this.$http.post(this.apiTopics, topic)
      .then(({ data, status })=> {
        if( status === 200 ){
          if( data.hasOwnProperty("errors") && data.hasOwnProperty("message")){
            throw data.message;
          } else {
            return data;
          }
        } else {
          throw "Error creating new topic.";
        }
      });
  }

  all(){
    return this.$http.get(this.apiTopics)
      .then(({ data, status })=> {
        if( status === 200 ){
          return data;
        } else {
          throw "Error getting topics.";
        }
      });
  }
}

angular.module('Topics')
  .service('TopicService', ['$http', TopicService]);



