const bcrypt = require('bcrypt');

class Hash {

    static make(text){
        bcrypt.hash(text, saltRounds, function(err, hash) {
            if(err) throw err;
            return hash;
        });
    }

    static compare(text, hash){
        bcrypt.compare(text, hash, function(err, result) {
            if(err) throw err;
            return result;
        });
    }
}

module.exports = Hash