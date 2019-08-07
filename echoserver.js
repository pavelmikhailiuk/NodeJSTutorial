var http = require('http');
var winston = require('winston');

var transports = [
    new winston.transports.Console({
    timestamp: true,
    colorize: true,
    level: 'debug'
    }),
    new winston.transports.File({
        filename: 'echoserver.log',
        level: 'debug'
})];

var log = new winston.createLogger({transports: transports});

http.createServer(require('./request')).listen(1337);
log.debug('server is created');