const Route = require('../../src/route');
const Controller = require('../../src/controller');

const ExempleMiddleware = require('../middlewares/ExempleMiddleware');

class ExempleController extends Controller {

    getRoutes(){
        return [
            new Route('/', 'get', this.exempleFunc, ExempleMiddleware),
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
