const express = require('express')
const app = express()
const port = 3080

const got = require('got');
const http = require('http');
const httpProxy = require('http-proxy');

const marqdown = require('./marqdown');

const MASTER = 'http://192.168.44.25:3000';
const BROKEN = 'http://192.168.44.30:3000';
let TARGET = MASTER;

let options = {};
let proxy = httpProxy.createProxyServer(options);
let server = http.createServer(function(req, res) {
    if (req.url.includes('switch')) {
        TARGET = TARGET === MASTER ? BROKEN : MASTER;
        console.log(`Switching server to ${TARGET}.`);

        res.end(`Server switched to ${TARGET}`);

        //res.send({preview: `Server switched to ${TARGET}`});
    }
    else
        proxy.web(req, res, {target: TARGET});
});

server.listen(port, () => console.log(`Proxy service listening on 192.168.44.35:${port}`));
