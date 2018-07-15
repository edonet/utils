/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-15 15:20:21
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import observer from '../lib/observer';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【observer】', () => {
    test('订阅事件', () => {
        let ob = observer(),
            cb1 = jest.fn(),
            cb2 = jest.fn(),
            sb1 = ob.subscribe(cb1),
            sb2 = ob.subscribe(cb2);

        // 触发回调
        ob.notify(1);

        // 校验结果
        expect(cb1.mock.calls).toHaveLength(1);
        expect(cb2.mock.calls).toHaveLength(1);
        expect(cb1.mock.calls[0]).toEqual([1]);
        expect(cb2.mock.calls[0]).toEqual([1]);

        // 取消订阅
        sb1();

        // 触发回调
        ob.notify(2);

        // 校验结果
        expect(cb1.mock.calls).toHaveLength(1);
        expect(cb2.mock.calls).toHaveLength(2);
        expect(cb1.mock.calls[0]).toEqual([1]);
        expect(cb2.mock.calls[1]).toEqual([2]);

        // 取消订阅
        sb2();

        // 触发回调
        ob.notify(3);

        // 校验结果
        expect(cb1.mock.calls).toHaveLength(1);
        expect(cb2.mock.calls).toHaveLength(2);
        expect(cb1.mock.calls[0]).toEqual([1]);
        expect(cb2.mock.calls[1]).toEqual([2]);
    });
});
