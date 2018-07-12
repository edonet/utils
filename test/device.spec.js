/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-12 10:30:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import device from '../lib/device';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【device】', () => {

    /* 平台信息 */
    test('平台信息', () => {
        expect(device.platform).toBe('browser');
        expect(device.isIOS()).toBe(false);
        expect(device.isAndroid()).toBe(false);
        expect(device.isWeChat()).toBe(false);
    });
});
