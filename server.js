
const url = require('url');
const http = require('http');
const response = require('./src/app/response')
const app = require('./src/app')
const env = require('./env').get()

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
}).listen(env['APP_SERVER_PORT']);

console.log(`server listen on port ${env['APP_SERVER_PORT']} at 127.0.0.1:${env['APP_SERVER_PORT']}`);
