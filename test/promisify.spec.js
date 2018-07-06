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
    test('promisify', async () => {
        let cb = jest.fn(),
            readFile = promisify(fs.readFile),
            code = await readFile(__filename, cb);

        // 校验结果
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0][1]).toBe(code);
    });
});
