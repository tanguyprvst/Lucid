const Response = require("./response");
const ejs = require('ejs');
const fs = require('fs');

class Controller {

    constructor(){}
    
    json(res, json) { Response.json(res, json); }

    render(res, path, data = {}) {
        let filename = './app/views/'
        ejs.renderFile(filename + path, data, function(err, str){
            return Response.render(res, str);
        });
    }

    getRoutes(){ return [] }
}

module.exports = Controller