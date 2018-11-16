/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-14 22:01:03
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 判断是否为字符串
 *****************************************
 */
export default function isString(argv) {
    let type = typeof argv;

    // 校验通过
    if (type === 'string') {
        return true;
    }

    // 输出错误信息
    if (process.env.NODE_ENV === 'development') {
        console.error(`Invalid type: expected a string but got: ${ type } !`);
    }

    // 检验失败
    return false;
}
