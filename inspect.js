var util = require('util');

var obj = {
    a: 5,
    b: 6,
    inspect: function() {
        return 123;
    }
};

obj.self = obj;

console.log(obj);

var f = util.format('%s, %d, %j', 'string', 555, {test: 'ok'});
console.log(f);

function Animal(name) {
    this.name = name;
}

Animal.prototype.walk = function() {
    console.log(this.name + 'walking');
};

function Rabbit(name) {
    this.name = name;
    this.jump = function() {
        console.log(this.name + 'jumping');
    };
}

util.inherits(Rabbit, Animal);

var rabbit = new Rabbit('smart rabbit');

rabbit.walk();
rabbit.jump();