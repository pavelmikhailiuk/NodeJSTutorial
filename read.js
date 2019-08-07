var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');

var ROOT = 'public';

http.createServer(function(req, res) {
    if(!checkAccess(req)) {
        res.statusCode = 403;
        res.end('tell me secret to access!');
    }
    sendfileSafe(url.parse(req.url).pathname, res);
} ).listen(3000);

function checkAccess(req) {
    return url.parse(req.url, true).query.secret === 'ooo';
}

function sendfileSafe(filePath, res) {
    try {
        filePath = decodeURIComponent(filePath);
    } catch (e) {
        res.statusCode = 400;
        res.end('bad request!');
        return;
    }

    if (~filePath.indexOf('\0')) {
        res.statusCode = 400;
        res.end('bad request!');
        return;
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) != 0) {
        res.statusCode = 404;
        res.end('not found!');
        return;
    }

    fs.stat(filePath, function (err, stats) {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('not found!');
            return;
        }
    });

    sendFile(filePath, res);
}

function sendFile(filePath, res) {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            throw err;
        } else {
            var mime = require('mime').lookup(filePath);
            res.setHeader('Content-Type', mime + '; charset=utf-8');
            res.end(data);
        }
    });
}