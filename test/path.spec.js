/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-07 09:45:03
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import path from '../lib/path';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【path】', () => {

    /* 使用基准路径 */
    test('使用基准路径', () => {
        let dir = path.usedir(__dirname);

        // 校验路径
        expect(dir()).toBe(__dirname);
        expect(dir('a.js')).toBe(path.resolve(__dirname, 'a.js'));
        expect(dir('../a.js')).toBe(path.resolve(__dirname, '../a.js'));
        expect(dir('/root/path/to/a.js')).toBe('/root/path/to/a.js');
    });

    /* 使用当前路径 */
    test('使用当前路径', () => {
        let cwd = process.cwd();

        // 校验路径
        expect(path.cwd()).toBe(cwd);
        expect(path.cwd('a.js')).toBe(path.resolve(cwd, 'a.js'));
        expect(path.cwd('../a.js')).toBe(path.resolve(cwd, '../a.js'));
        expect(path.cwd('/root/path/to/a.js')).toBe('/root/path/to/a.js');
    });
});
