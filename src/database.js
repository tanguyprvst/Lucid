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
    where_array = []
    constructor(connection, table){
        this.connection = connection;
        this.table = table;
    }

    where(property, operator, value) {
        if (typeof value == 'string' || value instanceof String) value = '\"' + value + '\"';
        this.where_array.length > 0 ? this.where_array.push(`AND ${property} ${operator} ${value}`) : this.where_array.push(`${property} ${operator} ${value}`);
        return this;
    }

    orWhere(property, operator, value) {
        if (typeof value == 'string' || value instanceof String) value = '\"' + value + '\"';
        this.where_array.push(`OR ${property} ${operator} ${value}`);
        return this;
    }

    get(callback, first = false) {
        let table = this.table;
        let where_array = this.where_array;
        let cmd = `SELECT * FROM ${table}`;
        if (where_array.length > 0) {
            cmd += ' WHERE';
            where_array.forEach(condition => {
                cmd += ' ' + condition;
            });
        }
        console.log(cmd);
        this.connection.query(cmd, (err, res) => {
            if(err) throw(err);
            if(first) return callback(res[0]);
            callback(res);
        });
    }

    first(callback) {
        return this.get(callback, true);
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