const Route = require('../../src/route')

class ExempleController {

    getRoutes(){
        return [
            new Route('/', 'get', this.exempleFunc),
            new Route('/exemple/{exemple}', 'get', this.exempleFunc_2),
            new Route('/exemple', 'post', this.exempleFunc_3),
        ]
    }

    exempleFunc(){
        return {value: 'Bonjour !'};
    }

    exempleFunc_2(exemple){
        return {value: exemple};
    }

    exempleFunc_3(request){
        return {value: request.exemple};
    }
}

module.exports = ExempleController
