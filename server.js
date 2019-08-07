
var http = require('http');

var server = new http.Server();

server.listen(1337, '127.0.0.1');

var emit = server.emit;
server.emit = function (event) {
    console.log(event);
    emit.apply(this, arguments);
};

var counter = 0;
server.on('request', function(req, res) {
    res.end('hello world! '+ ++counter);
});

// var User = require('user');

// function run() {
//     var vasya = new User("Vasya");
//     var petya = new User("Petya");
//     vasya.hello(petya);
// }

// if (module.parent) {
//     exports.run = run;
// } else {
//     run();
// }
