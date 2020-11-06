const Response = require("./response");
const ejs = require('ejs');

class Controller {

    constructor(){}
    
    json(res, json) { Response.json(res, json); }
    render(res, path, data = null) {
        let filename = './app/views/'
        ejs.renderFile(filename + path, data, function(err, str){
            Response.render(res, str);
        });
    }
    getRoutes(){ return [] }
}

module.exports = Controller