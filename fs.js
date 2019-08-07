var fs = require('fs');

var stream = fs.ReadStream('echoserver.log', {encoding: 'utf-8'});

stream.on('readable', function() {
    var data = stream.read();
    if (data) {
        console.log(data);
    }
});

stream.on('end', function() {
    console.log('the end');
});