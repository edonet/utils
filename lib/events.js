/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-15 14:10:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isString, isFunction } from './validate';


/**
 *****************************************
 * 创建事件
 *****************************************
 */
export default class EventEmitter {

    /* 初始化数据 */
    constructor() {
        this.$$events = {};
    }

    /* 添加监听事件 */
    on(name, listener) {

        // 添加事件
        if (isString(name) && isFunction(listener)) {
            if (!(name in this.$$events)) {
                this.$$events[name] = [{ listener }];
            } else {
                this.$$events[name].push({ listener });
            }
        }

        return this;
    }

    /* 添加单次事件 */
    once(name, listener) {

        // 添加事件
        if (isString(name) && isFunction(listener)) {
            if (!(name in this.$$events)) {
                this.$$events[name] = [{ listener, count: 1 }];
            } else {
                this.$$events[name].push({ listener, count: 1 });
            }
        }

        return this;
    }

    /* 移除监听事件 */
    off(name, listener) {

        // 移除事件
        switch (arguments.length) {
            case 0:
                this.$$events = {};
                break;
            case 1:
                if (isString(name)) {
                    this.$$events[name] = [];
                }
                break;
            default:
                if (isString(name) && isFunction(listener)) {
                    let events = this.$$events[name];

                    if (events && events.length) {
                        this.$$events[name] = (
                            events.filter(event => event.listener !== listener)
                        );
                    }
                }
                break;
        }

        return this;
    }

    /* 触发事件 */
    emit(name, ...args) {

        // 执行事件回调
        if (isString(name)) {
            let events = this.$$events[name];

            if (events && events.length) {
                this.$$events[name] = events.filter(event => {

                    // 执行回调
                    event.listener.apply(this, args);

                    // 过滤事件
                    return event.count !== 1;
                });
            }
        }

        return this;
    }

    /* 派发事件 */
    dispatch(type, payload) {
        let event = createEvent(payload);

        // 执行事件
        this.emit(type, event);

        // 返回事件结果
        return !event.defaultPrevented;
    }
}


/**
 *****************************************
 * 创建事件对象
 *****************************************
 */
export function createEvent(data = null) {
    let isDefaultPrevented = false;

    // 返回对象
    return Object.create(data, {
        defaultPrevented: {
            get() {
                return isDefaultPrevented;
            }
        },
        preventDefault: {
            value: () => {
                isDefaultPrevented = true;
            }
        }
    });
}
