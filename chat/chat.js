var clients = [];

exports.publish = function(message) {
    clients.forEach((res) => res.end(message));
    clients = [];
};

exports.subscribe = function(req, res) {
    clients.push(res);
    res.on('close', function() {
        clients.splice(clients.indexOf(res), 1);
    });
};