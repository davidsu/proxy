//to make this work on windows:
//type ipconfig
//get the number between ipv4 and default gateway:
//  ipv4: 10.255.55.1
//  defaultGateway: 10.255.55.3
//
//in this case run `node index.js -l 10.255.55.2
var opts = {
    default:{
        localserveraddress: '192.168.36.236',
        port: '80'
    },
    alias:{
        help: 'h',
        localserveraddress: 'l',
        port: 'p'
    }
};
var flags = require('meow')(
    `Usage
    Options
        --local_server_address, -l      default to 192.168.36.236
                                        see ifconfig on your mac
        --port, -p                      defaults to 80`,
    opts).flags;
console.log(flags);
//return;
LOCAL_SERVER_ADDRESS = `http://${flags.localserveraddress}:${flags.port}`;

var http = require('http'), httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({ target: LOCAL_SERVER_ADDRESS }),
    server = http.createServer(function(req, res) {
        proxy.web(req, res);
    }).listen(flags.port);

proxy.on('error', console.error.bind(console));
console.log(`forwarding localhost:${flags.port} requests to ${flags.localserveraddress}`);

