const mysql = require('mysql');

class DB {
    static connection() {
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'lucid'
          });
          
          connection.connect();

          let test = connection.query('SELECT * FROM users', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
          });
          return connection;
    }

    static table(table){
        return new QueryBuilder(this.connection(), table);
    }
}

class QueryBuilder {
 
    where = undefined
    constructor(connection, table){
        this.connection = connection;
        this.table = table;
    }

    where(property, operator, value) {
        if (is_string(value)) value = '\"' + value + '\"';
        this.where = `${property} ${operator} ${value}`;
        return this;
    }

    get() {
        let table = this.table;
        let where = this.where;
        if (where) {
            return this.connection.query(`SELECT * FROM ${table} WHERE ${where}`);
        }
        return this.connection.query(`SELECT * FROM ${table}`);
    }

    first() {
        return this.get()[0];
    }

    delete() {
        let table = this.table;
        let where = this.where;

        if ($where) {
            return this.connection.query(`DELETE FROM ${table} WHERE ${where}`);
        }
    }
}

module.exports = DB