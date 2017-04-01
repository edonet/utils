'use strict';

const
    toStr = Object.prototype.toString,
    type = argv => toStr.call(argv).slice(8, -1);

/**
 *********************************
 * 抛出工具方法
 *********************************
 */
module.exports = {
    type,
    isType: (argv, argvType) => argvType === type(argv),
    isString: argv => typeof argv === 'string',
    isNumber: argv => typeof argv === 'number' && !isNaN(argv),
    isFunction: argv => typeof argv === 'function',
    isArray: argv => Array.isArray(argv),
    isObject: argv => argv && typeof argv === 'object' && !Array.isArray(argv),
    isIterator: argv => argv && typeof argv === 'object' && Symbol.iterator in argv,
    isAsyncFunction: argv => Object.prototype.toString.call(argv) === '[object AsyncFunction]'
};
