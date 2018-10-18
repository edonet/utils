/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-07 15:22:31
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import fs from '../lib/fs';
import xml from '../lib/xml';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【xml】', () => {

    /* 编译、解析代码 */
    test('编译、解析代码', async () => {
        let data = { body: { a: ['1'], b: ['2'], c: ['1', '2', '3'], $: { d: '1' } } },
            code = await xml.stringify(data);

        // 校验结果
        expect(code).toEqual(expect.stringContaining('<c>2</c>'));
        expect(await xml.parse(code)).toEqual(data);
    });

    /* 编译、解析文件 */
    test('编译、解析文件', async () => {
        let data = { body: { a: ['1'], b: ['2'], c: ['1', '2', '3'], $: { d: '1' } } },
            filename = './a.xml',
            code;

        // 移除临时文件
        await fs.stat(filename) && fs.unlink(filename);

        // 写入文件代码
        await xml.writeFile(filename, data);

        // 读取代码
        code = await fs.readFile(filename, 'utf-8');

        // 校验结果
        expect(code).toEqual(expect.stringContaining('<c>2</c>'));
        expect(await xml.readFile('./a.xml')).toEqual(data);

        // 移除临时文件
        fs.unlink(filename);
    });
});
