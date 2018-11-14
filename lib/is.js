/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-14 23:31:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义类型
 *****************************************
 */
const
    toString = Object.prototype.toString,
    map = {
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
 * 判定类型
 *****************************************
 */
function is(argv, ...args) {
    let type = toString.call(argv);

    // 查找匹配项
    for (let name of args) {
        if (type === name || type === map[name]) {
            return args.length > 1 ? name : true;
        }
    }

    // 输出错误信息
    if (process.env.NODE_ENV === 'development') {
        console.error(`Invalid type: expected a ${ args.join('/') } but got: ${ type } !`);
    }

    // 匹配失败
    return false;
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = is;
module.exports.isString = argv => is(argv, 'string');
module.exports.isNumber = argv => is(argv, 'number');
module.exports.isFunction = argv => is(argv, 'function');
module.exports.isBoolean = argv => is(argv, 'boolean');
module.exports.isArray = argv => is(argv, 'array');
module.exports.isObject = argv => is(argv, 'object');
module.exports.isRegExp = argv => is(argv, 'regexp');
