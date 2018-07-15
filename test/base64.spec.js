/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-13 16:38:51
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import { decode, encode } from '../lib/base64';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【base64】', () => {
    test('【base64】编码解码', () => {
        expect(decode(encode('中国'))).toBe('中国');
        expect(encode(decode('5Lit5Zu9'))).toBe('5Lit5Zu9');
        expect(encode('中国人')).toBe('5Lit5Zu95Lq6');
        expect(decode('5Lit5Zu95Lq6')).toBe('中国人');
        expect(encode('中国人')).toBe(Buffer.from('中国人').toString('base64'));
        expect(decode('5Lit5Zu95Lq6')).toBe(Buffer.from('5Lit5Zu95Lq6', 'base64').toString());
    });
});
