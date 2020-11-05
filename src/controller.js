const Response = require("./response");

class Controller {

    res = undefined;

    constructor(){}
    
    render(json) { Response.success(this.res, json) }
    getRoutes(){ return [] }
}

module.exports = Controller