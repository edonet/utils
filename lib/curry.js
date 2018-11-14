/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-04-09 22:26:49
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const isFunction = require('./isFunction');


/**
 *****************************************
 * 定义柯里化参数占位符
 *****************************************
 */
const _ = Symbol('CURRY_PLACEHOLDER');


/**
 *****************************************
 * 柯里化
 *****************************************
 */
function curry(handler, arity) {
    return isFunction(handler) ? makeCurry(handler, { arity }) : () => handler;
}


/**
 *****************************************
 * 创建柯里化函数
 *****************************************
 */
function makeCurry(func, { arity = func.length, args = [] } = {}) {
    return function curried(...rest) {

        // 校验参数
        if (rest.length) {
            let count = 0,
                arr = [],
                cb = arg => {
                    arg === _ && count++;
                    arr.push(arg);
                };

            // 补全点位
            args.forEach(arg => {
                cb(arg === _ && rest.length ? rest.shift() : arg);
            });

            // 遍历能数
            rest.length && rest.forEach(cb);

            // 执行回调
            return (
                count < 1 && arr.length >= arity ?
                    func.apply(this, arr) :
                    makeCurry(func, { arity, args: arr })
            );
        }

        // 返回原函数
        return curried;
    };
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = curry;
module.exports._ = _;
