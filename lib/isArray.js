/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-14 22:01:03
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义对象
 *****************************************
 */
const toString = Object.prototype.toString;


/**
 *****************************************
 * 判断是否为布尔值
 *****************************************
 */
module.exports = function isArray(argv) {
    let type = toString.call(argv);

    // 校验通过
    if (type === '[object Array]') {
        return true;
    }

    // 输出错误信息
    if (process.env.NODE_ENV === 'development') {
        console.error(`Invalid type: expected a array but got: ${ type } !`);
    }

    // 检验失败
    return false;
};
