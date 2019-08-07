var db = require('db');
var log = require('logger')(module);
db.connect();

function User(name){
	this.name = name;
}

User.prototype.hello = function(who) {
    log(db.getMessage("hello") + ", " + who.name);
};

module.exports = User;

//exports.User = User;

//global.User = User;

//console.log(module);