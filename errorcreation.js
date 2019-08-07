var util = require('util');

function HTTPError(code, message) {
    this.code = code;
    this.message = message;
    Error.captureStackTrace(this, HTTPError);
}

HTTPError.prototype.name = 'HTTPError';

util.inherits(HTTPError, Error);

var a = 1;

try {
    if (a==1) {
        throw new HTTPError(500, 'a=1 ha ha');
    } else {
        throw new Error('just an error');
    }
} catch (e) {
    if (e instanceof HTTPError) {
        console.log(e.code + e.message + e.name + e.stack);
    } else {
        console.log(e.name +  e.message + e.stack);
    }
}