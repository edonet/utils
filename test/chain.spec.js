/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-14 22:48:07
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import chain from '../lib/chain';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【chain】', () => {
    test('创建函数链', () => {
        let fn = jest.fn((x, fn) => fn(x + 1)),
            stop = x => x;

        // 校验结果
        expect(chain(fn, fn, fn, fn)(1)).toBe(5);
        expect(fn.mock.calls[0][0]).toBe(1);
        expect(fn.mock.calls[3][0]).toBe(4);
        expect(fn.mock.calls).toHaveLength(4);

        // 中断链条
        expect(chain(fn, stop, fn, fn, fn)(1)).toBe(2);
        expect(fn.mock.calls[4][0]).toBe(1);
        expect(fn.mock.calls).toHaveLength(5);

        // 中断链条
        expect(chain(fn, fn, fn, stop, fn)(1)).toBe(4);
        expect(fn.mock.calls[5][0]).toBe(1);
        expect(fn.mock.calls[7][0]).toBe(3);
        expect(fn.mock.calls).toHaveLength(8);
    });
});
