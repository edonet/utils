/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-12 19:48:25
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 延时执行
 *****************************************
 */
export default function delay(duration, callback) {

    // 重载函数
    if (arguments.length === 1) {
        return typeof duration === 'function' ? delay(0, duration) : delay(duration, null);
    }

    // 调整参数
    if (typeof callback === 'number') {
        duration = [callback, callback = duration][0];
    }

    // 设置延时
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {

                // 执行回调
                if (typeof callback === 'function') {
                    let result = callback();

                    // 处理异步返回
                    if (result && result instanceof Promise) {
                        return result.then(resolve, reject);
                    }
                }

                // 返回
                resolve();
            } catch (err) {
                reject(err);
            }
        }, duration || 0);
    });
}
