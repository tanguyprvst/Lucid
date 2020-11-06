const Controller = require('../../src/app/controller');
const DB = require('../../src/database/database');
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
        DB.table('users').get((data) => {
            this.render(res, 'welcome.html', {users: data});
        });
    }

    exempleFunc_2(res, exemple){
        this.render(res, {exemple});
    }

    exempleFunc_3(res, request, test){
        this.render(res, {request, test});
    }
}

module.exports = ExempleController
