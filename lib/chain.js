/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-14 21:43:22
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
 * 创建调用链
 *****************************************
 */
export default function chain(...args) {

    // 过滤非函数参数
    args = args.filter(fn => isFunction(fn));

    // 返回链条函数
    return args.reduceRight((next, fn) => argv => fn(argv, next), x => x);
}
