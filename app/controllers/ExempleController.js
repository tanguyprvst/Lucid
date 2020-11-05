const Controller = require('../../src/controller');
const DB = require('../../src/database');
const ExempleMiddleware = require('../middlewares/ExempleMiddleware');

class ExempleController extends Controller {

    getRoutes(){
        return [
            ['/', 'get', this.exempleFunc, ExempleMiddleware],
            ['/exemple/{exemple}', 'get', this.exempleFunc_2, ExempleMiddleware],
            ['/exemple/{test}', 'post', this.exempleFunc_3],
        ]
    }

    exempleFunc(){
        DB.table('users').get((data) => {
            console.log(data);
            this.render({value: 'Bonjour !'});
        });
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
