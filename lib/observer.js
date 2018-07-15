/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-15 15:10:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const { isFunction } = require('./validate');


/**
 *****************************************
 * 订阅事件
 *****************************************
 */
module.exports = function observer() {
    var listeners = [];

    // 返回接口
    return {
        subscribe: function subscribe(callback) {

            // 添加事件
            isFunction(callback) && listeners.push(callback);

            // 返回移除函数
            return function unsubscribe() {
                listeners = listeners.filter(function (listener) {
                    return listener !== callback;
                });
            };
        },
        notify: function notify() {
            var args = [].slice.call(arguments, 0),
                context = this;

            // 执行回调事件
            listeners.forEach(function (listener) {
                listener.apply(context, args);
            });
        }
    };
};
