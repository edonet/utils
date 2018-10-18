/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-12 19:57:49
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import delay from '../lib/delay';


/**
 *****************************************
 * 使用模拟时间函数
 *****************************************
 */
jest.useFakeTimers();


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【delay】', () => {
    test('延时执行', () => {
        let cb = jest.fn();

        // 延时【0ms】
        delay();

        // 校验结果
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);

        // 延时【20ms】
        delay(20);

        // 校验结果
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 20);

        // 延时函数
        delay(cb);

        // 执行所有延时
        jest.runAllTimers();

        // 校验结果
        expect(cb.mock.calls).toHaveLength(1);
        expect(setTimeout).toHaveBeenCalledTimes(3);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);

        // 延时函数
        delay(cb, 20);

        // 执行所有延时
        jest.runAllTimers();

        // 校验结果
        expect(cb.mock.calls).toHaveLength(2);
        expect(setTimeout).toHaveBeenCalledTimes(4);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 20);

        // 延时函数
        delay(20, cb);

        // 执行所有延时
        jest.runAllTimers();

        // 校验结果
        expect(cb.mock.calls).toHaveLength(3);
        expect(setTimeout).toHaveBeenCalledTimes(5);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 20);

        // 延时函数
        delay(20, () => delay(cb, 10));

        // 执行所有延时
        jest.runAllTimers();

        // 校验结果
        expect(cb.mock.calls).toHaveLength(4);
        expect(setTimeout).toHaveBeenCalledTimes(7);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10);
    });
});
