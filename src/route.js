class Route {

    constructor(path, method, callback, controller, middleware = undefined){
        this.path = path;
        this.method = method.toUpperCase();
        this.callback = callback.bind(controller);
        this.controller = controller;
        this.middleware = middleware;
    }

    getUrlArgs(url){
        let routePath = this.path.split('/');
        let urlPath = url.split('/');
        let args = [];

        for(var i = 0; i < routePath.length; i++){
            if(routePath[i].startsWith('{') && routePath[i].endsWith('}')) args.push(urlPath[i]);
        }

        return args;
    }

    isValidUrl(url){
        let routePath = this.path.split('/');
        let urlPath = url.split('/');
        let isValid = true;

        if(routePath.length != urlPath.length) return false;

        for(var i = 0; i < routePath.length; i++){
            if(routePath[i] != urlPath[i] && !routePath[i].startsWith('{') && !routePath[i].endsWith('}')) isValid = false;
        }

        return isValid;
    }

    execute(res, request){
        this.controller.res = res;
        return this.middleware ? this.middleware.handle(request, this.requestManager.bind(this)) : this.requestManager(request);
    }

    requestManager(request){
        if(this.method === 'POST' && 'post' in request){
            if('get' in request) {
                return this.callback(request.post, ...request.get);
            }
            return this.callback(request.post);   
        }else{
            if('get' in request) {
                return this.callback(...request.get);
            }
            return this.callback();
        }
    }
}

module.exports = Route