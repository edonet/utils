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
import isNaturalNumber from '../lib/isNaturalNumber';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【isNaturalNumber】', () => {
    test('校验空类型', () => {
        expect(isNaturalNumber('')).toBe(false);
        expect(isNaturalNumber(1)).toBe(true);
        expect(isNaturalNumber(1.5)).toBe(false);
        expect(isNaturalNumber(-1)).toBe(false);
        expect(isNaturalNumber(-100)).toBe(false);
        expect(isNaturalNumber(NaN)).toBe(false);
        expect(isNaturalNumber(() => {})).toBe(false);
        expect(isNaturalNumber(true)).toBe(false);
        expect(isNaturalNumber([])).toBe(false);
        expect(isNaturalNumber({})).toBe(false);
        expect(isNaturalNumber(/1/)).toBe(false);
        expect(isNaturalNumber(null)).toBe(false);
        expect(isNaturalNumber()).toBe(false);
    });
});
