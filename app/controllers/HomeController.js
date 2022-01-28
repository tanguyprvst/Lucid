const Controller = require('../../src/app/controller');
const env = require('../../env');

class HomeController extends Controller {

    getRoutes(){
        return [
            ['/', 'get', this.home]
        ]
    }

    home(res){
        const name = env.get()['APP_NAME'];
        return this.render(res, 'welcome.html', {
            name: name
        });
    }
}

module.exports = HomeController
