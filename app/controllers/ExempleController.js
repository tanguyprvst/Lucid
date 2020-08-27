const Route = require('../../src/route');
const Controller = require('../../src/controller');
const DB = require('../../src/database');
const ExempleMiddleware = require('../middlewares/ExempleMiddleware');

class ExempleController extends Controller {

    getRoutes(){
        return [
            new Route('/', 'get', this.exempleFunc, ExempleMiddleware),
            new Route('/exemple/{exemple}', 'get', this.exempleFunc_2, ExempleMiddleware),
            new Route('/exemple/{test}', 'post', this.exempleFunc_3),
        ]
    }

    exempleFunc(){
        let user = DB.table('users', function(err){
            console.log(err);
        });
        //console.log(user.get());
        return {value: 'Bonjour !'};
    }

    exempleFunc_2(exemple){
        return {value: exemple};
    }

    exempleFunc_3(request, test){
        return {
            post: request.exemple,
            get: test
        };
    }
}

module.exports = ExempleController
