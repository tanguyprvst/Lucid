const lineReader = require('line-reader');

class Environement {

    static search(key, callback){
        lineReader.eachLine('./.env', function(line, last) {
            if (line.startsWith(key)) {
                callback(line.substring(key.length + 1, line.length));
                return false;
            }
            if(last) { console.log('Env varibale not found'); }
        })
    }

    static searchArray(keys, callback){
        let output = new Map();
        lineReader.eachLine('./.env', function(line, last) {
            keys.forEach(key => {
                if (line.startsWith(key)) {
                    output.set(key, line.substring(key.length + 1, line.length));
                }
            });
            if(last) { 
                return callback(output);
            }
        })
    }
}

module.exports = Environement