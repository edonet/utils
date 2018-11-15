/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-15 10:11:26
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import each from '../lib/each';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【each】', () => {
    test('遍历对象', () => {
        let cb1 = jest.fn(),
            cb2 = jest.fn(),
            cb3 = jest.fn(),
            cb4 = jest.fn(),
            cb5 = jest.fn((i, v) => v < 2),
            cb6 = jest.fn((i, v) => v < 2),
            cb7 = jest.fn((i, v) => v < 2),
            cb8 = jest.fn((i, v) => v < 2);

        // 遍历数组
        expect(each([1, 2, 3], cb1)).toBe(true);
        expect(cb1.mock.calls[0][0]).toBe(0);
        expect(cb1.mock.calls[0][1]).toBe(1);
        expect(cb1.mock.calls[1][0]).toBe(1);
        expect(cb1.mock.calls[1][1]).toBe(2);
        expect(cb1.mock.calls[2][0]).toBe(2);
        expect(cb1.mock.calls[2][1]).toBe(3);
        expect(cb1.mock.calls).toHaveLength(3);

        // 遍历集合
        expect(each(new Set([1, 2, 3]), cb2)).toBe(true);
        expect(cb2.mock.calls[0][0]).toBe(0);
        expect(cb2.mock.calls[0][1]).toBe(1);
        expect(cb2.mock.calls[1][0]).toBe(1);
        expect(cb2.mock.calls[1][1]).toBe(2);
        expect(cb2.mock.calls[2][0]).toBe(2);
        expect(cb2.mock.calls[2][1]).toBe(3);
        expect(cb2.mock.calls).toHaveLength(3);

        // 遍历映射
        expect(each(new Map([['a', 1], ['b', 2], ['c', 3]]), cb3)).toBe(true);
        expect(cb3.mock.calls[0][0]).toBe('a');
        expect(cb3.mock.calls[0][1]).toBe(1);
        expect(cb3.mock.calls[1][0]).toBe('b');
        expect(cb3.mock.calls[1][1]).toBe(2);
        expect(cb3.mock.calls[2][0]).toBe('c');
        expect(cb3.mock.calls[2][1]).toBe(3);
        expect(cb3.mock.calls).toHaveLength(3);

        // 遍历对象
        expect(each({ a: 1, b: 2, c: 3 }, cb4)).toBe(true);
        expect(cb4.mock.calls[0][0]).toBe('a');
        expect(cb4.mock.calls[0][1]).toBe(1);
        expect(cb4.mock.calls[1][0]).toBe('b');
        expect(cb4.mock.calls[1][1]).toBe(2);
        expect(cb4.mock.calls[2][0]).toBe('c');
        expect(cb4.mock.calls[2][1]).toBe(3);
        expect(cb4.mock.calls).toHaveLength(3);

        // 中断遍历数组
        expect(each([1, 2, 3], cb5)).toBe(false);
        expect(cb5.mock.calls[0][0]).toBe(0);
        expect(cb5.mock.calls[0][1]).toBe(1);
        expect(cb5.mock.calls[1][0]).toBe(1);
        expect(cb5.mock.calls[1][1]).toBe(2);
        expect(cb5.mock.calls).toHaveLength(2);

        // 中断遍历集合
        expect(each(new Set([1, 2, 3]), cb6)).toBe(false);
        expect(cb6.mock.calls[0][0]).toBe(0);
        expect(cb6.mock.calls[0][1]).toBe(1);
        expect(cb6.mock.calls[1][0]).toBe(1);
        expect(cb6.mock.calls[1][1]).toBe(2);
        expect(cb6.mock.calls).toHaveLength(2);

        // 中断遍历映射
        expect(each(new Map([['a', 1], ['b', 2], ['c', 3]]), cb7)).toBe(false);
        expect(cb7.mock.calls[0][0]).toBe('a');
        expect(cb7.mock.calls[0][1]).toBe(1);
        expect(cb7.mock.calls[1][0]).toBe('b');
        expect(cb7.mock.calls[1][1]).toBe(2);
        expect(cb7.mock.calls).toHaveLength(2);

        // 中断遍历对象
        expect(each({ a: 1, b: 2, c: 3 }, cb8)).toBe(false);
        expect(cb8.mock.calls[0][0]).toBe('a');
        expect(cb8.mock.calls[0][1]).toBe(1);
        expect(cb8.mock.calls[1][0]).toBe('b');
        expect(cb8.mock.calls[1][1]).toBe(2);
        expect(cb8.mock.calls).toHaveLength(2);
    });
});
