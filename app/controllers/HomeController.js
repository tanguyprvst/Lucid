const Controller = require('../../src/app/controller');
const env = require('../../env');
const DB = require('../../src/database/database');

class ExempleController extends Controller {

    getRoutes(){
        return [
            ['/', 'get', this.home],
        ]
    }

    home(res){
        DB.table('users').get(data =>  {
            console.log(data);
        })
        
        const name = env.get()['APP_NAME'];
        return this.render(res, 'welcome.html', {
            name: name
        });
    }
}

module.exports = ExempleController
