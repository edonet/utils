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
import isString from '../lib/isString';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【isString】', () => {
    test('校验字符串类型', () => {
        expect(isString('')).toBe(true);
        expect(isString(1)).toBe(false);
        expect(isString(() => {})).toBe(false);
        expect(isString(true)).toBe(false);
        expect(isString([])).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString(/1/)).toBe(false);
    });
});
