class Response {

    static error(res, err){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: err}));
    }

    static success(res, json){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json));
    }
}

module.exports = Response