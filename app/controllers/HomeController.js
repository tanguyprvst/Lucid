const Controller = require('../../src/app/controller');
const DB = require('../../src/database/database');
const env = require('../../src/config/env');

class ExempleController extends Controller {

    getRoutes(){
        return [
            ['/', 'get', this.home],
        ]
    }

    home(res){
        DB.table('users').get(data => {
            console.log(data);
        });
        
        env.search('APP_NAME', data => {
            return this.render(res, 'welcome.html', {
                name: data
            });
        })
    }
}

module.exports = ExempleController
