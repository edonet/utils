/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-14 09:18:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import * as format from '../lib/moment.format';
import moment from '../lib/moment';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【moment】', () => {

    /* 格式化日期 */
    test('格式化日期', () => {
        let date = new Date(2018, 1, 4, 18, 3, 5, 68);

        // 校验年份信息
        expect(format.Y(date)).toBe(2018);
        expect(format.y(date)).toBe(18);

        // 校验月份信息
        expect(format.F(date)).toBe('February');
        expect(format.M(date)).toBe('Feb');
        expect(format.m(date)).toBe('02');
        expect(format.n(date)).toBe(2);
        expect(format.t(date)).toBe(28);

        // 校验日期信息
        expect(format.d(date)).toBe('04');
        expect(format.j(date)).toBe(4);
        expect(format.e(date)).toBe('th');

        // 校验星期信息
        expect(format.L(date)).toBe('星期日');
        expect(format.l(date)).toBe('Sunday');
        expect(format.D(date)).toBe('Sun');
        expect(format.N(date)).toBe(7);
        expect(format.w(date)).toBe(0);

        // 校验小时信息
        expect(format.H(date)).toBe('18');
        expect(format.h(date)).toBe('06');
        expect(format.G(date)).toBe(18);
        expect(format.g(date)).toBe(6);
        expect(format.A(date)).toBe('PM');
        expect(format.a(date)).toBe('pm');

        // 校验分钟信息
        expect(format.I(date)).toBe(3);
        expect(format.i(date)).toBe('03');

        // 校验秒信息
        expect(format.S(date)).toBe(5);
        expect(format.s(date)).toBe('05');
        expect(format.U(date)).toBe(68);
        expect(format.u(date)).toBe('068');
    });

    /* 解析日期 */
    test('解析日期', () => {
        let date = moment(),
            today = new Date();

        // 校验当前信息
        expect(date.toString('Y')).toBe(today.getFullYear() + '');
        expect(date.toString('n')).toBe(today.getMonth() + 1 + '');
        expect(date.toString('j')).toBe(today.getDate() + '');
        expect(date.toString('G')).toBe(today.getHours() + '');
        expect(date.toString('I')).toBe(today.getMinutes() + '');
        expect(date.toString('S')).toBe(today.getSeconds() + '');

        // 校验样式化日期
        expect(moment('2018-2-25').toString('Y/m/d')).toBe('2018/02/25');
        expect(moment('6:30:5').toString('G/I/S')).toBe('6/30/5');
        expect(moment('6:30:5').toString('H/i/s')).toBe('06/30/05');
        expect(moment('6:30:5 pm').toString('H/i/s')).toBe('18/30/05');
        expect(moment('2018/2/25T6:30:5 pm').toString('Ymd/H/i/s')).toBe('20180225/18/30/05');

        // 校验解析日期
        expect(date.parse('2018-2-25').toString('Y/m/d')).toBe('2018/02/25');
        expect(date.parse('6:30:5').toString('G/I/S')).toBe('6/30/5');
        expect(date.parse('6:30:5').toString('H/i/s')).toBe('06/30/05');
        expect(date.parse('6:30:5 pm').toString('H/i/s')).toBe('18/30/05');
        expect(date.parse('2018/2/25T6:30:5 pm').toString('Ymd/H/i/s')).toBe('20180225/18/30/05');
        expect(date.parse('2018/2/25T6:30:5.007Z').toString('Ymd/H/i/s/u')).toBe('20180225/06/30/05/007');
    });
});
