const Response = require("./response");
const ejs = require('ejs');
const fs = require('fs');
const mime = require('mime-types');

class Controller {

    constructor(){}
    
    json(res, json) { Response.json(res, json); }

    render(res, path, data = {}) {
        ejs.renderFile(`./ressources/views/${path}`, data, function(err, str){
            return Response.render(res, str);
        });
    }

    getRessourceFile(path, c) {
        fs.readFile(`./ressources/uploads/${path}`, c);
    }

    renderRessourceFile(res, path) {
        fs.readFile(`./ressources/uploads/${path}`, (err, data) => {
            if(err) return Response.notfound(res);
            const contentType = mime.extension(path);
            Response.custom(res, data, (contentType) ? contentType : 'text/plain');
        });
    }

    getRoutes(){ return [] }
}

module.exports = Controller