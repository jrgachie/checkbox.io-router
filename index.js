const express = require('express')
const app = express()
const port = 3080

const got = require('got');
const http = require('http');
const httpProxy = require('http-proxy');

const marqdown = require('./marqdown');

const MASTER = 'http://192.168.44.25:3000/preview';
const BROKEN = 'http://192.168.44.30:3000/preview';
let TARGET = MASTER;

let options = {};
let proxy = httpProxy.createProxyServer(options);
let server = http.createServer(function(req, res) {
    if (req.url.includes('switch')) {
        TARGET = TARGET === MASTER ? BROKEN : MASTER;
        console.log(`Switching server to ${TARGET}.`);
    }
    else
        proxy.web(req, res, {target: TARGET});
});

server.listen(port, () => console.log(`Proxy service listening on 192.168.44.35:${port}`);

















// app.configure(function () {
//     app.use(express.bodyParser());
// });
//
//
// app.post('/preview', function(req,res)
// {
//     console.log(req.body.markdown);
//     var text = marqdown.render( req.body.markdown );
//     res.send( {preview: text} );
// })
//
// app.listen(port, () => console.log(`Microservice listening on http://localhost:${port}/preview`))