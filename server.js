
const url = require('url');
const http = require('http');
const response = require('../Made/src/response')
const app = require('../Made/src/app')


http.createServer((req, res) => {
    let body = [];

    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        
        // main app
        app.execute(req, res, body);
        
        // dev
        res.on('error', (err) => {
            console.error(err);
        });
        console.log('test');
        
    });
}).listen(8080);
