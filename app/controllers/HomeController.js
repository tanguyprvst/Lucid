const Controller = require('../../src/app/controller');

class ExempleController extends Controller {

    getRoutes(){
        return [
            ['/', 'get', this.home]
        ]
    }

    home(res){
        return this.render(res, 'welcome.html');
    }
}

module.exports = ExempleController
