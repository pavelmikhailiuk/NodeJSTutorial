var fs = require('fs');
var http = require('http');


http.createServer(function(req, res) {
    if (req.url == '/public/rat.png') {
        var file = fs.ReadStream('.' + req.url);
        sendfile(file, res);
    }
}).listen(3000);

function sendfile(file, res) {
    file.pipe(res);

    file.on('error', function(err) {
        //error handling
        if (err) {
            res.statusCode = 500;
            res.end('server error!');
            return;
        }
    });

    res.on('close', function() {
        // important action is to close file stream
        // if response is closed before the file is sent completely
        file.destroy();
    });
}