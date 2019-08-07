var domain = require('domain');
var argv = require('optimist').argv;

var serverDomain = domain.create();

var server;

serverDomain.run(function() {
    var http = require('http');
    // process.domain.bind(fn) - to bind some fn to the current domain
    // if you cannot run it from that domain
    var handler = require('./server');
    server = http.createServer(function(req, res) {
        var reqDomain = domain.create();
        reqDomain.add(req);
        reqDomain.add(res);
        reqDomain.on('error', function(err) {
            res.statusCode = 500;
            res.end('Server error!');
            serverDomain.emit('error', err);
        });
        reqDomain.run(() => handler(req, res));
    });
    // process.argv - command line params
    // process.env - environment params, e.g. windows cmd set NODE_ENV=prod
    // process.env.NODE_ENV == 'prod'  
    server.listen(argv.port);
});

serverDomain.on('error', (err) => {
    console.error(err);
    if (server) {
        server.close();
    }

    setTimeout(function() {
        process.exit(1);
    }, 1000).unref();
});