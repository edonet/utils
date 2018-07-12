/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-12 12:14:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import fs from '../lib/fs';
import { zip, unzip } from '../lib/zip';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【zip】', () => {

    /* 压缩文件夹 */
    test('压缩文件夹', async () => {

        // 移除临时文件
        await fs.stat('./a') && await fs.rmdir('./a');
        await fs.stat('./a.zip') && await fs.rmdir('./a.zip');

        // 创建临时文件夹
        await fs.mkdir('./a');
        await fs.mkdir('./a/b');
        await fs.writeFile('./a/info', 'a');
        await fs.writeFile('./a/b/info', 'b');

        // 校验文件不存在
        expect(await fs.stat('./a.zip')).toBeNull();

        // 压缩文件
        await zip('./a');

        // 校验文件存在
        expect(await fs.stat('./a.zip')).toBeTruthy();

        // 解压文件
        await unzip('./a.zip', './b');

        // 校验解压内容
        expect(await fs.stat('./b')).toBeTruthy();
        expect(await fs.stat('./b/b')).toBeTruthy();
        expect(await fs.readFile('./b/info', 'utf-8')).toBe('a');
        expect(await fs.readFile('./b/b/info', 'utf-8')).toBe('b');

        // 移除临时文件
        await fs.rmdir('./a');
        await fs.rmdir('./b');
        await fs.rmdir('./a.zip');
    });
});
