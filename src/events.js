'use strict';

/*
 ************************************
 * 加载依赖模块
 ************************************
 */
const
    utils = require('./index');


/*
 ************************************
 * 定义事件类
 ************************************
 */
class EventEmitter {
    constructor() {
        this.events = {};
    }

    // 添加事件回调
    on(name, handler) {

        // 校验数据格式
        if (utils.isString(name) && utils.isFunction(handler)) {
            name in this.events ?
                this.events[name].push(handler) : (this.events[name] = [handler]);
        }

        return this;
    }

    // 移除事件回调
    off(...args) {

        switch (args.length) {

            // 移除所有事件
            case 0:
                this.events = {};
                break;

            // 移除指定类型事件
            case 1:
                utils.isString(args[0]) && (delete this.events[args[0]]);
                break;

            // 移除指定事件
            default:
                if (utils.isString(name) && utils.isFunction(handler) && name in this.events) {
                    this.events[name] = this.events[name].filter(v => v !== handler);
                }
                break;
        }

        return this;
    }

    // 触发指定事件
    emit(name, args, context = this) {

        // 必须指定事件类型
        if (!utils.isString(name) || !(name in this.events)) {
            return this;
        }

        // 格式化参数列表
        if (!utils.isArray(args)) {
            args = [args];
        }

        // 执行事件列表
        this.events[name].forEach(v => v.apply(context, args));
        return this;
    }
}



/*
 ************************************
 * 抛出事件接口
 ************************************
 */
module.exports = EventEmitter;
