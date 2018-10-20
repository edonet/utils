/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-10-20 16:13:04
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 创建任务对象
 *****************************************
 */
export default function task() {
    let queue = [],
        model = {
            get length() {
                return queue.length;
            }
        };

    // 解析任务
    model.resolve = (...args) => {
        queue = queue.forEach(cb => cb.call(model, ...args)) || [];
        return model;
    };

    // 添加回调
    model.add = model.push = model.next = model.then = callback => {
        typeof callback === 'function' && queue.push(callback);
        return model;
    };

    // 移除回调
    model.remove = callback => {
        queue = queue.filter(cb => cb !== callback);
        return model;
    };

    // 返回
    return model;
}
