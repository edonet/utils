/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-04-09 11:28:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import isFunction from './isFunction';


/**
 *****************************************
 * 组合函数
 *****************************************
 */
export default function compose(...funcs) {
    let arr = [],
        len = funcs.length,
        idx = len;


    // 获取函数参数
    while (idx --) {
        isFunction(funcs[idx]) && arr.unshift(funcs[idx]);
    }

    // 返回合成函数
    return function (...args) {
        let idx = arr.length,
            res = idx -- ? arr[idx].apply(this, args) : args[0];

        // 遍历函数
        while (idx --) {
            res = arr[idx].call(this, res);
        }

        // 返回结果
        return res;
    };
}
