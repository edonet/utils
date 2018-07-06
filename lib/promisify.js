/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-06 15:43:36
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 【Promise】化
 *****************************************
 */
module.exports = function promisify(handler) {
    return function promised(...args) {
        return new Promise((resolve, reject) => {
            let cb = null;

            // 获取回调函数
            if (typeof args[args.length - 1] === 'function') {
                cb = args.pop();
            }

            // 执行函数
            handler(...args, (err, ...res) => {
                cb && cb(err, ...res);
                err ? reject(err) : resolve(res.length < 2 ? res[0] : res);
            });
        });
    };
};
