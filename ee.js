var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter();

server.on('request', function(request) {
    if (request.from == 'client') {
        request.approved = true;
    } else {
        request.approved = false;
    }
});

server.on('request', function(request) {
    console.log(request);
});


server.emit('request', {from: 'client'});

server.emit('request', {from: 'villain'});