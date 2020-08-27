const Model = require('../../src/model');

class User extends Model{

    repository = '';

    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

module.exports = User