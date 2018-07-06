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
            let callback = null,
                flag = true;

            // 获取回调函数
            if (typeof args[args.length - 1] === 'function') {
                callback = args.pop();
            }

            // 执行函数
            handler(...args, (err, ...res) => {
                if (flag) {
                    flag = false;
                    callback && callback(err, ...res);
                    err ? reject(err) : resolve(res.length < 2 ? res[0] : res);
                }
            });
        });
    };
};
