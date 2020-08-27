const fs = require('fs');
const url = require('url');
const response = require('../src/response');
const { get } = require('http');

class App {

    static execute(req, res, body){
        const { headers, method, url } = req;

        let execute_route;
        let routes = [];

        const directoryPath = __dirname + '/../app/controllers';

        // get files
        fs.readdir(directoryPath, function(err, files) {
            if(err) throw err;
        
            // get routes
            files.forEach(function (file) {
                let controllerClass = require(`${directoryPath}/${file}`);
                let controller = new controllerClass();
                controller.getRoutes().forEach(route => {
                    routes.push(route);
                })
            });
            
            // get route
            routes.forEach(route => {
                if(route.isValidUrl(url) && route.method == method){
                    execute_route = route;
                }
            })

            if(execute_route === undefined){
                console.log('Undefined route');
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

            // get response
            let json = execute_route.execute(args);
            
            response.success(res, json);
        });
    }
}

module.exports = App