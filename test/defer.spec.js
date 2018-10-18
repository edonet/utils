/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-06 15:29:08
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import fs from 'fs';
import defer from '../lib/defer';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【defer】', () => {
    test('延时处理', async () => {
        let deferred = defer(),
            cb = jest.fn((err, code) => deferred.resolve(code)),
            code = null;

        // 异步处理
        fs.readFile(__filename, cb);

        // 获取结果
        code = await deferred.promise;

        // 校验结果
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0][1]).toBe(code);
    });
});
