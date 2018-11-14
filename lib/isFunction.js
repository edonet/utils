/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-14 22:01:03
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 判断是否为函数
 *****************************************
 */
module.exports = function isFunction(argv) {
    let type = typeof argv;

    // 校验通过
    if (type === 'function') {
        return true;
    }

    // 输出错误信息
    if (process.env.NODE_ENV === 'development') {
        console.error(`Invalid type: expected a function but got: ${ type } !`);
    }

    // 检验失败
    return false;
};
