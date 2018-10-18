/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-08-06 16:43:38
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import path from 'path';
import script from '../lib/script';


/**
 *****************************************
 * 渲染模块
 *****************************************
 */
describe('测试【script】', () => {
    let code = 'import path from "./lib/path.js"; export default path.resolve("./test/script.spec.js");';

    /* 执行代码 */
    test('执行代码', () => {
        expect(script.runCode(code)).toBe(path.resolve(__dirname, './script.spec.js'));
    });

    /* 执行文件 */
    test('执行文件', async () => {
        let res = await script.runFile('./lib/script.js');

        // 校验结果
        expect(res.runCode(code)).toBe(path.resolve(__dirname, './script.spec.js'));
    });
});
