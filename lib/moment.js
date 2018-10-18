/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-13 18:46:49
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import * as format from './moment.format';
import createCache from './cache';


/**
 *****************************************
 * 日期匹配
 *****************************************
 */
const regexp = /^(?:(\d{4})(-|\/)(\d\d?)\2(\d\d?))?(?:T|\s)?(?:(\d{1,2}):(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?)?\s?(am|pm|z)?$/i;


/**
 *****************************************
 * 时间类
 *****************************************
 */
class Moment {

    /* 初始化时间 */
    constructor(...args) {
        let date = null;

        // 判官是否需要解析
        if (args.length === 1 && typeof args[0] === 'string') {
            let matched = regexp.exec(args[0]);

            if (matched) {
                let [, y,, m, d, h, i, s, u, a] = matched;

                // 创建日期
                date = new Date();

                // 转化24小时制
                if (a && a.toLowerCase() === 'pm' && h) {
                    h = (h | 0) + 12;
                }

                // 更新日期
                y && date.setFullYear(y | 0);
                m && date.setMonth((m | 0) - 1);
                d && date.setDate(d | 0);
                h && date.setHours(h | 0);
                i && date.setMinutes(i | 0);
                s && date.setSeconds(s | 0);
                u && date.setMilliseconds(u | 0);
            }
        }

        // 创建缓存
        this.$$date = date || new Date(...args);
        this.$$cache = createCache();
    }

    /* 解析日期 */
    parse(...args) {
        return new Moment(...args);
    }

    /* 转为字符串 */
    toString(str) {
        return this.$$cache(str, () => {
            let result = '';

            // 替换字符
            for (let ch of str) {
                if (ch in format) {
                    result += this.$$cache(ch, () => format[ch](this.$$date));
                } else {
                    result += ch;
                }
            }

            // 返回结果
            return result;
        });
    }

    /* 获取毫秒 */
    valueOf() {
        return + this.$$date;
    }
}



/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default function moment(...args) {
    return new Moment(...args);
}

