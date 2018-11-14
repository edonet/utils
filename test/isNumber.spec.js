/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-07 14:47:01
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import isNumber from '../lib/isNumber';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【isNumber】', () => {
    test('校验数字类型', () => {
        expect(isNumber('')).toBe(false);
        expect(isNumber(1)).toBe(true);
        expect(isNumber(NaN)).toBe(false);
        expect(isNumber(() => {})).toBe(false);
        expect(isNumber(true)).toBe(false);
        expect(isNumber([])).toBe(false);
        expect(isNumber({})).toBe(false);
        expect(isNumber(/1/)).toBe(false);
    });
});
