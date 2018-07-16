/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-16 11:55:08
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 函数去抖动
 *****************************************
 */
export default function debounce(callback, wait = 100, options = {}) {
    let timeId = null,
        lastContext = null,
        lastArgs = [],
        lastCalled = 0,
        leading = options.leading,
        trailing = options.trailing !== false,
        result;


    // 定义函数
    function debounced(...args) {
        let now = + new Date(),
            remaining;


        // 获取剩余时间
        if (!lastCalled && !leading) {
            remaining = wait;
        } else {
            remaining = wait - (now - lastCalled);
        }

        // 区分是否立即执行
        if (remaining <= 0 || remaining > wait) {
            timeId && clearTimeout(timeId);
            lastCalled = now;
            result = callback.apply(this, args);
            lastContext = lastArgs = timeId = null;
        } else if (trailing) {

            // 更新参数
            lastContext = this;
            lastArgs = args;

            // 设置延时
            timeId && clearTimeout(timeId);
            timeId = setTimeout(() => {
                lastCalled = 0;
                result = callback.apply(lastContext, lastArgs);
                lastContext = lastArgs = timeId = null;
            }, wait);
        }

        // 返回结果
        return result;
    }

    // 设置取消函数
    debounced.cancel = () => {
        timeId && clearTimeout(timeId);
        lastCalled = 0;
        lastContext = lastArgs = timeId = null;
    };

    // 返回函数
    return debounced;
}
