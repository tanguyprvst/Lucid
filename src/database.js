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

          return connection;
    }

    static table(table){
        return new QueryBuilder(this.connection(), table);
    }
}

class QueryBuilder 
{
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

    async get(callback) {
        let table = this.table;
        let where = this.where;
        if (where) {
            return this.connection.query(`SELECT * FROM ${table} WHERE ${where}`);
        }
        this.connection.query(`SELECT * FROM ${table}`, (err, res) => {
            if(err) throw(err);
            callback(res);
        });
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