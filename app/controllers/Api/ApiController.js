const DB = require('../../../src/database/database');
const Controller = require('../../../src/app/controller');
const env = require('../../../env');

class ApiController extends Controller {

    getRoutes(){
        return [
            ['/api/hello', 'get', this.hello]
        ]
    }

    hello(res){
        const name = env.get()['APP_NAME'];
        return this.json(res, { message: `Hi my name is ${name} !` });
    }
}

module.exports = ExempleController