const Response = require("./response");
const ejs = require('ejs');
const fs = require('fs');

class Controller {

    constructor(){}
    
    json(res, json) { Response.json(res, json); }

    render(res, path, data = null) {
        let filename = './app/views/'
        if(data){
            ejs.renderFile(filename + path, data, function(err, str){
                return Response.render(res, str);
            });
        }else{
            fs.readFile(filename + path, null, (err, data) => {
                if (err) return respone.error(res)
                Response.render(res, data);
            }); 
        }
        
    }

    getRoutes(){ return [] }
}

module.exports = Controller