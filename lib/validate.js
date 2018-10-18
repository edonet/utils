/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-04-09 11:32:15
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义属性
 *****************************************
 */
const
    toString = Object.prototype.toString,
    typeName = {
        'string': '[object String]',
        'number': '[object Number]',
        'function': '[object Function]',
        'array': '[object Array]',
        'object': '[object Object]',
        'regexp': '[object RegExp]',
        'boolean': '[object Boolean]',
        'undefined': '[object Undefined]',
        'null': '[object Null]'
    };


/**
 *****************************************
 * 启用【ES6 module】
 *****************************************
 */
Object.defineProperty(exports, '__esModule', { value: true });


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
exports.default = validate;
exports.validate = validate;
exports.validater = validater;
exports.invaliedType = invaliedType;


/**
 *****************************************
 * 常用类型校验
 *****************************************
 */
exports.isString = validater('string');
exports.isNumber = validater('number');
exports.isFunction = validater('function');
exports.isBoolean = validater('boolean');
exports.isArray = function isArray(object) { return validate(object, 'array'); };
exports.isObject = function isObject(object) { return validate(object, 'object'); };
exports.isRegExp = function isRegExp(object) { return validate(object, 'regexp'); };


/**
 *****************************************
 * 校验数据类型
 *****************************************
 */
function validate(object) {
    var typeList = [].slice.call(arguments, 1),
        type = toString.call(object),
        len = typeList.length,
        key = '',
        i = 0;


    // 查找匹配项
    for (; i < len; i ++) {
        key = typeList[i];

        if (type === typeName[key]) {
            return typeList.length < 2 ? true : key;
        }
    }

    // 返回结果
    return invaliedType.apply(null, [type].concat(typeList));
}


/**
 *****************************************
 * 类型校验器
 *****************************************
 */
function validater(valiedType) {
    return function validated(object, silent) {
        var type = typeof object;

        // 校验类型
        if (type === valiedType) {
            return true;
        }

        // 显示错误提示
        silent || invaliedType(typeName[type], valiedType);

        // 返回结果
        return false;
    };
}


/**
 *****************************************
 * 输出无效类型信息
 *****************************************
 */
function invaliedType() {
    var args = [].slice.call(arguments, 0),
        invalied = args.shift();

    // 输出错误信息
    if (process.env.NODE_ENV === 'development') {
        console.error(`Invalid type: expected a "${ args.join('/') }" but got: ${ invalied || '[object Unknown]' } !`);
    }

    // 返回校验结果
    return false;
}

