const Response = require("./response");

class Controller {

    constructor(){}
    
    render(res, json) { Response.success(res, json) }
    getRoutes(){ return [] }
}

module.exports = Controller