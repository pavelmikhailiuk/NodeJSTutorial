
var fs = require('fs');
var chat = require('./chat');

var handler = function(req, res) {
    if (req.url == '/') {
        sendfile("./chat/index.html", res);
    } else if (req.url == '/publish') {
        var body = '';
        req.on('readable', function() {
            var data = req.read();
            if (data) {
                body += data;
                if (body.length > 1e4) {
                    res.statusCode = 413;
                    res.end('Message is too long!');
                    return;
                }
            }
        }).on('end', function() {
            try {
                body = JSON.parse(body);
            } catch (e) {
                res.statusCode = 400;
                res.end('Bad request!');
                return;
            }
            chat.publish(body.message);
            res.end('ok');
        });
    } else if (req.url == '/subscribe') {
        chat.subscribe(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not found!');
    }
};

function sendfile(fileName, res) {
    var fileStream = fs.createReadStream(fileName);
    fileStream.on('error', function(err) {
        if (err) {
            res.statusCode = 500;
            res.end('Server error!');
            return;
        }
    }).on('close', function() {
        fileStream.destroy();
    }).pipe(res);
}

module.exports = handler;