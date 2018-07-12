/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-06 15:49:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import fs from 'fs';
import promisify from '../lib/promisify';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【promisfy】', () => {

    /* 扩展【fs】 */
    test('扩展【fs】', async () => {
        let cb = jest.fn(),
            readFile = promisify(fs.readFile),
            code = await readFile(__filename, cb);

        // 校验结果
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0][1]).toBe(code);
    });

    /* 异步回调 */
    test('异步回调', async () => {
        let fn = (a, cb) => cb(null, a),
            count = 0;

        // 执行异步回调
        await promisify(fn)(1, (e, n) => new Promise(
            resolve => setTimeout(() => resolve(count += n, 100))
        ));

        // 校验结果
        expect(count).toBe(1);

        // 执行错误
        try {
            await promisify(fn)(1, () => new Promise(
                (resolve, reject) => setTimeout(() => reject(count), 100)
            ));
        } catch (err) {
            expect(err).toBe(1);
            count ++;
        }

        // 校验结果
        expect(count).toBe(2);
    });
});
