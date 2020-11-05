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

    exempleFunc(res){
        DB.table('users').where('username', '=', 'Japan').get((data) => {
            this.render(res, {value: data});
        });
    }

    exempleFunc_2(res, exemple){
        this.render(res, {value: exemple});
    }

    exempleFunc_3(res, request, test){
        console.log(request);
        this.render(res, {value: request});
    }
}

module.exports = ExempleController
