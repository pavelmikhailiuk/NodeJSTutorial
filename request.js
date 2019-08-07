var url = require('url');
var winston = require('winston');

var transports = [
    new winston.transports.Console({
    timestamp: true,
    colorize: true,
    level: 'debug'
    }),
    new winston.transports.File({
        filename: 'request.log',
        level: 'debug'
})];

var log = new winston.createLogger({transports: transports});

module.exports = function(req, res) {
    log.info(req.method, req.url);
    var urlParsed = url.parse(req.url, true);
    log.debug(urlParsed);
    if (urlParsed.pathname == '/echo' && urlParsed.query && urlParsed.query.message == 'Hello') {
        res.setHeader('Cache-control', 'no-cache');
        res.end(urlParsed.query.message);
    } else {
        log.error('was not found');
        res.statusCode = 404;
        res.end('Page not found');
    }
};