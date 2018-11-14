/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-14 23:14:12
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 判断是否为数字
 *****************************************
 */
module.exports = function isFunction(argv) {
    let type = typeof argv;

    // 校验通过
    if (type === 'number' && !isNaN(argv)) {
        return true;
    }

    // 输出错误信息
    if (process.env.NODE_ENV === 'development') {
        console.error(`Invalid type: expected a number but got: ${ type === 'number' ? 'NaN' : type } !`);
    }

    // 检验失败
    return false;
};
