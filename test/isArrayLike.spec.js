/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-15 09:38:32
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import isArrayLike from '../lib/isArrayLike';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【isArrayLike】', () => {
    test('校验空类型', () => {
        expect(isArrayLike('')).toBe(true);
        expect(isArrayLike(1)).toBe(false);
        expect(isArrayLike(NaN)).toBe(false);
        expect(isArrayLike(() => {})).toBe(false);
        expect(isArrayLike(true)).toBe(false);
        expect(isArrayLike([])).toBe(true);
        expect(isArrayLike({})).toBe(false);
        expect(isArrayLike({ length: 0 })).toBe(true);
        expect(isArrayLike(new Set())).toBe(false);
        expect(isArrayLike(new Map())).toBe(false);
        expect(isArrayLike(/1/)).toBe(false);
        expect(isArrayLike(null)).toBe(false);
        expect(isArrayLike()).toBe(false);
    });
});
