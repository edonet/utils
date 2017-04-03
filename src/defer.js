'use strict';


/**
 *****************************
 * 加载依赖模块
 *****************************
 */
const
    utils = require('./utils');

/**
 *********************************
 * 定义【Promise】化函数
 *********************************
 */
function defer(handler) {

    // 生成回调函数
    return function (...args) {

        // 获取处理函数的类型
        let oType = utils.type(handler);


        // 如果参数为简单函数，生成【Promise】对象
        if (oType === 'Function') {
            return new Promise((resolve, reject) => {

                // 异步处理函数
                if (handler.length > args.length ) {
                    return handler.bind(this)(
                        ...args,
                        (err, data) => err ? reject(err) : resolve(data)
                    );
                }

                // 同步处理函数
                return resolve(handler.bind(this)(...args));
            });
        }


        // 如果参数为【AsyncFunction】，直接运行
        if (oType === 'AsyncFunction') {
            return handler.bind(this)(...args);
        }


        // 生成【Promise】对象并返回
        return oType === 'Promise' ? handler : Promise.resolve(handler);
    };
}


/**
 *********************************
 * 抛出接口方法
 *********************************
 */
module.exports = defer;
