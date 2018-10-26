/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-15 14:51:03
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import EventEmitter, { createEvent } from '../lib/events';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【event】', () => {

    /* 监听事件 */
    test('监听事件', () => {
        let cb1 = jest.fn(),
            cb2 = jest.fn(),
            cb3 = jest.fn(),
            event = new EventEmitter();

        // 添加事件
        event.on('cb1', cb1);
        event.on('cb2', cb2);
        event.once('cb1', cb3);

        // 触发事件
        event.emit('cb1', 1);
        event.emit('cb2', 2);

        // 校验结果
        expect(cb1.mock.calls).toHaveLength(1);
        expect(cb2.mock.calls).toHaveLength(1);
        expect(cb3.mock.calls).toHaveLength(1);
        expect(cb1.mock.calls[0]).toEqual([1]);
        expect(cb2.mock.calls[0]).toEqual([2]);
        expect(cb3.mock.calls[0]).toEqual([1]);

        // 触发事件
        event.emit('cb1', 3);
        event.emit('cb2', 4);

        // 校验结果
        expect(cb1.mock.calls).toHaveLength(2);
        expect(cb2.mock.calls).toHaveLength(2);
        expect(cb3.mock.calls).toHaveLength(1);
        expect(cb1.mock.calls[1]).toEqual([3]);
        expect(cb2.mock.calls[1]).toEqual([4]);

        // 移除事件
        event.off('cb1', cb1);
        event.off('cb1', cb2);

        // 触发事件
        event.emit('cb1', 5);
        event.emit('cb2', 6);

        // 校验结果
        expect(cb1.mock.calls).toHaveLength(2);
        expect(cb2.mock.calls).toHaveLength(3);
        expect(cb3.mock.calls).toHaveLength(1);
        expect(cb2.mock.calls[2]).toEqual([6]);
    });

    /* 派发事件 */
    test('派发事件', () => {
        let cb1 = jest.fn(event => event.preventDefault()),
            cb2 = jest.fn(event => expect(event.defaultPrevented).toBe(true)),
            cb3 = event => event.preventDefault(),
            event = createEvent(),
            eventEmiter = new EventEmitter();

        // 添加事件
        eventEmiter.on('cb1', cb1);
        eventEmiter.on('cb1', cb2);

        // 执行事件
        cb3(event);

        // 检验结果
        expect(eventEmiter.dispatch('cb1')).toBe(false);
        expect(event.defaultPrevented).toBe(true);
    });
});
