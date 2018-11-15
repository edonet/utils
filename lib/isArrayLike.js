/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-15 09:09:32
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const isNil = require('./isNil');
const isNaturalNumber = require('./isNaturalNumber');


/**
 *****************************************
 * 类数组对象
 *****************************************
 */
module.exports = function isArrayLike(argv) {
    return !isNil(argv) && typeof argv !== 'function' && isNaturalNumber(argv.length);
};
