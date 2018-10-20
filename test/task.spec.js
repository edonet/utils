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
import task from '../lib/task';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【task】', () => {
    test('任务处理', () => {
        let tasked = task(),
            count = 0;

        // 添加任务
        tasked.add(() => count ++ );
        tasked.add(() => count += 2);
        tasked.add(() => count += 3);

        // 校验结果
        expect(tasked.length).toBe(3);
        expect(tasked.resolve().length).toBe(0);
        expect(count).toBe(6);

        // 添加任务
        tasked.add(argv => count += 1 * argv);
        tasked.add(argv => count += 2 * argv);
        tasked.add(argv => count += 3 * argv);

        // 校验结果
        expect(tasked.length).toBe(3);
        expect(tasked.resolve(3).length).toBe(0);
        expect(count).toBe(24);

        // 添加任务
        tasked.add(argv => count += 1 * argv);

        // 校验结果
        expect(tasked.length).toBe(1);
        expect(tasked.clear().length).toBe(0);

        // 解析结果
        tasked.resolve(2);
        expect(count).toBe(24);
    });
});
