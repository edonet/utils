/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-14 17:15:41
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 创建缓存对象
 *****************************************
 */
module.exports = function createCache(cached) {

    // 设置默认值
    if (!cached || typeof cached !== 'object') {
        cached = {};
    }

    // 返回缓存函数
    return function cache(name, callback) {

        // 返回缓存对象
        if (arguments.length < 1) {
            return cached;
        }

        // 创建缓存
        if (!(name in cached)) {
            cached[name] = typeof callback === 'function' ? callback() : callback;
        }

        // 返回缓存
        return cached[name];
    };
};
