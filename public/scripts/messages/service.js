class MessageService{

  constructor($http){
    this.apiMessages = '/api/messages';
    this.apiLatest = '/api/messages/latest';

    this.$http = $http;
  }

  createMessage(message){
    return this.$http.post(this.apiMessages, message);
  }

  getLatest(){
    return this.$http.get(this.apiLatest);
  }
}

angular.module('Messages')
  .service('MessageService', ['$http', MessageService]);


