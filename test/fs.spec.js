/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-05 15:11:11
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import fs from '../lib/fs';
import path from 'path';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【fs】模块', () => {

    /* 获取文件状态 */
    test('获取文件状态', async () => {
        let cb = jest.fn(),
            stats = await fs.stat(__filename, cb);

        // 校验结果
        expect(stats).toBeTruthy();
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0]).toEqual([null, stats]);

        // 获取状态
        cb = jest.fn();
        stats = await fs.stat(__filename + '.tmp', cb);

        // 校验结果
        expect(stats).toBeNull();
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0][1]).toBe(stats);

        // 校验文件夹信息
        expect(await fs.stat(__dirname)).toBeTruthy();
    });

    /* 读取文件夹内容 */
    test('读取文件夹内容', async () => {
        let cb = jest.fn(),
            files = await fs.readdir(__dirname, cb);

        // 校验结果
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0]).toEqual([null, files]);
        expect(files).toEqual(expect.arrayContaining([path.basename(__filename)]));
    });

    /* 复制文件 */
    test('复制文件', async () => {
        let cb = jest.fn(),
            dist = __filename + '.bak';

        // 移除复制文件
        await fs.stat(dist) && fs.unlink(dist);

        // 复制文件
        try {
            await fs.copy(__filename, dist, cb);
        } catch (err) {
            console.log(err);
        }

        // 校验结果
        expect(await fs.stat(dist)).toBeTruthy();

        // 移除文件
        await fs.unlink(dist);

        // 校验结果
        expect(await fs.stat(dist)).toBeNull();
    });

    /* 复制文件夹 */
    test('复制文件夹', async () => {

        // 清除临时文件
        await fs.stat('./a') && await fs.rmdir('./a');
        await fs.stat('./a.cp') && await fs.rmdir('./a.cp');

        // 生成监听文件
        await fs.mkdir('./a');
        await fs.mkdir('./a/b');
        await fs.mkdir('./a/b/c');
        await fs.writeFile('./a/info', 'a');
        await fs.writeFile('./a/b/info', 'b');
        await fs.writeFile('./a/b/c/info', 'c');

        // 拷贝文件夹
        await fs.copy('./a', './a.cp');

        // 校验结果
        expect(await fs.stat('./a')).toBeTruthy();
        expect(await fs.readFile('./a/info', 'utf-8')).toBe('a');
        expect(await fs.stat('./a/b')).toBeTruthy();
        expect(await fs.readFile('./a/b/info', 'utf-8')).toBe('b');
        expect(await fs.stat('./a/b/c')).toBeTruthy();
        expect(await fs.readFile('./a/b/c/info', 'utf-8')).toBe('c');
        expect(await fs.stat('./a.cp')).toBeTruthy();
        expect(await fs.readFile('./a.cp/info', 'utf-8')).toBe('a');
        expect(await fs.stat('./a.cp/b')).toBeTruthy();
        expect(await fs.readFile('./a.cp/b/info', 'utf-8')).toBe('b');
        expect(await fs.stat('./a.cp/b/c')).toBeTruthy();
        expect(await fs.readFile('./a.cp/b/c/info', 'utf-8')).toBe('c');

        // 移除临时文件
        await fs.rmdir('./a');
        await fs.rmdir('./a.cp');

        // 校验结果
        expect(await fs.stat('./a')).toBeNull();
        expect(await fs.stat('./a.cp')).toBeNull();
    });
});
