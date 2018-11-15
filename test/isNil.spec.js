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
import isNil from '../lib/isNil';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【isNil】', () => {
    test('校验空类型', () => {
        expect(isNil('')).toBe(false);
        expect(isNil(1)).toBe(false);
        expect(isNil(NaN)).toBe(false);
        expect(isNil(() => {})).toBe(false);
        expect(isNil(true)).toBe(false);
        expect(isNil([])).toBe(false);
        expect(isNil({})).toBe(false);
        expect(isNil(/1/)).toBe(false);
        expect(isNil(null)).toBe(true);
        expect(isNil()).toBe(true);
    });
});
