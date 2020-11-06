const lineReader = require('line-reader');

class Environement {

    static search(key){
        let output = undefined;
        lineReader.eachLine('./.env', function(line) {
            if (line.startsWith(key)) {
                console.log(line);
                output =  line.substring(key.length + 1, line.length);
            }
        }).then(function () {
            return output;
        });
    }
}

module.exports = Environement