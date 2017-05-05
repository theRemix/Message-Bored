class UserService{

  constructor($http){
    this.apiUsers = '/api/users';

    this.$http = $http;
  }

  create(user){
    return this.$http.post(this.apiUsers, user)
      .then(({ data, status })=> {
        if( status === 200 ){
          return data;
        } else {
          throw "Error registering new user.";
        }
      });
  }

  login(user){
    return this.$http.get(this.apiUsers)
      .then(({ data, status })=> {
        if( status === 200){
          const usersFound = data.filter(u => u.name === user.name );
          if( usersFound.length > 0 ){
            return usersFound.pop();
          } else {
            throw "User does not exist";
          }
        } else {
          throw "User does not exist";
        }
      })
      .catch( err => {
        delete localStorage.user_id;
        throw err;

      });
  }

  all(){
    return this.$http.get(this.apiUsers)
      .then(({ data, status })=> {
        if( status === 200 ){
          return data;
        } else {
          throw "Error getting users.";
        }
      });
  }
}

angular.module('Users')
  .service('UserService', ['$http', UserService]);


