class Route {

    constructor(path, method, callback){
        this.path = path;
        this.method = method.toUpperCase();
        this.callback = callback;
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
}

module.exports = Route