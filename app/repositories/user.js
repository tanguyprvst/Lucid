const Repository = require("../../src/repository");

const Repository = require('../../src/repository');

class UserRepository extends Repository {

    table_name = 'users';

    all(){
        this.all(this.table_name);
    }
}