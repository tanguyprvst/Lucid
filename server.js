
const url = require('url');
const http = require('http');
const response = require('./src/app/response')
const app = require('./src/app')

http.createServer((req, res) => {
    let body = [];

    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        
        // main app
        app.execute(req, res, body);
        
        res.on('error', (err) => {
            console.error(err);
        });
    });
}).listen(8080);

console.log('server listen on port 8080 at 127.0.0.1:8080');
