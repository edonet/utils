/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-10-29 10:37:09
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import transform from '../lib/transform';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【transform】', () => {
    test('自由变换', () => {
        let o = transform();

        // 偏移指定距离
        o.translateBy(10, 5);

        // 校验结果
        expect(o.x).toBe(10);
        expect(o.y).toBe(5);

        // 偏移到位置
        o.translateTo(20, 15);

        // 校验结果
        expect(o.x).toBe(20);
        expect(o.y).toBe(15);

        // 偏移指定距离
        o.translateBy(20, 15);

        // 校验结果
        expect(o.x).toBe(40);
        expect(o.y).toBe(30);

        // 缩放指定倍数
        o.scaleTo(2);

        // 校验结果
        expect(o.x).toBe(80);
        expect(o.y).toBe(60);
        expect(o.scale).toBe(2);

        // 缩放指定倍数
        o.scaleBy(1.2);

        // 校验结果
        expect(o.x).toBe(96);
        expect(o.y).toBe(72);
        expect(o.scale).toBe(2.4);

        // 缩放指定中心倍数
        o.scaleTo(1, 96, 72);

        // 校验结果
        expect(o.x).toBe(96);
        expect(o.y).toBe(72);
        expect(o.scale).toBe(1);

        // 缩放指定倍数
        o.scaleBy(1.2, 10, 10);

        // 校验结果
        expect(o.x).toBe(113.2);
        expect(o.y).toBe(84.4);
        expect(o.scale).toBe(1.2);
    });
});
