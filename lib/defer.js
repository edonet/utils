/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-06 15:24:36
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 生成延时对象
 *****************************************
 */
module.exports = function defer() {
    let deferred = {};

    // 生成【Promise】
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });

    // 返回对象
    return deferred;
};
