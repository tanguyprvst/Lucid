const Model = require('../../src/model');

class User extends Model {
    static _getTable() { return 'users'; }
    static _getResponseObj(data) { return new User(data); }
    static _getFields() {
        return [
            'username',
            'email',
            'password'
        ];
    }
}

module.exports = User