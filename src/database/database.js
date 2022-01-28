const mysql = require('mysql');
const env = require('../../env');
const ArrayHelper = require('../utils/arrays');

class DB {
    
    static connection() {
        let values = env.get();
        
        var connection = mysql.createConnection({
            host     : values['DB_HOST'],
            user     : values['DB_USERNAME'],
            password : values['DB_PASSWORD'],
            database : values['DB_DATABASE'],
            port: values['DB_PORT'],
          });
          connection.connect();

          return connection;
    }

    static mysql(){
        
    }

    static table(table){
        return new QueryBuilder(this.connection(), table);
    }
}

class QueryBuilder 
{
    select_array = [];
    where_array = [];
    value_array = [];
    end_array = [];

    constructor(connection, table){
        this.connection = connection;
        this.table = table;
    }

    select(fields) {
        if(fields instanceof String) {
            fields = fields.trim();
            if(!ArrayHelper.containsValue(this.select_array, f)) return this.select_array.push(f);
        }
        fields.forEach(f => {
            f = f.trim();
            if(!ArrayHelper.containsValue(this.select_array, f)) this.select_array.push(f);
        });
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

    limit(count) {
        this.end_array.push(`LIMIT ${count}`);
    }

    order(field, type = 'ASC') {
        this.end_array.push(`ORDER BY ${field} ${type}`);
    }

    orders(ords) {
        let cmd = 'ORDER BY ';
        Object.entries(ords).forEach((v, i) => {
            if(i) cmd += ', ';
            cmd += `${v[0]} ${v[1]}`;
        });
        this.end_array.push(cmd);
    }

    create(fields, callback) {
        let cmd = `INSERT INTO ${this.table} (`;

        Object.keys(obj).forEach((n, i) => {
            if(i) query += ', ';
            query += n;
        });
        query += ') VALUES ?';

        cmd = mysql.format(cmd, Object.values(fields));
        return this.connection.query(cmd, (err, res) => {
            if(err) throw(err);
            if(callback) callback(res ? res.insertId : 0);
        });
    }

    update(fields, callback) {
        let cmd = `UPDATE ${this.table} SET `;

        Object.keys(fields).forEach((v, i) => {
            if(i) cmd += ', ';
            cmd += `${v} = ?`;
        });

        cmd = mysql.format(cmd, Object.values(fields));
        return this.connection.query(cmd, (err, res) => {
            if(err) throw(err);
            if(callback) callback(res);
        });
    }

    delete(callback) {
        if ($where) {
            return this.connection.query(`DELETE FROM ${this.table} WHERE ${this.where}`, (err, res) => {
                if(!callback) return;
                if(err || !res) return callback(false);
                callback(true);
            });
        }
    }
}

module.exports = DB