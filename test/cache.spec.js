/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-14 17:30:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import createCache from '../lib/cache';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【cache】', () => {
    test('创建缓存', () => {
        let cached = createCache({ a: 1, b: 2 });

        // 创建缓存
        expect(cached('a')).toBe(1);
        expect(cached('b')).toBe(2);
        expect(cached('c', 3)).toBe(3);
        expect(cached('d', () => 4)).toBe(4);

        // 校验缓存
        expect(cached('a', 5)).toBe(1);
        expect(cached('b', 5)).toBe(2);
        expect(cached('c', 5)).toBe(3);
        expect(cached('d', 5)).toBe(4);
        expect(cached()).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });
});
