/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-16 08:49:05
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import throttle from '../lib/throttle';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【throttle】', () => {

    /* 测试前处理 */
    beforeEach(() => {
        jest.useFakeTimers();
    });

    /* 函数节流 */
    test('函数节流', () => {
        let cb = jest.fn(),
            fn = throttle(cb);

        // 执行函数
        fn(1);
        fn(2);
        fn(3);
        fn(4);

        // 校验执行结果
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb).toHaveBeenLastCalledWith(1);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), expect.any(Number));

        // 执行所有延时
        jest.runAllTimers();

        // 校验执行结果
        expect(cb).toHaveBeenCalledTimes(2);
        expect(cb).toHaveBeenLastCalledWith(4);
    });

    /* 前置节流 */
    test('前置节流', () => {
        let cb = jest.fn(),
            fn = throttle(cb, 100, { trailing: false });

        // 执行函数
        fn(1);
        fn(2);
        fn(3);
        fn(4);

        // 校验执行结果
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenLastCalledWith(1);
        expect(setTimeout).toHaveBeenCalledTimes(0);
    });

    /* 后置节流 */
    test('后置节流', () => {
        let cb = jest.fn(),
            fn = throttle(cb, 100, { leading: false });

        // 执行函数
        fn(1);
        fn(2);
        fn(3);
        fn(4);

        // 校验执行结果
        expect(cb).not.toBeCalled();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);

        // 执行所有延时
        jest.runAllTimers();

        // 校验执行结果
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenLastCalledWith(4);
    });

    /* 时段节流 */
    test('时段节流', () => {
        let cb = jest.fn(),
            fn = jest.fn(throttle(cb, 10)),
            count = 0,
            invoke = () => {
                fn(count ++);
                count < 10 && setTimeout(invoke, 4);
            };

        // 执行函数
        invoke();

        // 校验执行结果
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenLastCalledWith(0);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenLastCalledWith(0);
        expect(setTimeout).toHaveBeenCalledTimes(1);

        // 向前推进6秒
        jest.advanceTimersByTime(6);

        // 校验执行结果
        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenLastCalledWith(1);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledTimes(3);
        expect(setTimeout).toHaveBeenLastCalledWith(invoke, 4);

        // 执行所有延时
        jest.advanceTimersByTime(60);
        jest.runAllTimers();

        // 校验执行结果
        expect(fn).toHaveBeenCalledTimes(10);
        expect(fn).toHaveBeenLastCalledWith(9);
        expect(cb).toHaveBeenLastCalledWith(9);
        expect(cb.mock.calls.length).toBeGreaterThanOrEqual(4);
        expect(setTimeout.mock.calls.length).toBeGreaterThanOrEqual(12);
    });
});
