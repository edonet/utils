'use strict';

var slice = [].slice;

/*
 ***************
 * 基础扩展
 ***************
 */

// 对象类型判断
function type(object){
    return object !== null && !(isNaN(object) && typeof object === 'number') ?
        Object.prototype.toString.call(object).slice(8,-1) : object + '';
}
exports.type = type;

// 判断是否为字符类型
function isString(object){
    return typeof object === 'string';
}
exports.isString = isString;

// 判断是否为数字类型
function isNumber(object){
    return typeof object === 'number' && isFinite(object);
}
exports.isNumber = isNumber;

// 判断是否为布尔值
function isBoolean(object){
    return typeof object === 'boolean';
}
exports.isBoolean = isBoolean;

// 判断是否为函数类型
function isFunction(object){
    return typeof object === 'function';
}
exports.isFunction = isFunction;

// 判断是否为数组类型
function isArray(object){
    return Array.isArray ? Array.isArray(object) : type(object) === 'Array';
}
exports.isArray = isArray;

// 判断是否为对象类型
function isObject(object){
    return object && !isArray(object) && typeof object === 'object';
}
exports.isObject = isObject;

// 判断是否为正则类型
function isRegExp(object){
    return type(object) === 'RegExp';
}
exports.isRegExp = isRegExp;

// 判断是否为类数组类型
function isArrayLike(object){
    var t = type(object),
        len, i;

    if(t === 'Array' || t === 'String')
        return true;

    if(!object || typeof object.length !== 'number' || isNaN(object.length))
        return false;

    len = object.length - 1,
    i = ~~ (Math.random() * len)
    return object[0] !== undefined && object[i] !== undefined;
}
exports.isArrayLike = isArrayLike;

// 判断是否在数组中
function inArray(ele, array, i){
    return !!~ indexOf(array, ele, i);
}
exports.inArray = inArray;

// 支除字符串前后空白
function trim(string){
    if(!isString(string))
        return '';

    return string.replace(/^\s+/, '').replace(/\s+$/, '');
}
exports.trim = trim;

// 遍历数组或对象
function each(object, handler){
    if(typeof(handler) !== 'function')
        return -1;

    if(isArrayLike(object)){
        var len = object.length,
            i = 0;

        for(; i < len; i ++){
            if(handler.call(object, i, object[i], object) === false)
                return i;
        }
        return len - 1;
    }else if(isObject(object)){
        var i;
        for(i in object){
            if(object.hasOwnProperty && !object.hasOwnProperty(i))
                continue;

            if(handler.call(object, i, object[i], object) === false){
                return i;
            }
        }
        return i;
    }
    return -1;
}
exports.each = each;

// 遍历数组
function map(array, handler){
    if(!isArrayLike(array) || !isFunction(handler)) return [];
    var len = array.length,
        res = [],
        i = 0;

    for(; i < len; i ++){
        res.push(handler.call(array, i, array[i], array));
    }
    return res;
}
exports.map = map;

// 过滤数组
function filter(array, handler){
    if(!isArrayLike(array) || !isFunction(handler)) return [];
    var len = array.length,
        res = [],
        i = 0;

    for(; i < len; i ++){
        handler.call(array, i, array[i], array) && res.push(array[i]);
    }
    return res;
}
exports.filter = filter;

// 正向查询数组
function indexOf(array, ele, i){
    if(!isArrayLike(array)) return -1;
    var len = array.length;

    i = isNumber(i) ? i : 0;
    for(; i < len; i ++){
        if(ele === array[i]) return i;
    }
    return -1;
}
exports.indexOf = indexOf;

// 逆向查询数组
function lastIndexOf(array, ele, i){
    if(!isArrayLike(array)) return -1;
    var len = array.length;

    i = isNumber(i) && i < len ? i : len;
    while(i -- > 0){
        if(ele === array[i]) return i;
    }
    return -1;
}
exports.lastIndexOf = lastIndexOf;

/*
 ***************
 * 属性设置
 ***************
 */

// 设置对象属性
function setProperty(object, property, description, value){
    try {
        Object.defineProperty(object, property, description);
    } catch(e) {
        object[property] = value;
    }

    return object;
}

// 设置对象只读属性
exports.setReadonlyProperty = function(object, property, value){
    if(object.hasOwnProperty(property))
        delete object[property];

    return setProperty(object, property, {
        configurable: true,
        get: function(){
            return value;
        }
    }, value);
};

// 设置对象私有属性
exports.setPrivateProperty = function(object, property, value){
    if(object.hasOwnProperty(property))
        return false;

    return setProperty(object, property, {
        enumerable: false,
        get: function(){
            return value;
        }
    }, value);
};

// 创建对象
exports.create = Object.create || (function() {
    var hasOwn = Object.prototype.hasOwnProperty;

    function noop() {}

    return function (O) {
        if (typeof O !== 'object') {
            throw TypeError('Object prototype may only be an Object or null');
        }

        noop.prototype = O;
        var obj = new noop();
        noop.prototype = null;

        if (arguments.length > 1) {
            var Properties = Object(arguments[1]);

            for (var prop in Properties) {
                if (hasOwn.call(Properties, prop)) {
                    obj[prop] = Properties[prop];
                }
            }
        }
        return obj;
    };
})();

// 定义类函数
function inherit(){
    var result = {},
        inheritClassList = filter(arguments, function(i, v){
            if(isFunction(v))
                return inheritCopy(result, v.prototype);

            if(isObject(v))
                inheritCopy(result, v);

            return false;
        });

    result.initSuper = function(){
        var self = this,
            argus = arguments;

        each(inheritClassList, function(i, fn){
            fn.apply(self, argus);
        });
    };

    return result;
}

function inheritCopy(target, origin){
    var noop = function(){};

    each(origin, function(k, v){
        if(isObject(v)){
            noop.prototype = v;
            target[k] = new noop();
            noop.prototype = null;
        }else if(isArray(v)){
            target[k] = v.slice(0);
        }else {
            target[k] = v;
        }
    });
    return target;
}

exports.inherit = inherit;

// 扩展对象
function extend(){
    var argus = slice.call(arguments, 0),
        target = argus.shift(),
        deep = false;

    if(isBoolean(target)){
        deep = target;
        target = argus.shift();
    }

    if(typeof target !== 'object' && !isFunction(target)){
        target = {};
    }

    each(argus, function(i, src){
        if(typeof src === 'function') src = src.prototype;
        if(typeof src !== 'object') return true;

        each(src, function(name, val){
            if(!deep || type(val) !== 'Object'){
                target[name] = val;
                return true;
            }

            if(isArray(val) && !isArray(target[name])){
                target[name] = [];
            }else if(!isObject(target[name])){
                target[name] = {};
            }

            target[name] = extend(deep, target[name], val);
        });
    });

    return target;
};
exports.extend = extend;

