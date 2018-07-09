/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-07 14:47:01
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import * as $ from '../lib/validate';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【validate】', () => {
    test('校验变量类型', () => {
        let calls = ['isString', 'isNumber', 'isFunction', 'isBoolean', 'isArray', 'isObject', 'isRegExp'],
            types = ['string', 'number', 'function', 'boolean', 'array', 'object', 'regexp'],
            validate = (matched, value) => {

                // 校验获取类型
                expect($.default(value, ...types)).toBe(types[matched]);

                // 校验判断接口
                calls.forEach((fn, idx) => {
                    expect($[fn](value)).toBe(idx === matched);
                    expect($.default(value, types[idx])).toBe(idx === matched);
                });
            };

        // 校验结果
        validate(0, '');
        validate(1, 1);
        validate(2, () => {});
        validate(3, true);
        validate(4, []);
        validate(5, {});
        validate(6, /1/);
    });
});
