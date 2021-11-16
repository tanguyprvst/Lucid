const fs = require('fs');
const response = require('./app/response');
const Route = require('./app/route');

class App {

    static execute(req, res, body){
        const { method, url } = req;

        let execute_route;
        let routes = [];

        const directoryPath = __dirname + '/../app/controllers';
        const publicPath = __dirname + '/../public';

        let mime = new Map([
            ['html', 'text/html'],
            ['txt', 'text/plain'],
            ['css', 'text/css'],
            ['gif', 'image/gif'],
            ['jpg', 'image/jpeg'],
            ['png', 'image/png'],
            ['svg', 'image/svg+xml'],
            ['js', 'application/javascript']
        ]);

        let ressource = undefined;
        mime.forEach((value, key) => {
            if(url.endsWith(key)){
                ressource = value;
            }
        });

        if(ressource){
            fs.readFile(publicPath + url, function (err, data) {
                if (err) return response.notfound(res);
                response.custom(res, data, ressource);        
            });
        }else{
            // get files
            fs.readdir(directoryPath, function(err, files) {
                if(err) throw err;
                // get routes
                files.forEach(function (file) {
                    if(!fs.lstatSync(`${directoryPath}/${file}`).isFile()) return;
                    let controllerClass = require(`${directoryPath}/${file}`);
                    let controller = new controllerClass();
                    controller.getRoutes().forEach(arrayroute => {
                        let path = arrayroute[0];
                        let method = arrayroute[1];
                        let func = arrayroute[2];
                        let middleware = undefined;
                        if(arrayroute.length == 4) middleware = arrayroute[3];
                        routes.push(new Route(path, method, func, controller, middleware));
                    })
                });
                
                // get route
                routes.forEach(route => {
                    if(route.isValidUrl(url) && route.method == method){
                        execute_route = route;
                    }
                })

                if(execute_route === undefined){
                    console.log('Undefined route: ' + url);
                    response.error(res, 'Undefined route');
                    return;
                }

                // get args
                let args = [];
                args['post'] = {};
                if(execute_route.method == 'POST'){
                    args['post'] = JSON.parse(Buffer.concat(body).toString());
                }

                args['get']  = execute_route.getUrlArgs(url);
                args['req'] = req;

                execute_route.execute(res, args);
            });
        }
    }
}

module.exports = App