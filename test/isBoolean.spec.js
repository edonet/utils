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
import isBoolean from '../lib/isBoolean';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【isBoolean】', () => {
    test('校验数字类型', () => {
        expect(isBoolean('')).toBe(false);
        expect(isBoolean(1)).toBe(false);
        expect(isBoolean(NaN)).toBe(false);
        expect(isBoolean(() => {})).toBe(false);
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean([])).toBe(false);
        expect(isBoolean({})).toBe(false);
        expect(isBoolean(/1/)).toBe(false);
    });
});
