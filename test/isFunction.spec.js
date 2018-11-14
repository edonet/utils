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
import isFunction from '../lib/isFunction';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【isFunction】', () => {
    test('校验函数类型', () => {
        expect(isFunction('')).toBe(false);
        expect(isFunction(1)).toBe(false);
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(true)).toBe(false);
        expect(isFunction([])).toBe(false);
        expect(isFunction({})).toBe(false);
        expect(isFunction(/1/)).toBe(false);
    });
});
