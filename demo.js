'use strict';

var utils = require('./index');

function ClassA(){
    this.name = 'a';
}

ClassA.prototype = {
    constructor: ClassA,
    handler: function(){
        console.log('this is A');
    }
}

function ClassB(){
    this.initSuper();
    this.name2 = 'b';
}

ClassB.prototype = utils.inherit(ClassA, {
    constructor: ClassB,
    handler2: function(){
        console.log('this is B');
    }
});

var b = new ClassB;

b.handler();
b.handler2();
console.log(b);


