/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-10 10:35:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import { spawn, exec } from '../lib/cp';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【cp】', () => {

    /* 执行命令 */
    test('执行命令', async () => {
        let cb = jest.fn(),
            res = await exec('echo ok?', cb);

        // 校验结果
        expect(res).toEqual(['ok?\n', '']);
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0]).toEqual([null, ...res]);

        // 校验【spawn】方法
        expect(await spawn('echo', ['ok?'])).toEqual(res);
    });
});
