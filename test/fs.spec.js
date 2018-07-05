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
        expect(cb.mock.calls[0][1]).toBe(undefined);

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
    });

    /* 复制文件 */
    test('复制文件', async () => {
        let cb = jest.fn();

        try {
            await fs.copy(__filename, __filename + '.bak', cb);
        } catch (err) {
            console.log(err);
        }
    });
});
