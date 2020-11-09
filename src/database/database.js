const mysql = require('mysql');
const env = require('../config/env');

class DB {
    
    static connection() {
        env.searchArray(['DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD'], data => {
            console.log(data.get('DB_HOST'));
        });
        
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
    where_array = [];
    value_array = [];

    constructor(connection, table){
        this.connection = connection;
        this.table = table;
    }

    where(property, operator, value, prefix = "AND") {
        this.where_array.length > 0 ? this.where_array.push(`${prefix} ${property} ${operator}`) : this.where_array.push(`${property} ${operator}`);
        this.value_array.push(value);
        return this;
    }

    orWhere(property, operator, value) {
        return this.where(property, operator, value, 'OR');
    }

    get(callback, first = false) {
        let table = this.table;
        let where_array = this.where_array;
        let cmd = `SELECT * FROM ${table}`;
        if (where_array.length > 0) {
            cmd += ' WHERE';
            where_array.forEach(condition => {
                cmd += ` ${condition} ?`;
                
            });
        }
        cmd = mysql.format(cmd, this.value_array);
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