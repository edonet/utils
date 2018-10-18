/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-10-18 10:34:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import assign from '../lib/assign';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【assign】', () => {
    test('【assign】合并对象', () => {
        let target = { a: 1 },
            obj = assign(target, { b: 2, c: 3 });

        // 校验结果
        expect(Object.keys(obj)).toEqual(['b', 'c']);
        expect(obj.__proto__).toEqual(target);
        expect(obj.a).toBe(target.a);
        expect(obj.b).toBe(2);
        expect(obj.c).toBe(3);
    });
});
