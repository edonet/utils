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
import isArray from '../lib/isArray';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【isArray】', () => {
    test('校验数组类型', () => {
        expect(isArray('')).toBe(false);
        expect(isArray(1)).toBe(false);
        expect(isArray(() => {})).toBe(false);
        expect(isArray(true)).toBe(false);
        expect(isArray([])).toBe(true);
        expect(isArray({})).toBe(false);
        expect(isArray(/1/)).toBe(false);
    });
});
