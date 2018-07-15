/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-15 16:28:25
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isFunction } from './validate';


/**
 *****************************************
 * 节流函数
 *****************************************
 */
export default function throttle(callback, wait = 100, options = {}) {
    let timeId = null,
        lastContext = null,
        lastArgs = [],
        lastCalled = 0,
        leading = options.leading !== false,
        trailing = options.trailing !== false,
        result;


    // 创建节流函数
    function throttled(...args) {
        let timestamp = + new Date(),
            remaining;


        // 获取剩余数据
        if (!lastCalled && !leading) {
            remaining = wait;
        } else {
            remaining = wait - (timestamp - lastCalled);
        }

        // 区分是否立即执行
        if (remaining <= 0 || remaining > wait) {
            timeId && clearTimeout(timeId);
            lastCalled = timestamp;
            result = callback.apply(this, args);
            lastContext = lastArgs = timeId = null;
        } else {

            // 更新参数
            lastContext = this;
            lastArgs = args;

            // 设置定时器
            if (!timeId && trailing) {
                timeId = setTimeout(() => {
                    lastCalled = leading ? + new Date() : 0;
                    result = callback.apply(lastContext, lastArgs);
                    lastContext = lastArgs = timeId = null;
                }, remaining);
            }
        }

        // 返回结果
        return result;
    }

    // 设置取消函数
    throttled.cancel = () => {
        timeId && clearTimeout(timeId);
        lastContext = lastArgs = timeId = null;
    };

    // 返回函数
    return isFunction(callback) && throttled;
}
