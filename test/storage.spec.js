/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-18 18:20:03
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import Storage from '../lib/storage';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【storage】', () => {
    test('本地存储', () => {
        let storage = new Storage();

        // 初始化数据
        storage.set({ a: 1, b: 2 });

        // 校验结果
        expect(storage.get()).toEqual({ a: 1, b: 2 });

        // 初始化数据
        storage.set({ b: 3, c: 4 });

        // 校验结果
        expect(storage.get('a')).toBe(1);
        expect(storage.get('b')).toBe(3);
        expect(storage.get('c')).toBe(4);
        expect(storage.get()).toEqual({ a: 1, b: 3, c: 4 });
    });
});
