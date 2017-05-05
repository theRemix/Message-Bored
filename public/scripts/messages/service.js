class MessageService{

  constructor($http){
    this.apiMessages = '/api/messages';
    this.apiMessagesByTopic = '/api/messages/by-topic';
    this.apiLatest = '/api/messages/latest';

    this.$http = $http;
  }

  createMessage(message){
    return this.$http.post(this.apiMessages, message);
  }

  getLatest(){
    return this.$http.get(this.apiLatest);
  }

  byTopic(topic_id){
    return this.$http.get(this.apiMessagesByTopic + "/" + topic_id)
      .then(({ data, status })=> {
        if( status === 200 ){
          return data;
        } else {
          throw "Error getting messages by topic.";
        }
      });
  }
}

angular.module('Messages')
  .service('MessageService', ['$http', MessageService]);


