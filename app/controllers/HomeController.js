const Controller = require('../../src/app/controller');
const env = require('../../src/config/env');

class ExempleController extends Controller {

    getRoutes(){
        return [
            ['/', 'get', this.home],
        ]
    }

    home(res){
        env.search('APP_NAME', data => {
            return this.render(res, 'welcome.html', {
                name: data
            });
        })
    }
}

module.exports = ExempleController
