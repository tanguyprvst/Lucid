class Response {

    static error(res, err){
        /*res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: err}));*/
    }

    static json(res, json){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json));
    }

    static custom(res, data, type){
        res.writeHead(200, {'Content-Type': type});
        res.write(data);
        res.end();
    }

    static render(res, html){
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
    }
}

module.exports = Response